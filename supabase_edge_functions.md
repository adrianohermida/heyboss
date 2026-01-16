# Supabase Edge Functions Example

# Inicialize o diretório de funções
supabase functions init

# Crie uma nova função
supabase functions new hello-world

# Edite o arquivo criado em functions/hello-world/index.ts

# Exemplo de função:
import { serve } from 'std/server';

serve(async (req) => {
  return new Response('Hello from Supabase Edge Functions!', {
    headers: { 'Content-Type': 'text/plain' },
  });
});

# Deploy da função
supabase functions deploy hello-world

# Invocar função
supabase functions invoke hello-world
