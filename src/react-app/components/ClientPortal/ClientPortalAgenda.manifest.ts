// Manifesto: ClientPortalAgenda
// - Governança: auditável, compliance LGPD
// - Supabase: agenda, audit_logs
// - D3 Workers: agenda_cache
// - Schema: agenda-schema.json
// - SQL: agenda.sql
export const clientPortalAgendaManifest = {
  module: 'ClientPortalAgenda',
  supabaseTables: ['agenda', 'audit_logs'],
  d3Collections: ['agenda_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/agenda-schema.json',
  sql: 'src/shared/sql/agenda.sql',
  cloud: ['supabase', 'd3'],
};
