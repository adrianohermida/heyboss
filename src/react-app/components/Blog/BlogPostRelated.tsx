import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
type Post = { id: string; slug: string; titulo: string; imagem_capa_url: string };
type Props = { related: Post[] };
const BlogPostRelated: React.FC<Props> = ({ related }) => (
  <section className="mt-20 pt-20 border-t border-white/5">
    <h2 className="text-2xl font-bold text-white mb-8 text-center">Artigos Relacionados</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {related.map(rel => (
        <Link key={rel.id} to={`/blog/${rel.slug}`} className="bg-brand-elevated rounded-3xl overflow-hidden border border-white/5 group hover:border-brand-primary/30 transition-all">
          <div className="aspect-video overflow-hidden">
            <img src={rel.imagem_capa_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={rel.titulo} />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors line-clamp-2">{rel.titulo}</h3>
            <div className="mt-4 text-brand-primary font-bold text-sm flex items-center gap-2">Ler mais <ArrowRight size={16} /></div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
export default BlogPostRelated;
