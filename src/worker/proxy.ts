/**
 * Cloudflare Worker: Proxy/CORS para Supabase
 * Todas as rotas /api/* são redirecionadas para o endpoint REST do Supabase.
 * Ajusta CORS para permitir qualquer origem.
 * Não expõe lógica de negócio, apenas proxy seguro.
 *
 * Edite o endpoint Supabase conforme necessário.
 */

const SUPABASE_BASE = 'https://sspvizogbcyigquqycsz.supabase.co'; // endpoint do seu projeto

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      // Mapeia /api/foo -> /rest/v1/foo
      const supabasePath = '/rest/v1/' + url.pathname.replace(/^\/api\//, '');
      const proxyUrl = SUPABASE_BASE + supabasePath + (url.search || '');
      const proxyReq = new Request(proxyUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
        redirect: 'manual',
      });
      let resp = await fetch(proxyReq);
      // CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '*',
        'Access-Control-Allow-Credentials': 'true',
      };
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
      }
      const newHeaders = new Headers(resp.headers);
      Object.entries(corsHeaders).forEach(([k, v]) => newHeaders.set(k, v));
      return new Response(resp.body, { status: resp.status, headers: newHeaders });
    }
    return new Response('Not found', { status: 404 });
  }
};
