// Manifesto: ClientPortalOverview
// - Governança: auditável, compliance LGPD
// - Supabase: gov_modules, audit_logs
// - D3 Workers: overview_cache
// - Schema: gov_modules-schema.json
// - SQL: gov_modules.sql
export const clientPortalOverviewManifest = {
  module: 'ClientPortalOverview',
  supabaseTables: ['gov_modules', 'audit_logs'],
  d3Collections: ['overview_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/gov_modules-schema.json',
  sql: 'src/shared/sql/gov_modules.sql',
  cloud: ['supabase', 'd3'],
};
