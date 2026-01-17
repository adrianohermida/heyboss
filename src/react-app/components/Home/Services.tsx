import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const Services: React.FC = () => (
  <section id="serviços" className="py-24 bg-brand-secondary">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Advocacia Especializada em Dívidas e Defesa do Consumidor</h2>
        <p className="text-white/60">Soluções jurídicas completas para defesa do consumidor, acordo judicial e fim das cobranças abusivas.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          "Defesa Contra Juros Abusivos e Cobranças Ilegais",
          "Superendividamento Lei 14.181/2021 - Renegociação de Dívidas",
          "Recuperação Judicial e Extrajudicial de Empresas",
          "Acordos Extrajudiciais com Credores e Instituições Financeiras",
          "Representação Junto ao BACEN e Órgãos de Defesa do Consumidor",
          "Defesa Contra Fraudes Bancárias e Golpes Pix"
        ].map((service, idx) => (
          <div key={idx} className="group bg-brand-elevated p-8 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-brand-primary/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                <CheckCircle2 className="text-brand-primary group-hover:text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">{service}</h3>
            </div>
            <button className="mt-8 text-brand-primary font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Saiba mais <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
