// Manifesto: ClientPortalDocumentos
// - Governança: auditável, compliance LGPD
// - Supabase: documentos, audit_logs
// - D3 Workers: documentos_cache
// - Schema: documentos-schema.json
// - SQL: documentos.sql
export const clientPortalDocumentosManifest = {
  module: 'ClientPortalDocumentos',
  supabaseTables: ['documentos', 'audit_logs'],
  d3Collections: ['documentos_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/documentos-schema.json',
  sql: 'src/shared/sql/documentos.sql',
  cloud: ['supabase', 'd3'],
};
