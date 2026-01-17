import React from 'react';
import { Lock, Loader2 } from 'lucide-react';
import useResetPassword from './useResetPassword';

const ResetPasswordForm = () => {
  const { password, setPassword, loading, error, success, handleResetPassword, mode, inputBg, inputText, inputBorder } = useResetPassword();
  return (
    <form onSubmit={handleResetPassword} className="space-y-4" aria-label="Formulário de redefinição de senha">
      <div className="relative">
        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${mode === 'clear' ? 'text-gray-400' : 'text-white/30'}`} size={20} />
        <input
          type="password"
          required
          placeholder="Nova senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-xl py-4 pl-12 pr-4 focus:border-brand-primary outline-none transition-all`}
          aria-label="Nova senha"
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
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Redefinir Senha"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
