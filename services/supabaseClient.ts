
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // We don't throw error immediately to allow app to load, 
  // but auth features will fail if these aren't set
  console.warn('Supabase URL or Key is missing!');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
