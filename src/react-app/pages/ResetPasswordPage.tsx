

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ResetPasswordForm from '../components/ResetPassword/ResetPasswordForm';
import ResetPasswordSkeleton from '../components/ResetPassword/ResetPasswordSkeleton';
import { resetPasswordPageManifest } from '../components/ResetPassword/ResetPasswordPage.manifest';

const ResetPasswordPage = () => {
  // Could add loading state for async skeleton if needed
  return (
    <>
      <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white">
        <Header />
        <main className="flex items-center justify-center px-4 py-12 min-h-[80vh]">
          <div className="w-full max-w-md space-y-8 bg-brand-elevated p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">Redefinir Senha</h2>
              <p className="mt-2 text-white/50">Digite sua nova senha abaixo</p>
            </div>
            <ResetPasswordForm />
          </div>
        </main>
        <Footer />
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default ResetPasswordPage;
