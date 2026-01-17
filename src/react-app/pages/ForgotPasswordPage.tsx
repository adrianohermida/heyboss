
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ForgotPasswordForm from '../components/ForgotPassword/ForgotPasswordForm';
import { forgotPasswordPageManifest } from '../components/ForgotPassword/ForgotPasswordPage.manifest';

const ForgotPasswordPage = () => (
  <>
    <div className="min-h-screen bg-brand-dark selection:bg-brand-primary selection:text-white">
      <Header />
      <main className="flex items-center justify-center px-4 py-12 min-h-[80vh]">
        <section className="w-full max-w-md space-y-8 bg-brand-elevated p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden animate-fade-in" aria-labelledby="forgot-password-title">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
          <div className="text-center">
            <h2 id="forgot-password-title" className="text-3xl font-extrabold text-white">Recuperar Senha</h2>
            <p className="mt-2 text-white/50">Informe seu e-mail para receber o link de redefinição</p>
          </div>
          <ForgotPasswordForm />
        </section>
      </main>
      <Footer />
    </div>
    <ScrollToTopButton />
  </>
);

export default ForgotPasswordPage;
