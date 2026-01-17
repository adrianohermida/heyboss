import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
type Cat = { id: number; nome: string };
type Post = { id: string; slug: string; titulo: string; resumo?: string; meta_descricao?: string; imagem_capa_url?: string; categoria_id: number; data_publicacao?: string; created_at?: string };
type Props = { post: Post; category: Cat|null };
const BlogPostCard: React.FC<Props> = ({ post, category }) => (
  <article className="bg-brand-elevated rounded-2xl overflow-hidden border border-white/5 group hover:border-brand-primary/30 transition-all flex flex-col h-full shadow-lg hover:shadow-brand-primary/5">
    <Link to={`/blog/${post.slug}`} className="aspect-[16/10] overflow-hidden block relative">
      <img src={post.imagem_capa_url || 'https://heyboss.heeyo.ai/gemini-image-c5df3e56df0a49fdb468a4708ef7c8a8.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.titulo} />
      <div className="absolute top-4 left-4">
        <span className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">{category?.nome || 'Artigo'}</span>
      </div>
    </Link>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-3 text-white/40 text-xs font-bold uppercase tracking-wider mb-2">
        <Calendar size={14} className="text-brand-primary" />
        {new Date(post.data_publicacao || post.created_at).toLocaleDateString('pt-BR')}
      </div>
      <Link to={`/blog/${post.slug}`}>
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-brand-primary transition-colors line-clamp-2">{post.titulo}</h3>
      </Link>
      <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{post.resumo || post.meta_descricao}</p>
      <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-brand-primary font-bold text-sm group/btn">
        Ler Artigo Completo
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  </article>
);
export default BlogPostCard;
