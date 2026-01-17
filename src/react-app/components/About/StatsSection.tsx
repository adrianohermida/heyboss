import React from 'react';

const stats = [
  { label: 'Clientes Atendidos', value: '+2.500' },
  { label: 'Dívidas Renegociadas', value: 'R$ 35M+' },
  { label: 'Anos de Experiência', value: '12+' },
  { label: 'Estados Atendidos', value: '26 + DF' }
];

const StatsSection: React.FC = () => (
  <section className="py-16 bg-brand-primary relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ffffff10_0%,transparent_50%)]" aria-hidden />
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
      {stats.map((stat, i) => (
        <div key={i} className="space-y-1">
          <p className="text-2xl md:text-4xl font-black text-white">{stat.value}</p>
          <p className="text-white/80 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
