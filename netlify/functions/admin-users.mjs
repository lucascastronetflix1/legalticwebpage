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

function generateTemporaryPassword() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const randomPart = Array.from({ length: 10 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  return `LegalTIC-${randomPart}#`;
}

function getEnv(name) {
  return process.env[name] || '';
}

function isMissingAvatarColumnError(error) {
  const text = String(error?.message || error?.details || error?.hint || '').toLowerCase();
  return text.includes('avatar_url') && (text.includes('does not exist') || text.includes('could not find') || text.includes('schema cache'));
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Método no permitido.' });

  const supabaseUrl = getEnv('SUPABASE_URL') || getEnv('VITE_SUPABASE_URL');
  const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_ANON_KEY');
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return json(500, { error: 'Faltan variables SUPABASE_URL/VITE_SUPABASE_URL, SUPABASE_ANON_KEY/VITE_SUPABASE_ANON_KEY o SUPABASE_SERVICE_ROLE_KEY en Netlify.' });
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return json(401, { error: 'Sesión de administrador no encontrada.' });

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: callerData, error: callerError } = await userClient.auth.getUser();
  if (callerError || !callerData?.user?.id) return json(401, { error: 'Sesión inválida.' });

  const { data: callerProfile, error: profileError } = await adminClient
    .from('profiles')
    .select('id, email, role, active')
    .eq('id', callerData.user.id)
    .maybeSingle();
  if (profileError) return json(500, { error: profileError.message });
  if (!callerProfile || callerProfile.role !== 'admin' || callerProfile.active === false) {
    return json(403, { error: 'Solo un administrador activo puede gestionar usuarios.' });
  }

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'JSON inválido.' }); }

  const action = body.action || 'upsert';
  const email = String(body.email || '').trim().toLowerCase();
  const fullName = String(body.fullName || body.full_name || email).trim() || email;
  const phone = String(body.phone || '').trim();
  const role = allowedRoles.has(body.role) ? body.role : 'client';
  const active = body.active !== false;
  const password = body.password ? String(body.password) : '';
  const isMaster = String(callerProfile.email || '').trim().toLowerCase() === MASTER_ADMIN_EMAIL;

  if (!email) return json(400, { error: 'Correo obligatorio.' });
  if (role === 'admin' && !isMaster) return json(403, { error: 'Solo el administrador maestro puede crear o convertir administradores.' });

  if (action === 'reset-password') {
    return json(400, { error: 'La recuperación por correo fue desactivada. El usuario debe recuperar su acceso desde Google.' });
  }

  let userId = String(body.id || '').trim();
  let temporaryPassword = '';

  if (action === 'delete-user') {
    if (!userId && !email) return json(400, { error: 'Falta identificar el usuario a eliminar.' });
    if (email === MASTER_ADMIN_EMAIL) return json(403, { error: 'No se puede eliminar el administrador maestro.' });

    let targetProfile = null;
    if (userId) {
      const { data, error } = await adminClient
        .from('profiles')
        .select('id, email, role, active')
        .eq('id', userId)
        .maybeSingle();
      if (error) return json(400, { error: error.message });
      targetProfile = data;
    }
    if (!targetProfile && email) {
      const { data, error } = await adminClient
        .from('profiles')
        .select('id, email, role, active')
        .ilike('email', email)
        .maybeSingle();
      if (error) return json(400, { error: error.message });
      targetProfile = data;
      userId = data?.id || userId;
    }

    if (!targetProfile || !userId) return json(404, { error: 'Usuario no encontrado en profiles.' });
    const targetEmail = String(targetProfile.email || '').trim().toLowerCase();
    if (targetEmail === MASTER_ADMIN_EMAIL) return json(403, { error: 'No se puede eliminar el administrador maestro.' });
    if (targetProfile.role === 'admin' && !isMaster) return json(403, { error: 'Solo el administrador maestro puede eliminar administradores.' });
    if (userId === callerData.user.id) return json(403, { error: 'No puedes eliminar tu propio usuario mientras tienes la sesión abierta.' });

    const { error: profileDeleteError } = await adminClient
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (profileDeleteError) return json(400, { error: profileDeleteError.message });

    const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(userId);
    if (authDeleteError) return json(400, { error: authDeleteError.message });

    return json(200, { ok: true, deletedId: userId, deletedEmail: targetEmail });
  }

  if (action === 'upsert') {
    if (!userId) {
      return json(400, { error: 'Primero el usuario debe ingresar con Google. Después podrá autorizarse o cambiarse de rol desde esta bandeja.' });
    }

    if (!userId) return json(400, { error: 'No se pudo determinar el ID del usuario.' });

    const profilePayload = {
      id: userId,
      email,
      full_name: fullName,
      phone,
      role,
      active,
      updated_at: new Date().toISOString(),
    };
    const runProfileUpsert = (selectColumns) => adminClient
      .from('profiles')
      .upsert(profilePayload, { onConflict: 'id' })
      .select(selectColumns)
      .single();

    let { data: profile, error: upsertError } = await runProfileUpsert('id, email, full_name, phone, role, active, avatar_url');
    if (upsertError && isMissingAvatarColumnError(upsertError)) {
      const fallback = await runProfileUpsert('id, email, full_name, phone, role, active');
      profile = fallback.data;
      upsertError = fallback.error;
    }

    if (upsertError) return json(400, { error: upsertError.message });


    return json(200, {
      ok: true,
      temporaryPassword,
      profile: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name || profile.email,
        phone: profile.phone || '',
        role: profile.role || 'client',
        active: profile.active !== false,
        avatarUrl: profile.avatar_url || '',
      },
    });
  }

  return json(400, { error: 'Acción no soportada.' });
}
