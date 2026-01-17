import React from 'react';
import { Loader2 } from 'lucide-react';

const ProcessDetailSkeleton = () => (
  <div className="min-h-screen bg-brand-dark flex items-center justify-center">
    <Loader2 className="animate-spin text-brand-primary" size={48} />
  </div>
);

export default ProcessDetailSkeleton;
