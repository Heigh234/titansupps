/**
 * app/api/webhooks/stripe/route.ts
 * ─────────────────────────────────────────────────────────────────
 * Webhook de Stripe para confirmar pagos completados.
 * IMPORTANTE: Este endpoint debe excluirse del middleware de auth
 * y de cualquier transformación del body (necesita el raw body).
 *
 * Copiar este archivo a: titansupps-main/app/api/webhooks/stripe/route.ts
 */

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { confirmOrderPayment } from '@/actions/checkout';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body      = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

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

  // Procesar el evento
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
        // TODO: Actualizar order.payment_status = 'failed' y notificar al usuario
        console.log('[Stripe Webhook] Payment failed for PI:', paymentIntent.id);
        break;
      }

      case 'charge.dispute.created': {
        // TODO: Notificar al equipo de un chargeback
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
