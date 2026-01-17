import React from 'react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import useRegister from './useRegister';

const RegisterForm = () => {
  const { name, setName, email, setEmail, password, setPassword, loading, error, success, handleRegister, mode, inputBg, inputText, inputBorder, mutedText } = useRegister();
  return (
    <form onSubmit={handleRegister} className="space-y-4" aria-label="Formulário de cadastro">
      <div className="relative">
        <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${mode === 'clear' ? 'text-gray-400' : 'text-white/30'}`} size={20} />
        <input
          type="text"
          required
          placeholder="Nome completo"
          value={name}
          onChange={e => setName(e.target.value)}
          className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-xl py-4 pl-12 pr-4 focus:border-brand-primary outline-none transition-all`}
          aria-label="Nome completo"
        />
      </div>
      <div className="relative">
        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${mode === 'clear' ? 'text-gray-400' : 'text-white/30'}`} size={20} />
        <input
          type="email"
          required
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-xl py-4 pl-12 pr-4 focus:border-brand-primary outline-none transition-all`}
          aria-label="E-mail para cadastro"
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
          aria-label="Senha para cadastro"
          autoComplete="new-password"
        />
      </div>
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm text-center">{success}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        aria-busy={loading}
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Cadastrar"}
      </button>
      <p className={`text-center text-[10px] mt-4 ${mutedText}`}>Ao se cadastrar, você concorda com nossos Termos de Uso e Política de Privacidade.</p>
    </form>
  );
};

export default RegisterForm;
