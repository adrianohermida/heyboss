// Manifesto: CRMModule
// - Governança: auditável, compliance LGPD
// - Supabase: leads, audit_logs
// - D3 Workers: analytics, cache
// - Schema: crm_v12-schema.json
// - SQL: crm_v12.sql
export const crmModuleManifest = {
  module: 'CRM',
  supabaseTables: ['crm_v12', 'audit_logs'],
  d3Collections: ['crm_analytics'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/crm_v12-schema.json',
  sql: 'src/shared/sql/crm_v12.sql',
  cloud: ['supabase', 'd3'],
};
