import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA: React.FC = () => (
  <section className="py-24 bg-brand-primary relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,#ffffff20_0%,transparent_50%)]" />
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-8">
        Fale com um Advogado Especialista em Superendividamento Agora
      </h2>
      <p className="text-white/90 text-lg mb-12 max-w-2xl mx-auto">
        Não deixe as dívidas controlarem sua vida. Nossa advocacia especializada
        em superendividamento e redução de dívidas está pronta para lutar por você.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://wa.me/5551996032004"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-dark text-white px-10 py-5 rounded-2xl font-extrabold text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 text-center"
        >
          Falar no WhatsApp
        </a>
        <Link
          to="/appointments"
          className="bg-white text-brand-primary px-10 py-5 rounded-2xl font-extrabold text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 text-center"
        >
          Agendar avaliação
        </Link>
      </div>
    </div>
  </section>
);

export default FinalCTA;
