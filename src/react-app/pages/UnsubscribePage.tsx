
/**
 * @description This file defines the UnsubscribePage component.
 *             It allows users to remove their email from the newsletter mailing list.
 *             It handles the API call to the worker and displays success or error messages.
 *             Important variables: email (from query params), status (loading/success/error).
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MailX, CheckCircle2, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import ScrollToTopButton from '../components/ScrollToTopButton';

export const UnsubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const email = searchParams.get('email');

  const handleUnsubscribe = async () => {
    if (!email) {
      setStatus('error');
      setMessage('E-mail não fornecido.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('success');
        setMessage(result.message || 'Você foi removido da nossa lista com sucesso.');
      } else {
        setStatus('error');
        setMessage(result.error || 'Ocorreu um erro ao processar sua solicitação.');
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

  return (
    <>
      <div className="min-h-screen bg-brand-dark flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-brand-elevated p-8 rounded-[2rem] border border-white/10 shadow-2xl text-center">
            {/* ...existing code... */}
          </div>
        </main>
        <footer className="py-10 text-center border-t border-white/5">
          <p className="text-xs text-white/20">
            © 2024 Hermida Maia Advocacia. Todos os direitos reservados.
          </p>
        </footer>
      </div>
      <ScrollToTopButton />
    </>
  );
}

export default UnsubscribePage;









