import React from 'react';
import { Calendar, Scale, Handshake, CheckCircle2 } from 'lucide-react';

const HowItWorks: React.FC = () => (
  <section className="py-24 bg-brand-secondary">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Como Funciona a Renegociação de Dívidas pela Lei 14.181/2021</h2>
        <p className="text-white/60">Um processo transparente e seguro para eliminar dívidas e recuperar sua liberdade financeira com consultoria jurídica especializada.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-12 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
        {[
          { icon: Calendar, title: "Agende uma Consulta", desc: "Conversamos sobre seu caso detalhadamente." },
          { icon: Scale, title: "Estratégia Jurídica", desc: "Analisamos todos os seus contratos e dívidas." },
          { icon: Handshake, title: "Negociação Especializada", desc: "Entramos em contato com os credores." },
          { icon: CheckCircle2, title: "Solução Definitiva", desc: "Plano de pagamento aprovado judicialmente." }
        ].map((step, idx) => (
          <div key={idx} className="relative z-10 text-center space-y-6 group">
            <div className="w-20 h-20 bg-brand-elevated rounded-3xl border border-white/10 flex items-center justify-center mx-auto group-hover:bg-brand-primary transition-all duration-500 shadow-xl">
              <step.icon className="text-brand-primary group-hover:text-white transition-colors" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed px-4">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
