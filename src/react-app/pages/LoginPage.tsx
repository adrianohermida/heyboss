

/**
 * @description Página de Login para Hermida Maia Advocacia.
 *             Oferece opções de login via Google e E-mail (OTP).
 *             Integrada ao @hey-boss/users-service para gestão de identidade.
 *             Redireciona para o painel administrativo ou portal após o login.
 */


import React, { useState, useEffect } from "react";
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
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-brand-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input
                type="password"
                required
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-brand-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all"
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Entrar com Senha"}
              <ArrowRight size={20} />
            </button>
          </form>
        </div>

        {/* Login social Google */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full bg-white text-brand-primary border border-brand-primary/30 hover:bg-brand-primary/10 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 text-sm shadow"
          >
            {googleLoading ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
            Entrar com Google
          </button>
        </div>

        {/* Login por link mágico */}
        <div className="mt-6">
          <form onSubmit={handleMagicLink} className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <MailCheck className="text-brand-primary" size={20} />
              <span className="text-white/80 text-sm font-bold">Acesso via Link Mágico</span>
            </div>
            <input
              type="email"
              required
              placeholder="E-mail para link mágico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-brand-dark border border-white/10 rounded-xl py-3 px-4 text-white focus:border-brand-primary outline-none transition-all"
            />
            {magicError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs text-center">{magicError}</div>
            )}
            {magicSent && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl text-xs text-center">Link mágico enviado! Verifique seu e-mail.</div>
            )}
            <button
              type="submit"
              disabled={magicLoading}
              className="w-full bg-brand-primary/80 hover:bg-brand-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 text-sm"
            >
              {magicLoading ? <Loader2 className="animate-spin" size={18} /> : "Enviar Link Mágico"}
              <KeyRound size={18} />
            </button>
          </form>
        </div>

        {/* Recuperação de senha */}
        <div className="flex flex-col gap-2 mt-6">
          <Link to="/forgot-password" className="text-brand-primary text-sm hover:underline text-center">Esqueceu a senha?</Link>
        </div>

        <div className="mt-6 text-xs text-white/40 text-center">
          <p>Usuário administrador: <span className="text-brand-primary font-bold">adrianohermida@gmail.com</span></p>
          <p>Colaboradores e clientes: acesso apenas se já cadastrados pelo escritório.</p>
        </div>

        <p className="text-center text-[10px] text-white/20 mt-4">
          Ao entrar, você concorda com nossos Termos de Uso e Política de Privacidade.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


