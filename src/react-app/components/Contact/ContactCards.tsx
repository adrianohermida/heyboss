// Manifesto: ContactCards
// - Lista cartões de contato (telefone, email, endereço)
// - Mobile-first, acessível, tokenização CSS
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
const cards = [
  { icon: Phone, title: 'Telefone & WhatsApp', value: '(51) 99603-2004', link: 'https://wa.me/5551996032004', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
  { icon: Mail, title: 'E-mail', value: 'contato@hermidamaia.adv.br', link: 'mailto:contato@hermidamaia.adv.br', color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
  { icon: MapPin, title: 'Endereço', value: 'Atendimento Nacional Online', link: '#', color: 'text-blue-400', bg: 'bg-blue-400/10' },
];
const ContactCards: React.FC = () => (
  <div className="grid lg:grid-cols-3 gap-8 mb-20">
    {cards.map((item, idx) => (
      <a
        key={idx}
        href={item.link}
        target={item.link.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="bg-brand-elevated p-8 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-all group text-center"
        aria-label={item.title}
      >
        <div className={`${item.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
          <item.icon className={item.color} size={28} aria-hidden />
        </div>
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        <p className="text-white/50 font-medium">{item.value}</p>
      </a>
    ))}
  </div>
);
export default ContactCards;
