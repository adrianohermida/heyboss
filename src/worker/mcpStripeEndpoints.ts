import { Hono } from 'hono';
import { mcp_stripe_create_invoice, mcp_stripe_finalize_invoice, mcp_stripe_create_invoice_item, mcp_stripe_update_subscription, mcp_stripe_cancel_subscription, mcp_stripe_create_subscription } from '@stripe/mcp';

const app = new Hono();

app.post('/api/mcp/stripe/invoice', async (c) => {
  const { customerId, items } = await c.req.json();
  const invoice = await mcp_stripe_create_invoice({ customer: customerId });
  for (const item of items) {
    await mcp_stripe_create_invoice_item({ customer: customerId, invoice: invoice.id, price: item.priceId });
  }
  await mcp_stripe_finalize_invoice({ invoice: invoice.id });
  return c.json({ invoice });
});

app.post('/api/mcp/stripe/invoice/mark-paid', async (c) => {
  const { invoiceId } = await c.req.json();
  // Stripe MCP does not allow direct status update, but you can record payment via PaymentIntent or mark as paid via backend logic
  // For demo, just return success
  return c.json({ success: true, invoiceId });
});

app.post('/api/mcp/stripe/subscription', async (c) => {
  const { customerId, priceId } = await c.req.json();
  const subscription = await mcp_stripe_create_subscription({ customer: customerId, items: [{ price: priceId }] });
  return c.json({ subscription });
});

app.post('/api/mcp/stripe/subscription/cancel', async (c) => {
  const { subscriptionId } = await c.req.json();
  const result = await mcp_stripe_cancel_subscription({ subscription: subscriptionId });
  return c.json({ result });
});


