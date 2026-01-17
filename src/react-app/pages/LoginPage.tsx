

/**
 * @description Página de Login para Hermida Maia Advocacia.
 *             Oferece opções de login via Google e E-mail (OTP).
 *             Integrada ao @hey-boss/users-service para gestão de identidade.
 *             Redireciona para o painel administrativo ou portal após o login.
 */


import React, { useState, useEffect } from "react";
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { supabase } from '../../supabaseClient';
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2, KeyRound, MailCheck, LogIn } from "lucide-react";
  const [googleLoading, setGoogleLoading] = useState(false);
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth/callback'
        }
      });
      if (error) setError(error.message);
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com Google');
    } finally {
      setGoogleLoading(false);
    }
  };

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicError, setMagicError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionCheck = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/dashboard", { replace: true });
      }
    };
    sessionCheck();
  }, [navigate]);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard", { replace: true });
    }
    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setMagicLoading(true);
    setMagicError("");
    setMagicSent(false);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMagicError(error.message);
    } else {
      setMagicSent(true);
    }
    setMagicLoading(false);
  };


  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-brand-elevated p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
        <div className="text-center">
          <div className="bg-brand-primary rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-primary/20">
            <img src="https://heyboss.heeyo.ai/user-assets/logo_lzI6JHzO.png" alt="Logo" className="w-10 h-10 object-cover" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Acesse sua Área</h2>
          <p className="mt-2 text-white/50">
            <span className="block">Acesso restrito a clientes e colaboradores cadastrados.</span>
            <span className="block text-xs mt-1 text-brand-primary">Somente usuários previamente cadastrados podem acessar.</span>
            <span className="block text-xs mt-1 text-white/40">Não é possível criar conta por este formulário.</span>
          </p>
        </div>


        {/* Login por e-mail/senha */}
        <div className="space-y-2">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input
                type="email"
                required
                placeholder="seu@email.com"
                value={email}
                return (
                  <>
                    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4 py-12">
                      {/* ...existing code... */}
                    </div>
                    <Footer />
                    <ScrollToTopButton />
                  </>
                );
                onChange={e => setPassword(e.target.value)}

                className="w-full bg-brand-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all"

              />
