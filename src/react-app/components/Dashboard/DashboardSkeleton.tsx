// Manifesto: DashboardSkeleton
// - Skeleton de loading para dashboard
// - Mobile-first, acessível, tokenização CSS
import React from 'react';
const DashboardSkeleton: React.FC = () => (
  <div className="flex justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand-primary border-solid" aria-label="Carregando" />
  </div>
);
export default DashboardSkeleton;
