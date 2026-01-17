

// Manifesto: CheckoutErrorPage
// - Modular: CheckoutErrorContent
// - Skeleton: não aplicável (página estática)
// - Hooks: useSearchParams
// - Router: react-router-dom para navegação
// - Responsivo, acessível, mobile-first, tokenização CSS
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CheckoutErrorContent from '../components/Checkout/CheckoutErrorContent';

const CheckoutErrorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message') || 'Ocorreu um erro inesperado ao processar seu pagamento.';
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <CheckoutErrorContent message={message} />
    </div>
  );
};

export default CheckoutErrorPage;





