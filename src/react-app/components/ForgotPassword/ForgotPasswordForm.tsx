import React from 'react';
import { Mail, Loader2 } from 'lucide-react';
import useForgotPassword from './useForgotPassword';
import ForgotPasswordSkeleton from './ForgotPasswordSkeleton';

const ForgotPasswordForm = () => {
  const { email, setEmail, loading, error, success, handleForgotPassword } = useForgotPassword();

  if (loading) return <ForgotPasswordSkeleton />;

  return (
    <form onSubmit={handleForgotPassword} className="space-y-4" aria-label="Formulário de recuperação de senha">
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
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm text-center">{success}</div>}
    </form>
  );
};

export default ForgotPasswordForm;
