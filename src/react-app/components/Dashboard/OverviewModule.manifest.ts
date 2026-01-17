// Manifesto: OverviewModule
// - Governança: auditável, compliance LGPD
// - Supabase: múltiplas tabelas agregadas, audit_logs
// - D3 Workers: dashboard_cache, analytics
// - Schema: overview-schema.json
// - SQL: overview.sql
export const overviewModuleManifest = {
  module: 'Overview',
  supabaseTables: ['crm_v12', 'tickets', 'gov_sprint_tasks', 'faturas', 'audit_logs'],
  d3Collections: ['dashboard_cache', 'overview_analytics'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/overview-schema.json',
  sql: 'src/shared/sql/overview.sql',
  cloud: ['supabase', 'd3'],
};
