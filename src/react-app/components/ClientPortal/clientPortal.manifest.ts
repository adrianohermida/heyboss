// Manifesto: ClientPortal manifest
// - Descreve estrutura, módulos, props, skeletons, hooks, router
// - Modular: cada seção em um componente
// - Skeleton: loading states por módulo
// - Hooks: useState, useEffect, custom hooks
// - Router: react-router-dom
// - Mobile-first, acessível, tokenização CSS

export const clientPortalManifest = {
  page: 'ClientPortal',
  modules: [
    'ClientPortalSidebar',
    'ClientPortalOverview',
    'ClientPortalProcessos',
    'ClientPortalTickets',
    'ClientPortalFinanceiro',
    'ClientPortalDocumentos',
    'ClientPortalPlano',
    'ClientPortalAgenda',
  ],
  skeletons: {
    sidebar: 'loading nav',
    overview: 'loading cards',
    processos: 'loading table',
    tickets: 'loading list',
    financeiro: 'loading invoices',
    documentos: 'loading docs',
    plano: 'loading plan',
    agenda: 'loading schedule',
  },
  hooks: ['useState', 'useEffect', 'custom hooks'],
  router: 'react-router-dom',
  style: 'mobile-first, acessível, tokenização CSS',
};
