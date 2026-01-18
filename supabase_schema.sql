-- Tabela de pedidos (orders) para integração com CheckoutSuccessPage
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique, -- ID da sessão de checkout (Stripe ou outro)
  user_id uuid references auth.users(id), -- usuário que fez a compra
  products jsonb not null, -- array de produtos [{id, name, price, quantity, ...}]
  total_amount numeric not null, -- valor total
  currency text not null default 'BRL',
  status text not null default 'pending', -- ex: 'pending', 'paid', 'failed'
  checkout_session_id text, -- redundante para compatibilidade
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- RLS: Somente o usuário autenticado pode ver seus próprios pedidos
alter table public.orders enable row level security;
create policy "Users can view their own orders" on public.orders
  for select using (auth.uid() = user_id);
create policy "Users can insert their own orders" on public.orders
  for insert with check (auth.uid() = user_id);
create policy "Users can update their own orders" on public.orders
  for update using (auth.uid() = user_id);
create policy "Users can delete their own orders" on public.orders
  for delete using (auth.uid() = user_id);
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
