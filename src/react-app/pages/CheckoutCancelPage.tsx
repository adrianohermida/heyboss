

// Manifesto: CheckoutCancelPage
// - Modular: CheckoutCancelContent
// - Skeleton: não aplicável (página estática)
// - Hooks: não requer
// - Router: react-router-dom para navegação
// - Responsivo, acessível, mobile-first, tokenização CSS
import React from 'react';
import CheckoutCancelContent from '../components/Checkout/CheckoutCancelContent';

const CheckoutCancelPage: React.FC = () => (
  <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
    <CheckoutCancelContent />
  </div>
);

export default CheckoutCancelPage;





