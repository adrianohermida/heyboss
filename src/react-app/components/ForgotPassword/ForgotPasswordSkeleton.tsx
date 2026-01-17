import React from 'react';

const ForgotPasswordSkeleton = () => (
  <div className="w-full max-w-md space-y-8 bg-brand-elevated p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl animate-pulse">
    <div className="h-8 bg-brand-dark/30 rounded w-2/3 mx-auto mb-4" />
    <div className="h-4 bg-brand-dark/20 rounded w-1/2 mx-auto mb-6" />
    <div className="h-12 bg-brand-dark/20 rounded mb-4" />
    <div className="h-12 bg-brand-primary/20 rounded mb-4" />
    <div className="h-8 bg-brand-dark/10 rounded w-full" />
  </div>
);

export default ForgotPasswordSkeleton;
