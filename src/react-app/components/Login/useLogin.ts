import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import { useTheme } from '../../../styles/ThemeProvider';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mode } = useTheme();

  const inputBg = mode === 'clear' ? 'bg-gray-50' : 'bg-brand-dark';
  const inputText = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const inputBorder = mode === 'clear' ? 'border-gray-200' : 'border-white/10';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard', { replace: true });
    }
    setLoading(false);
  };

  return { email, password, setEmail, setPassword, loading, error, handleLogin, mode, inputBg, inputText, inputBorder };
};

export default useLogin;
