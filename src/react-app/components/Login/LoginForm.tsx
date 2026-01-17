import React from 'react';
import { Mail, Lock, Loader2, LogIn } from 'lucide-react';
import useLogin from './useLogin';

const LoginForm = () => {
  const { email, password, setEmail, setPassword, loading, error, handleLogin, mode, inputBg, inputText, inputBorder } = useLogin();
  return (
    <form onSubmit={handleLogin} className="space-y-4" aria-label="Formulário de login">
      <div className="relative">
        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${mode === 'clear' ? 'text-gray-400' : 'text-white/30'}`} size={20} />
        <input
          type="email"
          required
          placeholder="seu@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-xl py-4 pl-12 pr-4 focus:border-brand-primary outline-none transition-all`}
          aria-label="E-mail para login"
          autoComplete="email"
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
          aria-label="Senha para login"
          autoComplete="current-password"
        />
      </div>
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        aria-busy={loading}
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center gap-2"><LogIn size={18} /> Entrar</span>}
      </button>
    </form>
  );
};

export default LoginForm;
