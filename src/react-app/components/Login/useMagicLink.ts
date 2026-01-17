import { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { useTheme } from '../../../styles/ThemeProvider';

const useMagicLink = () => {
  const [email, setEmail] = useState('');
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicError, setMagicError] = useState('');
  const [magicSent, setMagicSent] = useState(false);
  const { mode } = useTheme();

  const inputBg = mode === 'clear' ? 'bg-gray-50' : 'bg-brand-dark';
  const inputText = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const inputBorder = mode === 'clear' ? 'border-gray-200' : 'border-white/10';

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setMagicLoading(true);
    setMagicError('');
    setMagicSent(false);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMagicError(error.message);
    } else {
      setMagicSent(true);
    }
    setMagicLoading(false);
  };

  return { email, setEmail, magicLoading, magicError, magicSent, handleMagicLink, mode, inputBg, inputText, inputBorder };
};

export default useMagicLink;
