import { useState } from 'react';
import { supabase } from '../../../supabaseClient';

const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.');
    }
    setLoading(false);
  };

  return { email, setEmail, loading, error, success, handleForgotPassword };
};

export default useForgotPassword;
