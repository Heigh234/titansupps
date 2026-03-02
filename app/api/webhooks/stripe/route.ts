/**
 * app/api/webhooks/stripe/route.ts
 * ─────────────────────────────────────────────────────────────────
 * Webhook de Stripe para confirmar pagos completados.
 */

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { confirmOrderPayment } from '@/actions/checkout';

export async function POST(req: Request) {
  // Inicializar Stripe dentro de la función para evitar errores de build
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const body        = await req.text();
  const headersList = await headers();
  const signature   = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await confirmOrderPayment(paymentIntent.id);
        console.log('[Stripe Webhook] Order confirmed for PI:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('[Stripe Webhook] Payment failed for PI:', paymentIntent.id);
        break;
      }

      case 'charge.dispute.created': {
        console.warn('[Stripe Webhook] Dispute created:', event.data.object);
        break;
      }

      default:
        console.log('[Stripe Webhook] Unhandled event type:', event.type);
    }
  } catch (err) {
    console.error('[Stripe Webhook] Error processing event:', err);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
