import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import { useTheme } from '../../../styles/ThemeProvider';

const useResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { mode } = useTheme();

  const inputBg = mode === 'clear' ? 'bg-gray-50' : 'bg-brand-dark';
  const inputText = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const inputBorder = mode === 'clear' ? 'border-gray-200' : 'border-white/10';

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Senha redefinida com sucesso!');
      setTimeout(() => navigate('/login'), 3000);
    }
    setLoading(false);
  };

  return { password, setPassword, loading, error, success, handleResetPassword, mode, inputBg, inputText, inputBorder };
};

export default useResetPassword;
