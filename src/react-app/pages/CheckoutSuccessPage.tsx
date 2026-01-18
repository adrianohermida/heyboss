
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
import { supabase } from '../supabaseClient';

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
    // Try to fetch order; if not found, insert it (frontend fallback)
    const ensureOrder = async () => {
      setLoading(true);
      // Try to fetch order first
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('session_id', sessionId)
        .single();
      if (!data) {
        // No order found, try to insert (fallback for static sites)
        // You may want to get cart data from localStorage or context here
        const cartRaw = localStorage.getItem('cart');
        let cart = [];
        try { cart = cartRaw ? JSON.parse(cartRaw) : []; } catch {}
        if (cart && cart.length > 0) {
          const totalAmount = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
          const orderInsert = {
            session_id: sessionId,
            products: cart,
            total_amount: totalAmount,
            currency: 'BRL',
            created_at: new Date().toISOString(),
          };
          const { data: inserted, error: insertError } = await supabase
            .from('orders')
            .insert([orderInsert])
            .select('*')
            .single();
          if (inserted) {
            setPurchaseData(inserted);
            setError(null);
            localStorage.removeItem('cart'); // clear cart after order
            if (trackPurchase) {
              trackPurchase({
                orderId: inserted.checkout_session_id || inserted.session_id,
                value: inserted.total_amount,
                currency: inserted.currency,
                items: Array.isArray(inserted.products)
                  ? inserted.products.map((product: any) => ({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: product.quantity,
                    }))
                  : [],
              });
            }
          } else {
            setError({ message: insertError?.message || 'Erro ao registrar pedido.' });
            setPurchaseData(null);
          }
        } else {
          setError({ message: 'Pedido não encontrado e carrinho vazio.' });
          setPurchaseData(null);
        }
      } else {
        setPurchaseData(data);
        setError(null);
        if (trackPurchase) {
          trackPurchase({
            orderId: data.checkout_session_id || data.session_id,
            value: data.total_amount,
            currency: data.currency,
            items: Array.isArray(data.products)
              ? data.products.map((product: any) => ({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: product.quantity,
                }))
              : [],
          });
        }
      }
      setLoading(false);
    };
    ensureOrder();
    // eslint-disable-next-line
  }, [sessionId]);

  const fetchPurchaseDetail = async (sessionId: string) => {
    try {
      setLoading(true);
      // Busca pedido pelo session_id na tabela orders
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('session_id', sessionId)
        .single();
      if (error || !data) {
        setError({ message: error?.message || 'Pedido não encontrado.' });
        setPurchaseData(null);
      } else {
        setPurchaseData(data);
        setError(null);
        // Analytics (opcional)
        if (trackPurchase) {
          trackPurchase({
            orderId: data.checkout_session_id || data.session_id,
            value: data.total_amount,
            currency: data.currency,
            items: Array.isArray(data.products)
              ? data.products.map((product: any) => ({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: product.quantity,
                }))
              : [],
          });
        }
      }
    } catch (err) {
      setError({ message: 'Erro de rede ao buscar pedido.' });
      setPurchaseData(null);
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





