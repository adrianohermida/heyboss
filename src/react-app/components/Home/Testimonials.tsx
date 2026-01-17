import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => (
  <section className="py-24 bg-brand-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Depoimentos de Clientes sobre Defesa do Consumidor e Dívidas</h2>
        <p className="text-white/60">Histórias reais de quem recuperou a paz com nossa advocacia especializada em dívidas e superendividamento.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Maria Silva", text: "Eu não conseguia mais dormir. O Dr. Adriano conseguiu reduzir minha dívida em 70% e agora consigo pagar com dignidade.", rating: 5 },
          { name: "João Santos", text: "Excelente atendimento. Profissionais extremamente competentes que realmente entendem da Lei do Superendividamento.", rating: 5 },
          { name: "Ana Costa", text: "Minha vida mudou. Estava presa em juros abusivos de cartões e hoje tenho um plano de pagamento que cabe no meu bolso.", rating: 5 }
        ].map((t, idx) => (
          <div key={idx} className="bg-brand-elevated p-8 rounded-3xl border border-white/5 relative">
            <div className="flex text-brand-accent mb-6">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-white/80 italic mb-8 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <img src={`https://ui-avatars.com/api/?name=${t.name.replace(' ', '+')}&background=0d9c6e&color=fff`} className="w-12 h-12 rounded-full" alt={`Depoimento de ${t.name} sobre sucesso na redução de dívidas`} />
              <div>
                <p className="text-white font-bold">{t.name}</p>
                <p className="text-white/40 text-xs">Cliente Verificado</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
