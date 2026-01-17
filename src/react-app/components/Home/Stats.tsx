import React from 'react';
import { ShieldCheck, TrendingDown, Zap, Smile } from 'lucide-react';
import { useTheme } from '../../../styles/ThemeProvider';

const Stats: React.FC = () => {
  const { mode } = useTheme();
  const bg = mode === 'clear' ? 'bg-gray-50' : 'bg-brand-secondary';
  const text = mode === 'clear' ? 'text-gray-900' : 'text-white';
  return (
    <section className={`py-20 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-extrabold ${text} mb-4`}>Resultados Reais na Redução e Renegociação de Dívidas</h2>
          <p className={`${mode === 'clear' ? 'text-brand-dark/60' : 'text-white/60'} max-w-2xl mx-auto`}>Nossa advocacia especializada em dívidas foca em resultados reais para quem busca o fim das cobranças abusivas e a solução rápida para dívidas.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Proteção Legal", desc: "Blindagem contra cobranças abusivas e ameaças de credores com acordo judicial." },
            { icon: TrendingDown, title: "Redução de Dívidas", desc: "Cortes significativos no valor total através da Lei 14.181/2021." },
            { icon: Zap, title: "Solução Rápida", desc: "Processos otimizados para eliminar dívidas de forma definitiva e ágil." },
            { icon: Smile, title: "Tranquilidade", desc: "Recupere sua dignidade financeira com nossa consultoria jurídica especializada." }
          ].map((stat, idx) => (
            <div key={idx} className={`p-8 rounded-2xl transition-all group shadow ${mode === 'clear' ? 'bg-white border border-gray-200 hover:border-brand-primary/30' : 'bg-brand-elevated border border-white/5 hover:border-brand-primary/30'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${mode === 'clear' ? 'bg-gray-100' : 'bg-brand-primary/10'}`}>
                <stat.icon className="text-brand-primary" size={28} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${text}`}>{stat.title}</h3>
              <p className={`${mode === 'clear' ? 'text-gray-700' : 'text-white/50'} text-sm leading-relaxed`}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
