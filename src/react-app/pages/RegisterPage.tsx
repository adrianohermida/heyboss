
import React, { useState } from 'react';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { supabase } from '../../supabaseClient';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../styles/ThemeProvider';


const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { mode } = useTheme();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Cadastro realizado! Verifique seu e-mail para confirmar.');
      setTimeout(() => navigate('/login'), 3000);
    }
    setLoading(false);
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
            <h2 className={`text-3xl font-extrabold ${textMain}`}>Criar Conta</h2>
            <p className={mode === 'clear' ? 'mt-2 text-gray-500' : 'mt-2 text-white/50'}>Preencha seus dados para se cadastrar</p>
          </div>
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">{error}</div>}
          {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm text-center">{success}</div>}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${mode === 'clear' ? 'text-gray-400' : 'text-white/30'}`} size={20} />
              <input
                type="text"
                required
                placeholder="Nome completo"
                value={name}
                onChange={e => setName(e.target.value)}
                className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-xl py-4 pl-12 pr-4 focus:border-brand-primary outline-none transition-all`}
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Cadastrar"}
            </button>
          </form>
          <p className={`text-center text-[10px] mt-4 ${mutedText}`}>Ao se cadastrar, você concorda com nossos Termos de Uso e Política de Privacidade.</p>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default RegisterPage;
