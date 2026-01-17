import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutFinalCTA: React.FC = () => (
  <section className="py-16 bg-brand-secondary">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-white">Pronto para recomeçar sua história?</h2>
      <p className="text-white/60 text-base md:text-lg mb-8">Não deixe que as dívidas definam quem você é. Nossa equipe está pronta para aplicar a lei a seu favor e devolver sua liberdade.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a 
          href="https://wa.me/5551996032004" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-xl font-extrabold text-base md:text-lg shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} />
          Falar com Especialista
        </a>
        <Link 
          to="/contato"
          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-extrabold text-base md:text-lg transition-all flex items-center justify-center gap-2"
        >
          Agendar Consulta
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  </section>
);

export default AboutFinalCTA;
