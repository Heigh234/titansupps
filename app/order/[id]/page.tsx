'use client';

/**
 * app/order/[id]/page.tsx — Orquestador de la página de detalle de pedido
 * ──────────────────────────────────────────────────────────────────────────
 * CONCEPTO: "El Parte de Misión"
 *
 * Responsabilidades de este archivo (y solo estas):
 *  1. Leer el parámetro de ruta y resolver el pedido desde data.ts.
 *  2. Manejar el estado de "pedido no encontrado" con su UI de error.
 *  3. Definir el layout de la página (header + grid de 2 columnas).
 *  4. Ensamblar los tres sub-componentes: OrderTimeline, OrderItems, OrderSidebar.
 *
 * La lógica de presentación de cada sección vive en su propio archivo.
 * Los tipos e interfaces están en types.ts.
 * Los datos mock están en data.ts (listo para swap por fetch real).
 */

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Truck, AlertCircle } from 'lucide-react';

import { getOrder }      from './data';
import { STATUS_CONFIG } from './types';
import OrderTimeline     from './OrderTimeline';
import OrderItems        from './OrderItems';
import OrderSidebar      from './OrderSidebar';

export default function OrderDetailPage() {
  const params  = useParams();
  const router  = useRouter();

  // Normalizar a mayúsculas para que /order/ord-2099 funcione igual que /order/ORD-2099
  const orderId = (params?.id as string)?.toUpperCase();
  const order   = getOrder(orderId);

  /* ── PEDIDO NO ENCONTRADO ──────────────────────────────────────── */
  if (!order) {
    return (
      <div className="min-h-screen bg-titan-bg flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="text-titan-accent mx-auto mb-6" />
          <h1 className="font-heading text-4xl text-titan-text uppercase mb-3">
            Pedido no encontrado
          </h1>
          <p className="text-titan-text-muted mb-8">
            No encontramos el pedido{' '}
            <strong className="text-titan-text">{params?.id}</strong>{' '}
            asociado a tu cuenta. Verifica el número o consulta tu historial.
          </p>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 px-8 py-4 bg-titan-accent text-white font-heading text-xl uppercase tracking-wider hover:bg-titan-accent-hover transition-colors"
          >
            <ArrowLeft size={16} />
            Volver a Mis Pedidos
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[order.status];

  /* ── PÁGINA PRINCIPAL ──────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-titan-bg pt-28 pb-24">
      <div className="container mx-auto px-6">

        {/* ── HEADER: breadcrumb + título + badge de estado ── */}
        <div className="mb-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-titan-text-muted hover:text-titan-accent transition-colors text-xs font-bold uppercase tracking-widest mb-6 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Volver a mis pedidos
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-titan-border pb-8">
            <div>
              <p className="text-xs font-bold text-titan-accent uppercase tracking-[0.25em] mb-2">
                Detalle de operación
              </p>
              <h1 className="font-heading text-fluid-4xl text-titan-text uppercase leading-none">
                {order.id}
              </h1>
              <p className="text-titan-text-muted text-sm mt-2">{order.fecha}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Badge de estado */}
              <span className={`px-3 py-1.5 border text-xs font-bold uppercase tracking-widest ${statusConfig.bg} ${statusConfig.color}`}>
                {statusConfig.label}
              </span>

              {/* CTA de rastreo — solo cuando está en camino */}
              {order.status === 'en_camino' && (
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 border border-titan-border text-titan-text-muted hover:border-titan-accent hover:text-titan-accent transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  <Truck size={12} />
                  Rastrear envío
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── GRID PRINCIPAL: columna de contenido (2/3) + sidebar (1/3) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            <OrderTimeline order={order} />
            <OrderItems    order={order} />
          </div>

          {/* Columna lateral */}
          <OrderSidebar order={order} />
        </div>

      </div>
    </div>
  );
}
