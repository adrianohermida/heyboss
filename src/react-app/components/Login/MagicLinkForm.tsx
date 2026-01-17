import React from 'react';
import { Mail, Loader2, ArrowRight, MailCheck } from 'lucide-react';
import useMagicLink from './useMagicLink';

const MagicLinkForm = () => {
  const { email, setEmail, magicLoading, magicError, magicSent, handleMagicLink, mode, inputBg, inputText, inputBorder } = useMagicLink();
  return (
    <form onSubmit={handleMagicLink} className="space-y-4" aria-label="Formulário de link mágico">
      <div className="relative">
        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${mode === 'clear' ? 'text-gray-400' : 'text-white/30'}`} size={20} />
        <input
          type="email"
          required
          placeholder="Seu e-mail para link mágico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-xl py-4 pl-12 pr-4 focus:border-brand-primary outline-none transition-all`}
          aria-label="E-mail para link mágico"
          autoComplete="email"
        />
      </div>
      {magicError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">{magicError}</div>}
      {magicSent && <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm text-center flex items-center gap-2 justify-center"><MailCheck size={18} /> Link enviado! Verifique seu e-mail.</div>}
      <button
        type="submit"
        disabled={magicLoading}
        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        aria-busy={magicLoading}
      >
        {magicLoading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center gap-2"><ArrowRight size={18} /> Entrar com Link Mágico</span>}
      </button>
    </form>
  );
};

export default MagicLinkForm;
