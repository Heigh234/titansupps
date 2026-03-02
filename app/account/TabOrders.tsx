'use client';

// ─────────────────────────────────────────────────────────────────────────────
// TAB: MIS PEDIDOS — app/account/TabOrders.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Lista de pedidos con badge de estado y link a detalle individual.

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { MOCK_ORDERS } from './_types';

/** Badge de estado con color semántico según estado del pedido */
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'entregado':
      return <span className="px-2 py-1 text-[10px] uppercase font-bold bg-green-500/10 text-green-500 border border-green-500/20">Entregado</span>;
    case 'en_camino':
      return <span className="px-2 py-1 text-[10px] uppercase font-bold bg-titan-accent/10 text-titan-accent border border-titan-accent/20 animate-pulse">En Camino</span>;
    case 'pendiente':
      return <span className="px-2 py-1 text-[10px] uppercase font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Pendiente</span>;
    default:
      return null;
  }
}

export default function TabOrders() {
  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <h2 className="font-heading text-2xl uppercase tracking-wider text-titan-text border-b border-titan-border pb-4">
        Historial de Operaciones
      </h2>

      <div className="space-y-4">
        {MOCK_ORDERS.map((order) => (
          <div
            key={order.id}
            className="bg-titan-surface border border-titan-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-titan-accent/50 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-titan-text">{order.id}</span>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-xs text-titan-text-muted">
                {order.date} • {order.items} artículo(s)
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-titan-border pt-4 sm:pt-0">
              <span className="font-heading text-xl text-titan-accent">
                ${order.total.toFixed(2)}
              </span>
              <Link
                href={`/order/${order.id}`}
                className="p-2 border border-titan-border text-titan-text group-hover:bg-titan-accent group-hover:text-white group-hover:border-titan-accent transition-colors"
                aria-label={`Ver detalle del pedido ${order.id}`}
              >
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
