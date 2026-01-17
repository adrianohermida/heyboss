import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

const works = [
  { title: 'A Lei do Superendividamento Comentada', type: 'Ebook', desc: 'Guia completo sobre a Lei 14.181/2021, com análises práticas e jurisprudência.', image: 'https://heyboss.heeyo.ai/gemini-image-c5df3e56df0a49fdb468a4708ef7c8a8.png' },
  { title: 'O Mínimo Existencial na Prática', type: 'Artigo Técnico', desc: 'Análise sobre dignidade humana aplicada às dívidas bancárias.', image: 'https://heyboss.heeyo.ai/gemini-image-805a2be1c3c8401c828287f865b36b4c.png' },
  { title: 'Manual de Superendividado', type: 'Ebook', desc: 'Estratégias para consumidores lidarem com cobranças abusivas e juros altos.', image: 'https://heyboss.heeyo.ai/user-assets/5d67058a6_manual-superendividado_0FQQG9Ox.jpg' }
];

const WorksSection: React.FC = () => (
  <section className="py-16 bg-brand-dark">
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-full mb-2">
          <BookOpen size={16} className="text-brand-primary" />
          <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Autoridade Acadêmica</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Obras e Publicações</h2>
        <p className="text-white/60 text-xs md:text-base max-w-2xl mx-auto">Conhecimento técnico compartilhado para fortalecer a defesa do consumidor.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {works.map((work, idx) => (
          <div key={idx} className="group bg-brand-elevated rounded-2xl overflow-hidden border border-white/5 hover:border-brand-primary/30 transition-all">
            <div className="aspect-[3/4] overflow-hidden relative">
              <img src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60" aria-hidden />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-brand-primary text-white text-[10px] font-bold uppercase px-2 py-1 rounded mb-1 inline-block">{work.type}</span>
                <h3 className="text-base font-bold text-white leading-tight">{work.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-white/50 text-xs leading-relaxed mb-3">{work.desc}</p>
              <button className="text-brand-primary font-bold text-xs flex items-center gap-2 group-hover:gap-3 transition-all">
                Saiba mais <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WorksSection;
