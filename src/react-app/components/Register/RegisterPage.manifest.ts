// Manifesto: RegisterPage
// - Governança: auditável, compliance LGPD
// - Supabase: usuarios_ext, audit_logs
// - D3 Workers: register_cache
// - Schema: usuarios_ext-schema.json
// - SQL: usuarios_ext.sql
export const registerPageManifest = {
  page: 'RegisterPage',
  supabaseTables: ['usuarios_ext', 'audit_logs'],
  d3Collections: ['register_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/usuarios_ext-schema.json',
  sql: 'src/shared/sql/usuarios_ext.sql',
  cloud: ['supabase', 'd3'],
};
