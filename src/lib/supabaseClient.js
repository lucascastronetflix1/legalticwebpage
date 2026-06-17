import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawSupabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

function isPlaceholder(value) {
  return !value || value.includes('TU-PROYECTO') || value.includes('TU_ANON_KEY') || value.includes('TU-SUPABASE') || value === 'undefined' || value === 'null';
}

function normalizeSupabaseUrl(value) {
  if (isPlaceholder(value)) return '';
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    if (!url.hostname || !url.hostname.includes('.')) return '';
    return url.origin;
  } catch {
    return '';
  }
}

export const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);
export const supabaseAnonKey = isPlaceholder(rawSupabaseAnonKey) ? '' : rawSupabaseAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabaseConfigStatus = isSupabaseConfigured
  ? 'configured'
  : 'missing_or_invalid_env';

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const documentsBucket = import.meta.env.VITE_SUPABASE_DOCUMENTS_BUCKET || 'service-request-documents';
export const serviceImagesBucket = import.meta.env.VITE_SUPABASE_SERVICE_IMAGES_BUCKET || 'service-images';
