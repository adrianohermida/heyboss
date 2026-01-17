import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';

const items = [
  {
    icon: Target,
    title: 'Missão',
    desc: 'Soluções jurídicas inovadoras para libertar consumidores do superendividamento, garantindo dignidade e paz financeira.'
  },
  {
    icon: Eye,
    title: 'Visão',
    desc: 'Ser referência nacional na defesa do consumidor endividado, reconhecido pela excelência técnica e ética.'
  },
  {
    icon: Heart,
    title: 'Valores',
    desc: 'Ética, transparência, empatia e compromisso com a justiça social e o mínimo existencial.'
  }
];

const MissionVisionValues: React.FC = () => (
  <section className="py-16 bg-brand-dark">
    <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <div key={idx} className="bg-brand-elevated p-6 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all group">
          <div className="bg-brand-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <item.icon className="text-brand-primary" size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
          <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default MissionVisionValues;
