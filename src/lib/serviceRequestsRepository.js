import { documentsBucket, isSupabaseConfigured, serviceImagesBucket, supabase } from './supabaseClient';

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase no está configurado. Crea .env.local con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
}


function isMissingAvatarColumnError(error) {
  const text = String(error?.message || error?.details || error?.hint || '').toLowerCase();
  return text.includes('avatar_url') && (text.includes('does not exist') || text.includes('could not find') || text.includes('schema cache'));
}

function normalizeProfileRow(row) {
  return {
    id: row.id,
    fullName: row.full_name || row.email || 'Usuario',
    email: row.email || '',
    phone: row.phone || '',
    avatarUrl: row.avatar_url || '',
    role: row.role || 'client',
    active: row.active !== false,
  };
}

export { isSupabaseConfigured };

export function normalizeServiceFromDb(row) {
  return {
    id: row.id,
    name: row.name,
    group: row.group_key || row.group || 'personas',
    price: row.price_reference || row.price || 'Según cotización',
    image: row.image_url || row.image || '/assets/services/gestoria.jpg',
    detail: row.detail || 'Servicio Legal TIC sujeto a revisión.',
    subservices: (row.service_subservices || [])
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((sub) => sub.name),
    active: row.active !== false,
  };
}

export function normalizeRequestFromDb(row) {
  const profile = row.profiles || row.client_profile || {};
  const documents = row.request_documents || [];
  return {
    id: row.public_code || row.id,
    dbId: row.id,
    service: row.service_name,
    serviceId: row.service_id,
    client: profile.full_name || row.client_name || row.client_email || 'Cliente',
    phone: profile.phone || row.client_phone || '',
    email: profile.email || row.client_email || '',
    subservices: row.requested_subservices || [],
    updatedAt: row.updated_at ? new Date(row.updated_at).toLocaleString('es-BO') : '',
    state: row.state || 'Solicitud',
    payment: row.payment_status || 'Pendiente de comprobación',
    paymentReceipt: row.payment_receipt_label || 'Comprobante pendiente',
    requiredUploads: row.required_uploads || ['Carnet de identidad', 'Comprobante de pago', 'Documentos específicos del servicio'],
    uploadedByClient: documents.filter((doc) => doc.document_type !== 'final').map((doc) => doc.label || doc.file_name),
    finalDocument: documents.find((doc) => doc.document_type === 'final')?.label || row.final_document_label || '',
    assignedTo: row.assigned_to_name || 'Sin asignar',
    adminNote: row.admin_note || '',
  };
}

export async function getCurrentUserProfile() {
  const client = requireSupabase();
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) throw authError;
  const user = authData?.user;
  if (!user) return null;

  const { data: byId, error: idError } = await client
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();
  if (idError) throw idError;
  if (byId) return byId;

  // Respaldo seguro: si el perfil fue creado manualmente con el correo correcto
  // pero quedó con un id distinto al usuario Auth, no se pierde el rol autorizado.
  // La contraseña ya fue validada antes por Supabase Auth.
  const cleanEmail = String(user.email || '').trim().toLowerCase();
  if (!cleanEmail) return null;
  const { data: byEmail, error: emailError } = await client
    .from('profiles')
    .select('*')
    .ilike('email', cleanEmail)
    .maybeSingle();
  if (emailError) throw emailError;
  return byEmail || null;
}


