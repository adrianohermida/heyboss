// Manifesto: ClientPortalProcessos
// - Governança: auditável, compliance LGPD
// - Supabase: gov_sprint_tasks, audit_logs
// - D3 Workers: processos_cache
// - Schema: gov_sprint_tasks-schema.json
// - SQL: gov_sprint_tasks.sql
export const clientPortalProcessosManifest = {
  module: 'ClientPortalProcessos',
  supabaseTables: ['gov_sprint_tasks', 'audit_logs'],
  d3Collections: ['processos_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/gov_sprint_tasks-schema.json',
  sql: 'src/shared/sql/gov_sprint_tasks.sql',
  cloud: ['supabase', 'd3'],
};
