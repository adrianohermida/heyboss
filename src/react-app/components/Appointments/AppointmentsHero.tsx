import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const AppointmentsHero: React.FC = () => (
  <section className="pt-28 pb-10 sm:pt-36 sm:pb-16 bg-brand-dark text-white text-center">
    <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-full mb-6">
      <CalendarIcon size={16} className="text-brand-primary" />
      <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Agendamento Online</span>
    </div>
    <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
      Reserve sua Consulta com um <span className="text-brand-primary">Especialista</span>
    </h1>
    <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mt-4">
      Dê o primeiro passo para recuperar sua tranquilidade financeira. Escolha o melhor horário para conversarmos sobre seu caso.
    </p>
  </section>
);

export default AppointmentsHero;