export async function ensureCurrentGoogleProfile({ masterAdminEmail = 'legaltic.abogados@gmail.com' } = {}) {
  const client = requireSupabase();
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) throw authError;
  const user = authData?.user;
  if (!user?.id || !user?.email) return null;

  const email = String(user.email || '').trim().toLowerCase();
  const metadata = user.user_metadata || {};
  const isMasterAdmin = email === String(masterAdminEmail || '').trim().toLowerCase();

  let existing = null;
  try {
    existing = await getCurrentUserProfile();
  } catch {
    existing = null;
  }

  if (existing) {
    const role = isMasterAdmin ? 'admin' : (['admin', 'lawyer', 'client'].includes(existing.role) ? existing.role : 'client');
    const active = isMasterAdmin ? true : existing.active !== false;
    const safePatch = {
      full_name: existing.full_name || metadata.full_name || metadata.name || email,
      phone: existing.phone || metadata.phone || '',
      role,
      active,
    };
    try {
      const updated = await updateProfileRole(existing.id, {
        full_name: safePatch.full_name,
        phone: safePatch.phone,
        role: safePatch.role,
        active: safePatch.active,
        avatar_url: existing.avatar_url || metadata.avatar_url || metadata.picture || '',
      });
      return updated;
    } catch {
      return normalizeProfileRow({ ...existing, ...safePatch, avatar_url: existing.avatar_url || metadata.avatar_url || metadata.picture || '' });
    }
  }

  const payload = {
    id: user.id,
    email,
    full_name: metadata.full_name || metadata.name || email,
    phone: metadata.phone || '',
    role: isMasterAdmin ? 'admin' : 'client',
    active: true,
    updated_at: new Date().toISOString(),
  };
  const avatarUrl = metadata.avatar_url || metadata.picture || '';
  if (avatarUrl) payload.avatar_url = avatarUrl;

  const runInsert = async (nextPayload, selectColumns) => client
    .from('profiles')
    .upsert(nextPayload, { onConflict: 'id' })
    .select(selectColumns)
    .single();

  let { data, error } = await runInsert(payload, 'id, full_name, email, phone, role, active, avatar_url');
  if (error && isMissingAvatarColumnError(error)) {
    const { avatar_url, ...withoutAvatar } = payload;
    const fallback = await runInsert(withoutAvatar, 'id, full_name, email, phone, role, active');
    data = fallback.data;
    error = fallback.error;
  }
  if (error) throw error;
  return normalizeProfileRow(data);
}

export async function signInOrDemo(email, password) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}


export async function signInWithGoogle() {
  const client = requireSupabase();
  const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account',
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function syncGoogleSessionProfile() {
  const client = requireSupabase();
  const { data: sessionData, error: sessionError } = await client.auth.getSession();
  if (sessionError) throw sessionError;
  const token = sessionData?.session?.access_token;
  if (!token) return null;

  // En desarrollo local con Vite puro (npm run dev) no existen las Netlify Functions.
  // Devolvemos null para que App.jsx use el respaldo local de la sesión Google
  // y así no aparezcan errores 404 ni pantalla blanca por sincronización pendiente.
  if (typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    return null;
  }

  const response = await fetch('/.netlify/functions/oauth-profile-sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'No se pudo sincronizar el perfil de Google.');
  if (!result.profile) throw new Error('La función de sincronización no devolvió perfil; usando respaldo local de sesión Google.');
  return result.profile;
}

export async function signOutCurrent() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();
  if (error) throw error;
  return true;
}

export async function listServiceCatalog() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('service_catalog')
    .select('*, service_subservices(id, name, sort_order)')
    .eq('active', true)
    .order('group_key', { ascending: true })
    .order('sort_order', { ascending: true })
    .order('sort_order', { referencedTable: 'service_subservices', ascending: true });
  if (error) throw error;
  return (data || []).map(normalizeServiceFromDb);
}

export async function upsertServiceCatalog(service) {
  const client = requireSupabase();
  const id = service.id && !service.id.startsWith('servicio-') ? service.id : crypto.randomUUID();
  const servicePayload = {
    id,
    name: service.name,
    group_key: service.group,
    price_reference: service.price,
    image_url: service.image,
    detail: service.detail,
    active: true,
  };

  const { data, error } = await client
    .from('service_catalog')
    .upsert(servicePayload, { onConflict: 'id' })
    .select('*')
    .single();
  if (error) throw error;

  const { error: deleteError } = await client.from('service_subservices').delete().eq('service_id', data.id);
  if (deleteError) throw deleteError;

  const rows = (service.subservices || ['Solicitud general']).map((name, index) => ({ service_id: data.id, name, sort_order: index + 1 }));
  if (rows.length) {
    const { error: insertError } = await client.from('service_subservices').insert(rows);
    if (insertError) throw insertError;
  }

  return normalizeServiceFromDb({ ...data, service_subservices: rows });
}

export async function deleteServiceCatalog(serviceId) {
  const client = requireSupabase();
  const { error } = await client.from('service_catalog').update({ active: false }).eq('id', serviceId);
  if (error) throw error;
  return true;
}

