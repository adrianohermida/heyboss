import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import { useTheme } from '../../../styles/ThemeProvider';

const useRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { mode } = useTheme();

  const bgMain = mode === 'clear' ? 'bg-white' : 'bg-brand-dark';
  const textMain = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const cardBg = mode === 'clear' ? 'bg-white' : 'bg-brand-elevated';
  const cardBorder = mode === 'clear' ? 'border-gray-200' : 'border-white/10';
  const cardShadow = mode === 'clear' ? 'shadow-lg' : 'shadow-2xl';
  const inputBg = mode === 'clear' ? 'bg-gray-50' : 'bg-brand-dark';
  const inputText = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const inputBorder = mode === 'clear' ? 'border-gray-200' : 'border-white/10';
  const mutedText = mode === 'clear' ? 'text-gray-400' : 'text-white/20';

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

  return {
    name, setName, email, setEmail, password, setPassword, loading, error, success, handleRegister,
    mode, bgMain, textMain, cardBg, cardBorder, cardShadow, inputBg, inputText, inputBorder, mutedText
  };
};

export default useRegister;
