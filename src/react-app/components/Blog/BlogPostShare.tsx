import React from 'react';
import { Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
type Props = { whatsapp: string };
const BlogPostShare: React.FC<Props> = ({ whatsapp }) => (
  <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-8">
    <div className="flex items-center gap-4">
      <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Compartilhar:</span>
      <div className="flex gap-3">
        <button className="w-10 h-10 bg-brand-elevated rounded-xl flex items-center justify-center text-white/60 hover:text-brand-primary hover:bg-brand-primary/10 transition-all"><Facebook size={18} /></button>
        <button className="w-10 h-10 bg-brand-elevated rounded-xl flex items-center justify-center text-white/60 hover:text-brand-primary hover:bg-brand-primary/10 transition-all"><Twitter size={18} /></button>
        <button className="w-10 h-10 bg-brand-elevated rounded-xl flex items-center justify-center text-white/60 hover:text-brand-primary hover:bg-brand-primary/10 transition-all"><Linkedin size={18} /></button>
      </div>
    </div>
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-brand-primary/20">
      <MessageCircle size={20} />
      Falar com Especialista
    </a>
  </div>
);
export default BlogPostShare;
