-- Table to store OAuth state for CSRF protection
CREATE TABLE IF NOT EXISTS oauth_states (
  state TEXT PRIMARY KEY,
  created_at TEXT NOT NULL
);

-- Table to store Google Calendar OAuth tokens for admin
CREATE TABLE IF NOT EXISTS google_calendar_tokens (
  user_email TEXT PRIMARY KEY,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TEXT,
  scope TEXT,
  token_type TEXT,
  id_token TEXT,
  created_at TEXT NOT NULL
);
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
