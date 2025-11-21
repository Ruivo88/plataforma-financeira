import { createClient } from '@supabase/supabase-js';

// 1. Tenta pegar do Next.js (process.env)
// 2. Tenta pegar do Vite (import.meta.env)
// 3. SE FALHAR, usa a string direta (Hardcoded Fallback)

const getEnvVar = (key: string, fallback: string) => {
  if (typeof process !== 'undefined' && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return fallback;
};

// Suas chaves reais como fallback para garantir que nunca falhe
const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://wmqxizdcvatjtqitmfcm.supabase.co');
const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcXhpemRjdmF0anRxaXRtZmNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0OTQyNzgsImV4cCI6MjA3OTA3MDI3OH0.VUnJ1u6ok56hO8z6bDRMxeAm2Bp27Oh6qnkOfA4iJlk');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERRO CRÍTICO: Impossível conectar ao Supabase.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
