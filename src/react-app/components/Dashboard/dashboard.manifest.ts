// Manifesto: Dashboard
// - Modular: DashboardSidebar, DashboardHeaderActions, DashboardSkeleton, módulos de cada aba
// - Skeleton: loading states em cada módulo
// - Hooks: useState, useEffect, useMemo, custom handleExport, handleConfigUpdate
// - Router: react-router-dom
// - Mobile-first, acessível, tokenização CSS

export const dashboardManifest = {
  page: 'Dashboard',
  modules: [
    'DashboardSidebar',
    'DashboardHeaderActions',
    'DashboardSkeleton',
    'OverviewModule',
    'CRMModule',
    'ProcessosModule',
    'FaturasModule',
    'TicketsModule',
    'PublicacoesModule',
    'IAModule',
    'ChatbotConfigModule',
    'BalcaoVirtualModule',
    'AdminAgendaModule',
    'ConfigModule',
  ],
  skeletons: {
    sidebar: 'loading nav',
    header: 'loading actions',
    content: 'loading tab',
  },
  hooks: ['useState', 'useEffect', 'useMemo', 'handleExport', 'handleConfigUpdate'],
  router: 'react-router-dom',
  style: 'mobile-first, acessível, tokenização CSS',
};
