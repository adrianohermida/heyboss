# Cloudflare Worker Proxy para Supabase

## Descrição
Este Worker atua como um proxy seguro para todas as rotas `/api/*`, redirecionando para o endpoint REST do Supabase e aplicando CORS flexível.

- Todas as chamadas do frontend devem ser feitas para `/api/*`.
- O Worker encaminha para `https://sspvizogbcyigquqycsz.supabase.co/rest/v1/*`.
- Não exponha a URL do Supabase diretamente no frontend.
- Não há lógica de negócio no Worker, apenas proxy e CORS.

## Deploy
- O deploy é feito via GitHub Actions ou `npm run deploy`.
- Certifique-se de que as rotas do Worker estão atribuídas ao domínio principal e subdomínio na Cloudflare.

## Segurança de Rede
- Garanta que sua rede/firewall permite conexões HTTPS para github.com e api.cloudflare.com.
- O deploy do Worker não requer portas especiais além de 443 (HTTPS).

## Versionamento
- Todas as alterações neste proxy devem ser versionadas via Git.
- Documente mudanças relevantes neste arquivo.

---
Última atualização: 2026-01-17
Responsável: Adriano Hermida
