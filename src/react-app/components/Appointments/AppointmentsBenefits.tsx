import React from 'react';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

const benefits = [
  { icon: Clock, title: 'Rápido e Prático', desc: 'Agende em menos de 2 minutos sem precisar ligar.' },
  { icon: ShieldCheck, title: 'Sigilo Absoluto', desc: 'Seus dados estão protegidos pela LGPD e pelo sigilo profissional.' },
  { icon: CheckCircle2, title: 'Atendimento Nacional', desc: 'Consultas realizadas via videoconferência para todo o Brasil.' }
];

const AppointmentsBenefits: React.FC = () => (
  <section className="py-6 px-2">
    <div className="max-w-2xl mx-auto space-y-6">
      {benefits.map((item, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="bg-brand-elevated p-3 rounded-xl h-fit">
            <item.icon className="text-brand-primary" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white">{item.title}</h3>
            <p className="text-white/40 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default AppointmentsBenefits;
