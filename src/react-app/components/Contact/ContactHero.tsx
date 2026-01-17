// Manifesto: ContactHero
// - Exibe título e subtítulo da página de contato
// - Mobile-first, acessível, tokenização CSS
import React from 'react';
const ContactHero: React.FC = () => (
  <section className="text-center mb-16 animate-fade-in">
    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Fale com um Advogado Especialista em Dívidas</h1>
    <p className="text-white/60 max-w-2xl mx-auto text-lg">
      Estamos prontos para ajudar você a recuperar sua paz financeira através da Lei do Superendividamento. Escolha o canal de sua preferência.
    </p>
  </section>
);
export default ContactHero;
