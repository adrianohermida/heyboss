// Manifesto: ClientPortalPlano
// - Governança: auditável, compliance LGPD
// - Supabase: planos, audit_logs
// - D3 Workers: plano_cache
// - Schema: planos-schema.json
// - SQL: planos.sql
export const clientPortalPlanoManifest = {
  module: 'ClientPortalPlano',
  supabaseTables: ['planos', 'audit_logs'],
  d3Collections: ['plano_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/planos-schema.json',
  sql: 'src/shared/sql/planos.sql',
  cloud: ['supabase', 'd3'],
};
