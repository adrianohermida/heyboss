import React from 'react';
const BlogSkeleton: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
    {[...Array(6)].map((_,i)=>(
      <div key={i} className="bg-brand-elevated rounded-2xl border border-white/10 animate-pulse h-72" />
    ))}
  </div>
);
export default BlogSkeleton;
