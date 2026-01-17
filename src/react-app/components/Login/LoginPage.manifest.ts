// Manifesto: LoginPage
// - Governança: auditável, compliance LGPD
// - Supabase: usuarios_ext, audit_logs
// - D3 Workers: login_cache
// - Schema: usuarios_ext-schema.json
// - SQL: usuarios_ext.sql
export const loginPageManifest = {
  page: 'LoginPage',
  supabaseTables: ['usuarios_ext', 'audit_logs'],
  d3Collections: ['login_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/usuarios_ext-schema.json',
  sql: 'src/shared/sql/usuarios_ext.sql',
  cloud: ['supabase', 'd3'],
};
