// Manifesto: ClientPortalTickets
// - Governança: auditável, compliance LGPD
// - Supabase: tickets, ticket_threads, audit_logs
// - D3 Workers: tickets_cache
// - Schema: tickets-schema.json
// - SQL: tickets.sql
export const clientPortalTicketsManifest = {
  module: 'ClientPortalTickets',
  supabaseTables: ['tickets', 'ticket_threads', 'audit_logs'],
  d3Collections: ['tickets_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/tickets-schema.json',
  sql: 'src/shared/sql/tickets.sql',
  cloud: ['supabase', 'd3'],
};
