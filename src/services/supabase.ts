// src/services/supabaseClient.ts
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Gantilah dengan URL dan Key dari Supabase Project Anda
const SUPABASE_URL = 'https://rscmhdaieasjpjmbmnqq.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY21oZGFpZWFzanBqbWJtbnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4MTczNjgsImV4cCI6MjA1NDM5MzM2OH0.1xK00kphHbOnf1CKDs-NcMQKoVTLZKhgBLotBjY9UOw';
const supabaseOptions = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  supabaseOptions,
);
