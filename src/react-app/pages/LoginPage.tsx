

/**
 * @description Página de Login para Hermida Maia Advocacia.
 *             Oferece opções de login via Google e E-mail (OTP).
 *             Integrada ao @hey-boss/users-service para gestão de identidade.
 *             Redireciona para o painel administrativo ou portal após o login.
 */

import React, { useState, useEffect } from "react";
import { supabase } from '../../supabaseClient';
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-brand-elevated p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
        
        <div className="text-center">
          <div className="bg-brand-primary rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-primary/20">
            <img src="https://heyboss.heeyo.ai/user-assets/logo_lzI6JHzO.png" alt="Logo" className="w-10 h-10 object-cover" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Acesse sua Área</h2>
          <p className="mt-2 text-white/50">Acesso restrito a clientes cadastrados via Link Mágico</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}


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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Entrar"}
            <ArrowRight size={20} />
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <Link to="/register" className="text-brand-primary text-sm hover:underline text-center">Criar conta</Link>
          <Link to="/forgot-password" className="text-white/40 text-xs hover:underline text-center">Esqueceu a senha?</Link>
        </div>

        <p className="text-center text-[10px] text-white/20">
          Ao entrar, você concorda com nossos Termos de Uso e Política de Privacidade.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


