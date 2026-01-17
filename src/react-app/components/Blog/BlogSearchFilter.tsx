import React from 'react';
import { Search } from 'lucide-react';
type Cat = { id: number; nome: string };
type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  categories: Cat[];
  activeCategory: number|null;
  setActiveCategory: (v: number|null) => void;
};
const BlogSearchFilter: React.FC<Props> = ({ searchTerm, setSearchTerm, categories, activeCategory, setActiveCategory }) => (
  <div className="max-w-4xl mx-auto mb-10 space-y-6">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
      <input
        type="text"
        placeholder="Buscar artigos por título ou assunto..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full bg-brand-elevated border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all shadow-xl"
      />
    </div>
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => setActiveCategory(null)}
        className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${!activeCategory ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'}`}
      >
        Todos
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${activeCategory === cat.id ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'}`}
        >
          {cat.nome}
        </button>
      ))}
    </div>
  </div>
);
export default BlogSearchFilter;