export async function uploadServiceImage(file) {
  const client = requireSupabase();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${Date.now()}-${safeName}`;
  const { error: uploadError } = await client.storage.from(serviceImagesBucket).upload(path, file, { upsert: false });
  if (uploadError) throw uploadError;
  const { data } = client.storage.from(serviceImagesBucket).getPublicUrl(path);
  return data?.publicUrl || '';
}


export function normalizeDigitalPortalFromDb(row) {
  return {
    id: row.id,
    title: row.title,
    image: row.image_url || row.image || '/assets/gov/ciudadania.png',
    url: row.url || '',
    active: row.active !== false,
    sortOrder: row.sort_order || 100,
  };
}

export async function listDigitalPortals() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('digital_portals')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .order('title', { ascending: true });
  if (error) throw error;
  return (data || []).map(normalizeDigitalPortalFromDb);
}

export async function upsertDigitalPortal(portal) {
  const client = requireSupabase();
  const id = portal.id && !portal.id.startsWith('portal-') ? portal.id : crypto.randomUUID();
  const payload = {
    id,
    title: portal.title,
    image_url: portal.image,
    url: portal.url || '',
    active: true,
  };
  const { data, error } = await client
    .from('digital_portals')
    .upsert(payload, { onConflict: 'id' })
    .select('*')
    .single();
  if (error) throw error;
  return normalizeDigitalPortalFromDb(data);
}

export async function deleteDigitalPortal(portalId) {
  const client = requireSupabase();
  const { error } = await client.from('digital_portals').update({ active: false }).eq('id', portalId);
  if (error) throw error;
  return true;
}

export async function createServiceRequest({ service, subservices, clientNote = '', user }) {
  const client = requireSupabase();
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) throw authError;
  const authUser = authData?.user;
  if (!authUser) throw new Error('Debes iniciar sesión real en Supabase para guardar la solicitud.');
  const clientEmail = authUser.email || user?.email || '';

  const { data, error } = await client
    .from('service_requests')
    .insert({
      client_id: authUser?.id || null,
      client_email: clientEmail,
      client_name: user?.name || clientEmail || 'Cliente Legal TIC',
      client_phone: user?.phone || '',
      service_id: service.id,
      service_name: service.name,
      requested_subservices: subservices || [],
      client_note: clientNote,
      required_uploads: ['Carnet de identidad', 'Comprobante de pago', 'Documentos específicos del servicio'],
      state: 'Solicitud',
      payment_status: 'Pendiente de comprobación',
    })
    .select('*, request_documents(*)')
    .single();
  if (error) throw error;
  return normalizeRequestFromDb(data);
}

export async function listRequestsForRole(role = 'client') {
  const client = requireSupabase();
  const query = client
    .from('service_requests')
    .select('*, request_documents(*)')
    .order('created_at', { ascending: false });
  if (role === 'client') {
    const { data: authData } = await client.auth.getUser();
    if (!authData?.user?.id) return [];
    query.eq('client_id', authData.user.id);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(normalizeRequestFromDb);
}

export async function updateServiceRequest(requestId, patch) {
  const client = requireSupabase();
  const id = patch.dbId || requestId;
  const payload = {};
  if (patch.state) payload.state = patch.state;
  if (patch.payment) payload.payment_status = patch.payment;
  if (patch.adminNote !== undefined) payload.admin_note = patch.adminNote;
  if (patch.assignedTo !== undefined) payload.assigned_to_name = patch.assignedTo;
  if (patch.finalDocument !== undefined) payload.final_document_label = patch.finalDocument;
  if (patch.subservices) payload.requested_subservices = patch.subservices;

  const { data, error } = await client
    .from('service_requests')
    .update(payload)
    .eq('id', id)
    .select('*, request_documents(*)')
    .single();
  if (error) throw error;
  return normalizeRequestFromDb(data);
}

export async function deleteServiceRequest(requestId) {
  const client = requireSupabase();
  const { error } = await client.from('service_requests').delete().eq('id', requestId);
  if (error) throw error;
  return true;
}

export async function uploadRequestDocument({ requestId, file, documentType = 'other', label }) {
  const client = requireSupabase();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `${requestId}/${Date.now()}-${safeName}`;
  const { error: uploadError } = await client.storage.from(documentsBucket).upload(filePath, file, { upsert: false });
  if (uploadError) throw uploadError;
  const { data, error } = await client
    .from('request_documents')
    .insert({ request_id: requestId, document_type: documentType, label: label || file.name, file_path: filePath, file_name: file.name, mime_type: file.type || 'application/octet-stream', size_bytes: file.size || 0 })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function getSignedDocumentUrl(filePath, expiresIn = 60 * 5) {
  const client = requireSupabase();
  const { data, error } = await client.storage.from(documentsBucket).createSignedUrl(filePath, expiresIn);
  if (error) throw error;
  return data?.signedUrl || '';
}

export async function listOccupiedAppointmentSlots(date) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('appointment_bookings')
    .select('slot_time')
    .eq('slot_date', date)
    .neq('status', 'cancelled');
  if (error) throw error;
  return (data || []).map((row) => row.slot_time?.slice(0, 5));
}

export async function bookAppointment({ slotDate, slotTime, fullName, email, phone, note }) {
  const client = requireSupabase();
  const { data: authData } = await client.auth.getUser();
  const { data, error } = await client.rpc('book_appointment', {
    p_slot_date: slotDate,
    p_slot_time: slotTime,
    p_full_name: fullName || 'Cliente Legal TIC',
    p_email: email || authData?.user?.email || '',
    p_phone: phone || '',
    p_note: note || '',
  });
  if (error) throw error;
  return data;
}

export async function getAppSetting(key) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('app_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();
  if (error) throw error;
  return data?.value || '';
}

export async function upsertAppSetting(key, value) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('app_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function listProfiles() {
  const client = requireSupabase();
  const query = client
    .from('profiles')
    .select('id, full_name, email, phone, role, active, avatar_url')
    .order('created_at', { ascending: false });
  const { data, error } = await query;
  if (error) {
    if (isMissingAvatarColumnError(error)) {
      const fallback = await client
        .from('profiles')
        .select('id, full_name, email, phone, role, active')
        .order('created_at', { ascending: false });
      if (fallback.error) throw fallback.error;
      return (fallback.data || []).map(normalizeProfileRow);
    }
    throw error;
  }
  return (data || []).map(normalizeProfileRow);
}

export async function updateProfileRole(id, patch) {
  const client = requireSupabase();
  const cleanId = String(id || '').trim();
  const cleanEmail = String(patch?.email || '').trim().toLowerCase();
  const payload = { updated_at: new Date().toISOString() };
  if (patch.role !== undefined) payload.role = patch.role;
  if (patch.active !== undefined) payload.active = patch.active;
  if (patch.full_name !== undefined) payload.full_name = patch.full_name;
  if (patch.phone !== undefined) payload.phone = patch.phone;
  if (patch.avatar_url !== undefined) payload.avatar_url = patch.avatar_url;

  const selectWithAvatar = 'id, full_name, email, phone, role, active, avatar_url';
  const selectNoAvatar = 'id, full_name, email, phone, role, active';

  const executeUpdate = async (builderFactory, nextPayload, selectColumns) => builderFactory(nextPayload).select(selectColumns);
  const updateById = (nextPayload) => client.from('profiles').update(nextPayload).eq('id', cleanId);
  const updateByEmail = (nextPayload) => client.from('profiles').update(nextPayload).ilike('email', cleanEmail);

  async function run(builderFactory) {
    let { data, error } = await executeUpdate(builderFactory, payload, selectWithAvatar);
    if (error && isMissingAvatarColumnError(error)) {
      const { avatar_url, ...payloadWithoutAvatar } = payload;
      const fallback = await executeUpdate(builderFactory, payloadWithoutAvatar, selectNoAvatar);
      data = fallback.data;
      error = fallback.error;
    }
    if (error) throw error;
    return Array.isArray(data) ? data : (data ? [data] : []);
  }

  let rows = [];
  if (cleanId) rows = await run(updateById);
  if (!rows.length && cleanEmail) rows = await run(updateByEmail);

  if (!rows.length) {
    const uuidLikeId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(cleanId);
    if (uuidLikeId && cleanEmail) {
      const insertPayload = {
        id: cleanId,
        email: cleanEmail,
        full_name: patch.full_name || cleanEmail || 'Usuario',
        phone: patch.phone || '',
        role: patch.role || 'client',
        active: patch.active !== false,
        updated_at: new Date().toISOString(),
      };
      if (patch.avatar_url) insertPayload.avatar_url = patch.avatar_url;
      let upsert = await client
        .from('profiles')
        .upsert(insertPayload, { onConflict: 'id' })
        .select(selectWithAvatar);
      if (upsert.error && isMissingAvatarColumnError(upsert.error)) {
        const { avatar_url, ...insertWithoutAvatar } = insertPayload;
        upsert = await client
          .from('profiles')
          .upsert(insertWithoutAvatar, { onConflict: 'id' })
          .select(selectNoAvatar);
      }
      if (upsert.error) throw upsert.error;
      const insertedRows = Array.isArray(upsert.data) ? upsert.data : (upsert.data ? [upsert.data] : []);
      if (insertedRows.length) return normalizeProfileRow(insertedRows[0]);
    }

    // En localhost puede existir un usuario detectado por Google en el respaldo local
    // antes de que public.profiles se haya creado en Supabase. No rompemos la edición:
    // devolvemos el perfil normalizado para que la bandeja mantenga el cambio aprobado.
    return normalizeProfileRow({
      id: cleanId || cleanEmail,
      email: cleanEmail,
      full_name: patch.full_name || cleanEmail || 'Usuario',
      phone: patch.phone || '',
      role: patch.role || 'client',
      active: patch.active !== false,
      avatar_url: patch.avatar_url || '',
      _localOnly: true,
    });
  }
  return normalizeProfileRow(rows[0]);
}



export async function deleteManagedProfile(id, email = '') {
  const client = requireSupabase();
  const cleanId = String(id || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  if (!cleanId && !cleanEmail) throw new Error('No se pudo identificar el usuario a eliminar.');

  const { data: sessionData } = await client.auth.getSession();
  const token = sessionData?.session?.access_token || '';
  const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);

  // En Netlify/producción se elimina usando función segura con SERVICE_ROLE_KEY:
  // profile + auth.users. En localhost con Vite puro esa función no existe, por eso
  // hacemos respaldo directo sobre public.profiles para que la bandeja no conserve el registro.
  if (token && !isLocalhost) {
    const response = await fetch('/.netlify/functions/admin-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action: 'delete-user', id: cleanId, email: cleanEmail }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'No se pudo eliminar el usuario desde la función segura.');
    return result;
  }

  let query = client.from('profiles').delete();
  if (cleanId) query = query.eq('id', cleanId);
  else query = query.ilike('email', cleanEmail);
  const { error } = await query;
  if (error) throw error;
  return { ok: true, localOnly: true };
}

export async function updateCurrentPassword(password) {
  const client = requireSupabase();
  const cleanPassword = String(password || '');
  if (cleanPassword.length < 8) throw new Error('La nueva contraseña debe tener al menos 8 caracteres.');
  const { data, error } = await client.auth.updateUser({ password: cleanPassword });
  if (error) throw error;
  return data;
}

export async function updateOwnProfile(patch) {
  const client = requireSupabase();
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) throw authError;
  const user = authData?.user;
  if (!user?.id) throw new Error('Debes iniciar sesión para actualizar tu perfil.');

  const payload = { updated_at: new Date().toISOString() };
  if (patch.full_name !== undefined) payload.full_name = patch.full_name;
  if (patch.phone !== undefined) payload.phone = patch.phone;
  if (patch.avatar_url !== undefined) payload.avatar_url = patch.avatar_url;

  const runUpdate = async (nextPayload, selectColumns) => client
    .from('profiles')
    .update(nextPayload)
    .eq('id', user.id)
    .select(selectColumns)
    .single();

  let { data, error } = await runUpdate(payload, 'id, full_name, email, phone, role, active, avatar_url');
  if (error && isMissingAvatarColumnError(error)) {
    const { avatar_url, ...payloadWithoutAvatar } = payload;
    const fallback = await runUpdate(payloadWithoutAvatar, 'id, full_name, email, phone, role, active');
    data = fallback.data;
    error = fallback.error;
    if (data) data._avatarNotPersisted = true;
  }
  if (error) throw error;
  return normalizeProfileRow(data);
}
