-- Exemplo de schema SQL para Supabase
create table clientes (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Permissões básicas
alter table clientes enable row level security;
create policy "Public read" on clientes for select using (true);
create policy "Authenticated insert" on clientes for insert with check (auth.role() = 'authenticated');
create policy "Authenticated update" on clientes for update using (auth.role() = 'authenticated');
create policy "Authenticated delete" on clientes for delete using (auth.role() = 'authenticated');
