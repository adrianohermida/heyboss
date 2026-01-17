import React, { useState } from 'react';

export function useCreateStripeInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);

  async function createInvoice(customerId, items = []) {
    setLoading(true);
    setError(null);
    try {
      // MCP endpoint: /api/mcp/stripe/invoice
      const res = await fetch('/api/mcp/stripe/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, items })
      });
      const data = await res.json();
      if (res.ok) setInvoice(data.invoice);
      else setError(data.error || 'Erro ao criar fatura');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { createInvoice, loading, error, invoice };
}

export function useMarkStripeInvoicePaid() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function markPaid(invoiceId) {
    setLoading(true);
    setError(null);
    try {
      // MCP endpoint: /api/mcp/stripe/invoice/mark-paid
      const res = await fetch(`/api/mcp/stripe/invoice/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId })
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else setError(data.error || 'Erro ao baixar fatura');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { markPaid, loading, error, result };
}

export function useCreateStripeSubscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subscription, setSubscription] = useState(null);

  async function createSubscription(customerId, priceId) {
    setLoading(true);
    setError(null);
    try {
      // MCP endpoint: /api/mcp/stripe/subscription
      const res = await fetch('/api/mcp/stripe/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, priceId })
      });
      const data = await res.json();
      if (res.ok) setSubscription(data.subscription);
      else setError(data.error || 'Erro ao criar assinatura');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { createSubscription, loading, error, subscription };
}

export function useCancelStripeSubscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function cancelSubscription(subscriptionId) {
    setLoading(true);
    setError(null);
    try {
      // MCP endpoint: /api/mcp/stripe/subscription/cancel
      const res = await fetch('/api/mcp/stripe/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId })
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else setError(data.error || 'Erro ao cancelar assinatura');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { cancelSubscription, loading, error, result };
}
