import React from 'react';
import { Loader2, KeyRound } from 'lucide-react';
import useGoogleLogin from './useGoogleLogin';

const GoogleLoginButton = () => {
  const { googleLoading, handleGoogleLogin } = useGoogleLogin();
  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={googleLoading}
      className="w-full bg-white text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
      aria-busy={googleLoading}
    >
      {googleLoading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center gap-2"><KeyRound size={18} /> Entrar com Google</span>}
    </button>
  );
};

export default GoogleLoginButton;
