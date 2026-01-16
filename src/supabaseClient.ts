import { createClient } from '@supabase/supabase-js';

// Use variáveis de ambiente para segurança

// Tenta carregar de .env.local, se não, usa .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
	// Ajuda no debug em produção
	// eslint-disable-next-line no-console
	console.error('Supabase URL ou ANON KEY não definidos! Verifique seu arquivo .env ou .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);