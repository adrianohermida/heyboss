import React from 'react';
import { Calendar, User } from 'lucide-react';
type Props = { titulo: string; data: string; autor: string };
const BlogPostHeader: React.FC<Props> = ({ titulo, data, autor }) => (
  <header className="mb-10 text-center">
    <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-full mb-6">
      <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Artigo Jurídico</span>
    </div>
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">{titulo}</h1>
    <div className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm font-medium">
      <div className="flex items-center gap-2"><Calendar size={16} className="text-brand-primary" />{data}</div>
      <div className="flex items-center gap-2"><User size={16} className="text-brand-primary" />{autor}</div>
    </div>
  </header>
);
export default BlogPostHeader;
