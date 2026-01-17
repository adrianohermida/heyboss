

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

import { useTheme } from '../../styles/ThemeProvider';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicError, setMagicError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { mode } = useTheme();

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

  // Classes dinâmicas para tema
  const bgMain = mode === 'clear' ? 'bg-white' : 'bg-brand-dark';
  const textMain = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const cardBg = mode === 'clear' ? 'bg-white' : 'bg-brand-elevated';
  const cardBorder = mode === 'clear' ? 'border-gray-200' : 'border-white/10';
  const cardShadow = mode === 'clear' ? 'shadow-lg' : 'shadow-2xl';
  const inputBg = mode === 'clear' ? 'bg-gray-50' : 'bg-brand-dark';
  const inputText = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const inputBorder = mode === 'clear' ? 'border-gray-200' : 'border-white/10';
  const mutedText = mode === 'clear' ? 'text-gray-400' : 'text-white/20';

  return (
    <>
      <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${bgMain} ${textMain}`}>
        <div className={`max-w-md w-full space-y-8 ${cardBg} p-8 sm:p-12 rounded-[2.5rem] border ${cardBorder} ${cardShadow} relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
          <div className="text-center">
            <div className="bg-brand-primary rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-primary/20">
              <img src="https://heyboss.heeyo.ai/user-assets/logo_lzI6JHzO.png" alt="Logo" className="w-10 h-10 object-cover" />
            </div>
            <h2 className={`text-3xl font-extrabold ${textMain}`}>Acesse sua Área</h2>
            <p className={mode === 'clear' ? 'mt-2 text-gray-500' : 'mt-2 text-white/50'}>
              <span className="block">Acesso restrito a clientes e colaboradores cadastrados.</span>
              <span className="block text-xs mt-1 text-brand-primary">Somente usuários previamente cadastrados podem acessar.</span>
              <span className={`block text-xs mt-1 ${mutedText}`}>Não é possível criar conta por este formulário.</span>
            </p>
          </div>

          {/* Login por e-mail/senha */}
          <div className="space-y-2">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${mode === 'clear' ? 'text-gray-400' : 'text-white/30'}`} size={20} />
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-xl py-4 pl-12 pr-4 focus:border-brand-primary outline-none transition-all`}
                />
              </div>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${mode === 'clear' ? 'text-gray-400' : 'text-white/30'}`} size={20} />
                <input
                  type="password"
                  required
                  placeholder="Senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-xl py-4 pl-12 pr-4 focus:border-brand-primary outline-none transition-all`}
                />
              </div>
              {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center gap-2"><LogIn size={18} /> Entrar</span>}
              </button>
            </form>
            <div className="flex justify-between items-center mt-2">
              <Link to="/forgot-password" className="text-xs text-brand-primary font-bold hover:underline">Esqueci minha senha</Link>
              <Link to="/register" className="text-xs text-brand-primary font-bold hover:underline">Criar Conta</Link>
            </div>
          </div>

          {/* Login Google */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full bg-white text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {googleLoading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center gap-2"><KeyRound size={18} /> Entrar com Google</span>}
            </button>
          </div>

          {/* Login por link mágico */}
          <div className="mt-8">
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${mode === 'clear' ? 'text-gray-400' : 'text-white/30'}`} size={20} />
                <input
                  type="email"
                  required
                  placeholder="Seu e-mail para link mágico"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-xl py-4 pl-12 pr-4 focus:border-brand-primary outline-none transition-all`}
                />
              </div>
              {magicError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">{magicError}</div>}
              {magicSent && <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm text-center flex items-center gap-2 justify-center"><MailCheck size={18} /> Link enviado! Verifique seu e-mail.</div>}
              <button
                type="submit"
                disabled={magicLoading}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {magicLoading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center gap-2"><ArrowRight size={18} /> Entrar com Link Mágico</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default LoginPage;
