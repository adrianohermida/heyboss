// Exemplo de uso do Supabase para CRUD em uma tabela "clientes"
import { supabase } from '../supabaseClient';

export async function getClientes() {
  const { data, error } = await supabase.from('clientes').select('*');
  if (error) throw error;
  return data;
}

export async function addCliente(cliente: { nome: string; email: string }) {
  const { data, error } = await supabase.from('clientes').insert([cliente]);
  if (error) throw error;
  return data;
}

export async function updateCliente(id: string, updates: any) {
  const { data, error } = await supabase.from('clientes').update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteCliente(id: string) {
  const { data, error } = await supabase.from('clientes').delete().eq('id', id);
  if (error) throw error;
  return data;
}
