// Manifesto: TicketsModule
// - Governança: auditável, compliance LGPD
// - Supabase: tickets, ticket_threads, contacts, agents, groups, audit_logs
// - D3 Workers: notifications, cache
// - Schema: tickets-schema.json
// - SQL: tickets.sql
export const ticketsModuleManifest = {
  module: 'Tickets',
  supabaseTables: ['tickets', 'ticket_threads', 'contacts', 'agents', 'groups', 'audit_logs'],
  d3Collections: ['ticket_notifications'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/tickets-schema.json',
  sql: 'src/shared/sql/tickets.sql',
  cloud: ['supabase', 'd3'],
};
