// Manifesto: FaturasModule
// - Governança: auditável, compliance LGPD
// - Supabase: faturas, audit_logs
// - D3 Workers: payment_cache, analytics
// - Schema: faturas-schema.json
// - SQL: faturas.sql
export const faturasModuleManifest = {
  module: 'Faturas',
  supabaseTables: ['faturas', 'audit_logs'],
  d3Collections: ['payment_cache', 'faturas_analytics'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/faturas-schema.json',
  sql: 'src/shared/sql/faturas.sql',
  cloud: ['supabase', 'd3'],
};
