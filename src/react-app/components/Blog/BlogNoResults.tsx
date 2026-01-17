import React from 'react';
type Props = { onClear: () => void };
const BlogNoResults: React.FC<Props> = ({ onClear }) => (
  <div className="text-center py-20 bg-brand-elevated rounded-3xl border border-dashed border-white/10">
    <p className="text-white/40 text-lg">Nenhum artigo encontrado para sua busca.</p>
    <button onClick={onClear} className="mt-4 text-brand-primary font-bold hover:underline">Limpar filtros</button>
  </div>
);
export default BlogNoResults;
