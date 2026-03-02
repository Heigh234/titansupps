/**
 * app/order/[id]/data.ts — Mock data de pedidos
 * ───────────────────────────────────────────────
 * En producción: reemplazar ORDERS_MOCK por una llamada a la API/DB.
 * El helper getOrder() es el único punto de entrada para obtener un pedido,
 * lo que facilita el swap a fetch real sin tocar los componentes.
 *
 * Nota: el Record usa IDs en mayúsculas (ej. 'ORD-2099'). El page.tsx
 * normaliza el parámetro de URL con .toUpperCase() antes de llamar a getOrder().
 */

import type { OrderData } from './types';

export const ORDERS_MOCK: Record<string, OrderData> = {
  'ORD-2099': {
    id: 'ORD-2099',
    fecha: '22 de Febrero, 2026',
    fechaEstimada: '24 de Febrero, 2026',
    status: 'en_camino',
    tracking: 'SEUR-ES-8843019274',
    transportista: 'SEUR Express',
    items: [
      {
        id: 'prod-1',
        nombre: 'Titan Whey Isolate — Chocolate',
        variante: '2 kg (66 servicios)',
        precio: 79.99,
        cantidad: 1,
        image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=300&auto=format&fit=crop',
        slug: 'titan-whey-isolate',
      },
      {
        id: 'prod-2',
        nombre: 'Berserker Pre-Workout — Watermelon Fury',
        variante: '300g (30 servicios)',
        precio: 39.99,
        cantidad: 1,
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=300&auto=format&fit=crop',
        slug: 'berserker-pre-workout',
      },
    ],
    envio: {
      nombre: 'Arnold S.',
      direccion: 'Av. Hierro 123, Sector Norte',
      ciudad: 'Metrópolis',
      pais: 'España',
      cp: '28001',
    },
    pago: {
      metodo: 'Visa terminada en 4242',
      subtotal: 119.98,
      costoEnvio: 0,
      descuento: 0,
      total: 119.98,
      moneda: '$',
    },
    timeline: [
      { estado: 'Pedido confirmado', fecha: '22 Feb, 10:32h', completado: true,  desc: 'Recibimos tu pedido y comenzamos a prepararlo.' },
      { estado: 'En preparación',   fecha: '22 Feb, 14:15h', completado: true,  desc: 'Tu pedido está siendo empaquetado en nuestro almacén.' },
      { estado: 'En camino',        fecha: '23 Feb, 08:40h', completado: true,  desc: 'SEUR Express ha recogido tu pedido. En tránsito.' },
      { estado: 'Entregado',        fecha: 'Est. 24 Feb, 2026', completado: false, desc: 'Entrega estimada en tu dirección.' },
    ],
  },

  'ORD-1084': {
    id: 'ORD-1084',
    fecha: '15 de Enero, 2026',
    fechaEstimada: null,
    status: 'entregado',
    tracking: 'SEUR-ES-7721038845',
    transportista: 'SEUR Express',
    items: [
      {
        id: 'prod-3',
        nombre: 'Creatina Monohidratada — Unflavored',
        variante: '500g (100 servicios)',
        precio: 29.99,
        cantidad: 1,
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=300&auto=format&fit=crop',
        slug: 'creatina-monohidratada',
      },
    ],
    envio: {
      nombre: 'Arnold S.',
      direccion: 'Av. Hierro 123, Sector Norte',
      ciudad: 'Metrópolis',
      pais: 'España',
      cp: '28001',
    },
    pago: {
      metodo: 'PayPal',
      subtotal: 29.99,
      costoEnvio: 4.99,
      descuento: 0,
      total: 34.98,
      moneda: '$',
    },
    timeline: [
      { estado: 'Pedido confirmado', fecha: '15 Ene, 09:11h', completado: true, desc: 'Recibimos tu pedido.' },
      { estado: 'En preparación',   fecha: '15 Ene, 11:30h', completado: true, desc: 'Pedido empaquetado y listo.' },
      { estado: 'En camino',        fecha: '16 Ene, 07:55h', completado: true, desc: 'Recogido por SEUR Express.' },
      { estado: 'Entregado',        fecha: '17 Ene, 13:20h', completado: true, desc: 'Entregado en la dirección indicada. ¡Disfrútalo!' },
    ],
  },

  'ORD-0992': {
    id: 'ORD-0992',
    fecha: '2 de Noviembre, 2025',
    fechaEstimada: null,
    status: 'entregado',
    tracking: 'SEUR-ES-6610927364',
    transportista: 'SEUR Express',
    items: [
      {
        id: 'prod-4',
        nombre: 'Titan Whey Isolate — Vainilla',
        variante: '2 kg (66 servicios)',
        precio: 79.99,
        cantidad: 2,
        image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=300&auto=format&fit=crop',
        slug: 'titan-whey-isolate',
      },
      {
        id: 'prod-5',
        nombre: 'Mass Gainer Colossus — Chocolate',
        variante: '2 kg (16 servicios)',
        precio: 54.99,
        cantidad: 1,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&auto=format&fit=crop',
        slug: 'mass-gainer-colossus',
      },
    ],
    envio: {
      nombre: 'Arnold S.',
      direccion: 'Calle Progreso 45, Depto 2B',
      ciudad: 'Metrópolis',
      pais: 'España',
      cp: '28002',
    },
    pago: {
      metodo: 'Visa terminada en 4242',
      subtotal: 214.97,
      costoEnvio: 0,
      descuento: 4.47,
      total: 210.50,
      moneda: '$',
    },
    timeline: [
      { estado: 'Pedido confirmado', fecha: '2 Nov, 16:04h', completado: true, desc: 'Recibimos tu pedido.' },
      { estado: 'En preparación',   fecha: '3 Nov, 09:22h', completado: true, desc: 'Preparado y empaquetado.' },
      { estado: 'En camino',        fecha: '3 Nov, 15:10h', completado: true, desc: 'En tránsito con SEUR.' },
      { estado: 'Entregado',        fecha: '5 Nov, 10:45h', completado: true, desc: 'Entregado correctamente.' },
    ],
  },
};

/**
 * Helper de acceso a datos.
 * En producción: `return await fetchOrderById(id)` o similar.
 */
export function getOrder(id: string): OrderData | null {
  return ORDERS_MOCK[id] ?? null;
}
