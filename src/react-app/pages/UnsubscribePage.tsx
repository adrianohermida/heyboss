
/**
 * @description This file defines the UnsubscribePage component.
 *             It allows users to remove their email from the newsletter mailing list.
 *             It handles the API call to the worker and displays success or error messages.
 *             Important variables: email (from query params), status (loading/success/error).
 */


import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MailX, CheckCircle2, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Footer from '../components/Footer';
import { useTheme } from '../../styles/ThemeProvider';


export const UnsubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const email = searchParams.get('email');
  const { mode } = useTheme();

  const handleUnsubscribe = async () => {
    if (!email) {
      setStatus('error');
      setMessage('E-mail não fornecido.');
      return;
    }

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('email', email);
      if (!error) {
        setStatus('success');
        setMessage('Você foi removido da nossa lista com sucesso.');
      } else {
        setStatus('error');
        setMessage('Ocorreu um erro ao processar sua solicitação.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    if (email) {
      handleUnsubscribe();
    }
  }, [email]);

  // Classes dinâmicas para fundo/texto/borda
  const bgMain = mode === 'clear' ? 'bg-white' : 'bg-brand-dark';
  const textMain = mode === 'clear' ? 'text-gray-900' : 'text-white';
  const cardBg = mode === 'clear' ? 'bg-white' : 'bg-brand-elevated';
  const cardBorder = mode === 'clear' ? 'border-gray-200' : 'border-white/10';
  const cardShadow = mode === 'clear' ? 'shadow-lg' : 'shadow-2xl';
  const footerText = mode === 'clear' ? 'text-gray-400' : 'text-white/20';
  const footerBorder = mode === 'clear' ? 'border-gray-100' : 'border-white/5';

  return (
    <>
      <div className={`min-h-screen flex flex-col ${bgMain} ${textMain}`}>
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className={`max-w-md w-full ${cardBg} p-8 rounded-[2rem] border ${cardBorder} ${cardShadow} text-center`}>
            {status === 'loading' && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-brand-primary mx-auto" size={36} />
                <p className="font-medium">Processando sua solicitação...</p>
              </div>
            )}
            {status === 'success' && (
              <div className="flex flex-col items-center gap-4">
                <CheckCircle2 className="text-green-500 mx-auto" size={36} />
                <h2 className="text-xl font-bold">Removido com sucesso</h2>
                <p className="text-base font-medium">{message}</p>
                <Link to="/" className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl font-bold bg-brand-primary text-white hover:bg-brand-primary/90 transition-all">
                  <ArrowLeft size={18} /> Voltar para o início
                </Link>
              </div>
            )}
            {status === 'error' && (
              <div className="flex flex-col items-center gap-4">
                <AlertCircle className="text-red-500 mx-auto" size={36} />
                <h2 className="text-xl font-bold">Erro ao remover</h2>
                <p className="text-base font-medium">{message}</p>
                <Link to="/" className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl font-bold bg-brand-primary text-white hover:bg-brand-primary/90 transition-all">
                  <ArrowLeft size={18} /> Voltar para o início
                </Link>
              </div>
            )}
            {status === 'idle' && (
              <div className="flex flex-col items-center gap-4">
                <MailX className="text-brand-primary mx-auto" size={36} />
                <h2 className="text-xl font-bold">Remover inscrição</h2>
                <p className="text-base font-medium">Estamos processando sua solicitação...</p>
              </div>
            )}
          </div>
        </main>
        <Footer className={`border-t ${footerBorder} mt-auto`}>
          <p className={`text-xs ${footerText}`}>
            © 2024 Hermida Maia Advocacia. Todos os direitos reservados.
          </p>
        </Footer>
      </div>
      <ScrollToTopButton />
    </>
  );
}

export default UnsubscribePage;









