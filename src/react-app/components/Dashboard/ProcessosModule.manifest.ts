// Manifesto: ProcessosModule
// - Governança: auditável, compliance LGPD
// - Supabase: gov_sprint_tasks, gov_modules, gov_contracts, audit_logs
// - D3 Workers: tasks_queue, cache
// - Schema: gov_sprint_tasks-schema.json
// - SQL: gov_sprint_tasks.sql
export const processosModuleManifest = {
  module: 'Processos',
  supabaseTables: ['gov_sprint_tasks', 'gov_modules', 'gov_contracts', 'audit_logs'],
  d3Collections: ['tasks_queue'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/gov_sprint_tasks-schema.json',
  sql: 'src/shared/sql/gov_sprint_tasks.sql',
  cloud: ['supabase', 'd3'],
};
