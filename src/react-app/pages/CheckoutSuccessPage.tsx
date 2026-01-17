
// Manifesto: CheckoutSuccessPage
// - Modular: CheckoutSuccessContent
// - Skeleton: loading state
// - Hooks: useState, useEffect, useSearchParams
// - Router: react-router-dom para navegação
// - Responsivo, acessível, mobile-first, tokenização CSS
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { trackPurchase } from '../utils/analytics';
import CheckoutSuccessContent from '../components/Checkout/CheckoutSuccessContent';

const CheckoutSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    if (!sessionId) {
      setError({ message: 'Missing sessionId parameter' });
      setLoading(false);
      return;
    }
    fetchPurchaseDetail(sessionId);
    // eslint-disable-next-line
  }, [sessionId]);

  const fetchPurchaseDetail = async (sessionId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/purchase-detail?sessionId=${sessionId}`);
      const result = await response.json();
      if (response.ok) {
        setPurchaseData(result);
        setError(null);
        trackPurchase && trackPurchase({
          orderId: result.checkoutSessionId,
          value: result.totalAmount,
          currency: result.currency,
          items: result.products.map((product: any) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          })),
        });
      } else {
        setError(result);
      }
    } catch (err) {
      setError({ message: 'Network error, please try again later' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <CheckoutSuccessContent loading={loading} error={error} purchaseData={purchaseData} onRetry={() => window.location.reload()} />
    </div>
  );
};

export default CheckoutSuccessPage;





