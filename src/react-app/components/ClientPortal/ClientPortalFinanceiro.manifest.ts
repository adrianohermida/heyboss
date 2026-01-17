// Manifesto: ClientPortalFinanceiro
// - Governança: auditável, compliance LGPD
// - Supabase: faturas, audit_logs
// - D3 Workers: financeiro_cache
// - Schema: faturas-schema.json
// - SQL: faturas.sql
export const clientPortalFinanceiroManifest = {
  module: 'ClientPortalFinanceiro',
  supabaseTables: ['faturas', 'audit_logs'],
  d3Collections: ['financeiro_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/faturas-schema.json',
  sql: 'src/shared/sql/faturas.sql',
  cloud: ['supabase', 'd3'],
};
