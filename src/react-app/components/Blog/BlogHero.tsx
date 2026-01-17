import React from 'react';
const BlogHero: React.FC = () => (
  <section className="text-center mb-10 animate-fade-in pt-24">
    <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-full mb-6">
      <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
      <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Notícias e Artigos Jurídicos</span>
    </div>
    <h1 className="text-3xl sm:text-5xl font-extrabold mb-6">Blog de Defesa do Consumidor: Guia para Eliminar Dívidas</h1>
    <p className="text-white/60 max-w-2xl mx-auto text-lg">
      Informação jurídica de qualidade sobre a Lei 14.181/2021 e superendividamento para ajudar você a renegociar dívidas e recuperar sua paz financeira.
    </p>
  </section>
);
export default BlogHero;
