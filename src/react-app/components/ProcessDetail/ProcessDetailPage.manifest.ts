// Manifesto: ProcessDetailPage
// - Governança: auditável, compliance LGPD
// - Supabase: processos, audit_logs, movimentos, tarefas, documentos, publicacoes, faturas, tickets
// - D3 Workers: processos_cache
// - Schema: processos-schema.json
// - SQL: processos.sql
export const processDetailPageManifest = {
  page: 'ProcessDetailPage',
  supabaseTables: ['processos', 'audit_logs', 'movimentos', 'tarefas', 'documentos', 'publicacoes', 'faturas', 'tickets'],
  d3Collections: ['processos_cache'],
  audit: true,
  governance: true,
  schema: 'src/shared/schemas/processos-schema.json',
  sql: 'src/shared/sql/processos.sql',
  cloud: ['supabase', 'd3'],
};
