import { createClient } from '@supabase/supabase-js';

const MASTER_ADMIN_EMAIL = 'legaltic.abogados@gmail.com';
const allowedRoles = new Set(['admin', 'lawyer', 'client']);

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function getEnv(name) {
  return process.env[name] || '';
}

function cleanEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function isMissingAvatarColumnError(error) {
  const text = String(error?.message || error?.details || error?.hint || '').toLowerCase();
  return text.includes('avatar_url') && (text.includes('does not exist') || text.includes('could not find') || text.includes('schema cache'));
}

function normalizeProfile(profile) {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name || profile.email || 'Usuario',
    phone: profile.phone || '',
    role: allowedRoles.has(profile.role) ? profile.role : 'client',
    active: profile.active !== false,
    avatarUrl: profile.avatar_url || '',
  };
}

async function selectProfile(adminClient, field, value) {
  const run = (columns) => adminClient
    .from('profiles')
    .select(columns)
    .eq(field, value)
    .maybeSingle();

  let { data, error } = await run('id, email, full_name, phone, role, active, avatar_url');
  if (error && isMissingAvatarColumnError(error)) {
    const fallback = await run('id, email, full_name, phone, role, active');
    data = fallback.data;
    error = fallback.error;
  }
  if (error) throw error;
  return data;
}

async function upsertProfile(adminClient, payload) {
  const run = (columns) => adminClient
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select(columns)
    .single();

  let { data, error } = await run('id, email, full_name, phone, role, active, avatar_url');
  if (error && isMissingAvatarColumnError(error)) {
    const { avatar_url, ...withoutAvatar } = payload;
    const fallback = await adminClient
      .from('profiles')
      .upsert(withoutAvatar, { onConflict: 'id' })
      .select('id, email, full_name, phone, role, active')
      .single();
    data = fallback.data;
    error = fallback.error;
  }
  if (error) throw error;
  return data;
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Método no permitido.' });

  const supabaseUrl = getEnv('SUPABASE_URL') || getEnv('VITE_SUPABASE_URL');
  const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_ANON_KEY');
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return json(500, { error: 'Faltan variables Supabase en Netlify: SUPABASE_URL, SUPABASE_ANON_KEY y SUPABASE_SERVICE_ROLE_KEY.' });
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return json(401, { error: 'Sesión de Google no encontrada.' });

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: authData, error: authError } = await userClient.auth.getUser();
  if (authError || !authData?.user?.id) return json(401, { error: 'Sesión inválida o vencida.' });

  const user = authData.user;
  const email = cleanEmail(user.email);
  if (!email) return json(400, { error: 'Google no devolvió un correo válido.' });

  const metadata = user.user_metadata || {};
  const name = metadata.full_name || metadata.name || metadata.preferred_username || email;
  const avatarUrl = metadata.avatar_url || metadata.picture || '';
  const isMasterAdmin = email === MASTER_ADMIN_EMAIL;

  const byId = await selectProfile(adminClient, 'id', user.id);
  const byEmail = byId ? null : await selectProfile(adminClient, 'email', email);
  const existing = byId || byEmail || null;

  const role = isMasterAdmin ? 'admin' : (allowedRoles.has(existing?.role) ? existing.role : 'client');
  const active = isMasterAdmin ? true : existing?.active !== false;
  const phone = existing?.phone || metadata.phone || '';

  const payload = {
    id: user.id,
    email,
    full_name: existing?.full_name || name,
    phone,
    role,
    active,
    updated_at: new Date().toISOString(),
  };
  if (avatarUrl || existing?.avatar_url) payload.avatar_url = existing?.avatar_url || avatarUrl;

  try {
    const profile = await upsertProfile(adminClient, payload);
    return json(200, { ok: true, profile: normalizeProfile(profile) });
  } catch (error) {
    // Si el correo ya existe con otro id por una migración anterior, preservamos ese perfil autorizado.
    if (String(error?.message || '').toLowerCase().includes('duplicate') && existing) {
      return json(200, { ok: true, profile: normalizeProfile({ ...existing, role, active }) });
    }
    return json(400, { error: error.message || 'No se pudo sincronizar el perfil.' });
  }
}
