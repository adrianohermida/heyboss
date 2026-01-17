

/**
 * @description Página de Login para Hermida Maia Advocacia.
 *             Oferece opções de login via Google e E-mail (OTP).
 *             Integrada ao @hey-boss/users-service para gestão de identidade.
 *             Redireciona para o painel administrativo ou portal após o login.
 */



import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import LoginForm from '../components/Login/LoginForm';
import GoogleLoginButton from '../components/Login/GoogleLoginButton';
import MagicLinkForm from '../components/Login/MagicLinkForm';
import { loginPageManifest } from '../components/Login/LoginPage.manifest';
import { useTheme } from '../../styles/ThemeProvider';

const LoginPage = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();

  useEffect(() => {
    const sessionCheck = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/dashboard', { replace: true });
      }
    };
    sessionCheck();
  }, [navigate]);

  const bgMain = mode === 'clear' ? 'bg-white' : 'bg-brand-dark';
  const textMain = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const cardBg = mode === 'clear' ? 'bg-white' : 'bg-brand-elevated';
  const cardBorder = mode === 'clear' ? 'border-gray-200' : 'border-white/10';
  const cardShadow = mode === 'clear' ? 'shadow-lg' : 'shadow-2xl';
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
          <div className="space-y-2">
            <LoginForm />
            <div className="flex justify-between items-center mt-2">
              <Link to="/forgot-password" className="text-xs text-brand-primary font-bold hover:underline">Esqueci minha senha</Link>
              <Link to="/register" className="text-xs text-brand-primary font-bold hover:underline">Criar Conta</Link>
            </div>
          </div>
          <div className="mt-8">
            <GoogleLoginButton />
          </div>
          <div className="mt-8">
            <MagicLinkForm />
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default LoginPage;
