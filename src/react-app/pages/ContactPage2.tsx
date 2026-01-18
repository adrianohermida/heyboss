

// Manifesto: ContactPage2
// - Modular: ContactHero, ContactCards, ContactFormSection
// - Skeleton: loading states em cada módulo
// - Hooks: useState, handleSubmit
// - Router: react-router-dom
// - Mobile-first, acessível, tokenização CSS
import React, { useState } from 'react';
import { useTheme } from '../../styles/ThemeProvider';
import clsx from 'clsx';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ContactHero from '../components/Contact/ContactHero';
import ContactCards from '../components/Contact/ContactCards';
import ContactFormSection from '../components/Contact/ContactFormSection';
import { CustomForm } from '../components/CustomForm';
import { contactFormTheme } from '../components/CustomForm/themes';
import allConfigs from '../../shared/form-configs.json';

const ContactPage2: React.FC = () => {
  const { mode } = useTheme();
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId: 'contact_form', ...formData }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus({ type: 'success', message: 'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.' });
      } else {
        setStatus({ type: 'error', message: result.message || 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Erro de conexão. Verifique sua internet e tente novamente.' });
    }
  };
  return (
    <>
      <Header />
      <main
        className={clsx(
          'min-h-screen selection:bg-brand-primary selection:text-white pt-32 pb-24',
          mode === 'clear'
            ? 'bg-white text-gray-900'
            : 'bg-brand-dark text-white'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactHero />
          <ContactCards />
          <ContactFormSection
            status={status}
            setStatus={setStatus}
            onSubmit={handleSubmit}
            CustomForm={CustomForm}
            schema={allConfigs.contact_form.jsonSchema}
            theme={contactFormTheme}
          />
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default ContactPage2;
