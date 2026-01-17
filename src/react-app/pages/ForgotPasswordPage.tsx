import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { supabase } from '../../supabaseClient';
import { Mail, Loader2 } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-brand-dark selection:bg-brand-primary selection:text-white">
        <Header />
        <main className="flex items-center justify-center px-4 py-12 min-h-[80vh]">
          <div className="w-full max-w-md space-y-8 bg-brand-elevated p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">Recuperar Senha</h2>
              <p className="mt-2 text-white/50">Informe seu e-mail para receber o link de redefinição</p>
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">{error}</div>}
            {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm text-center">{success}</div>}
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                <input
                  type="email"
                  required
                  placeholder="E-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all"
                  aria-label="E-mail para recuperação de senha"
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                aria-busy={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Enviar Link de Recuperação"}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default ForgotPasswordPage;
