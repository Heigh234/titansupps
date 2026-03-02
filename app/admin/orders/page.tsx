'use client';

/*
 * app/admin/orders/page.tsx — Orquestador de Gestión de Pedidos
 * ─────────────────────────────────────────────────────────────────────────────
 * Funcionalidades 100% operativas:
 *
 *  ① Búsqueda en tiempo real: por ID de pedido, nombre de cliente o email
 *  ② Filtrado por estado:     todos / pendiente / procesando / enviado / entregado / cancelado
 *  ③ Ordenación por columnas: fecha (asc/desc), total (asc/desc), ID (asc/desc)
 *  ④ Cambio de estado inline: click en badge → dropdown → nuevo estado en tiempo real
 *  ⑤ Modal de detalle:        timeline, info, productos, nota interna
 *  ⑥ Exportación CSV:         genera y descarga el listado filtrado activo como .csv
 *  ⑦ Paginación funcional:    navegación entre páginas con ellipsis
 *  ⑧ Estadísticas en tiempo real: los contadores se recalculan al cambiar estados
 *
 * ARQUITECTURA:
 * Este archivo es el único dueño del estado del módulo.
 * Los componentes hijos reciben todo via props + callbacks — sin duplicación
 * de estado ni contextos innecesarios para una página de esta complejidad.
 *
 * Árbol de componentes:
 *   AdminOrders (page.tsx)
 *   ├── KPI stats por estado (inline — 5 botones filtro)
 *   ├── Barra de búsqueda (inline — input + select mobile)
 *   ├── OrdersTable  → tabla + paginación + estado vacío
 *   │   └── StatusChanger → StatusBadge
 *   └── OrderDetailModal (condicional)
 *       └── StatusChanger → StatusBadge
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Download, X } from 'lucide-react';

import { MOCK_ORDERS, STATUS_CONFIG, ALL_STATUSES, PAGE_SIZE } from './data';
import { downloadCSV } from './utils';
import OrdersTable from './OrdersTable';
import OrderDetailModal from './OrderDetailModal';
import type { Order, OrderStatus, SortField, SortDir } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminOrders() {
  // ── Estado del módulo ──────────────────────────────────────────────────────
  const [orders, setOrders]           = useState<Order[]>(MOCK_ORDERS);
  const [search, setSearch]           = useState('');
  const [statusFilter, setFilter]     = useState<OrderStatus | 'all'>('all');
  const [sortField, setSortField]     = useState<SortField>('date');
  const [sortDir, setSortDir]         = useState<SortDir>('desc');
  const [page, setPage]               = useState(1);
  const [selectedOrder, setSelected]  = useState<Order | null>(null);

  // ── ④ Cambiar estado inline (tabla Y modal sincronizados) ─────────────────
  const handleStatusChange = useCallback((id: string, next: OrderStatus) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: next } : o));
    setSelected((prev) => prev?.id === id ? { ...prev, status: next } : prev);
  }, []);

  // ── Pipeline: filtrar → ordenar ───────────────────────────────────────────
  const processed = useMemo(() => {
    let result = orders;

    // Búsqueda ① — por ID, nombre de cliente o email
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((o) =>
        o.id.toLowerCase().includes(q)             ||
        o.customer.name.toLowerCase().includes(q)  ||
        o.customer.email.toLowerCase().includes(q)
      );
    }

    // Filtro de estado ②
    if (statusFilter !== 'all') {
      result = result.filter((o) => o.status === statusFilter);
    }

    // Ordenación ③
    return [...result].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'date')  cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortField === 'total') cmp = a.total - b.total;
      if (sortField === 'id')    cmp = a.id.localeCompare(b.id);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [orders, search, statusFilter, sortField, sortDir]);

  // ── Estadísticas en tiempo real ⑧ ────────────────────────────────────────
  const stats = useMemo(() => {
    const counts = { pendiente: 0, procesando: 0, enviado: 0, entregado: 0, cancelado: 0 } as Record<OrderStatus, number>;
    for (const o of orders) counts[o.status]++;
    const revenue = orders
      .filter((o) => o.status !== 'cancelado')
      .reduce((s, o) => s + o.total, 0);
    return { counts, revenue };
  }, [orders]);

  // ── Paginación ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
  const paginated  = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset a página 1 cuando cambian los filtros o el orden
  useEffect(() => { setPage(1); }, [search, statusFilter, sortField, sortDir]);

  // ── Toggle de ordenación ──────────────────────────────────────────────────
  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('desc'); }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl uppercase text-titan-text tracking-wider">
            Gestión de Pedidos
          </h2>
          <p className="text-titan-text-muted text-sm mt-1">
            {orders.length} pedidos en total · Ingresos netos:{' '}
            <span className="text-titan-accent font-bold">€{stats.revenue.toFixed(2)}</span>
          </p>
        </div>

        {/* ⑥ Exportar CSV — solo los pedidos del filtro activo */}
        <button
          onClick={() => downloadCSV(processed)}
          className="flex items-center gap-2 px-4 py-2.5 bg-titan-surface border border-titan-border text-titan-text text-sm font-bold uppercase tracking-wider hover:border-titan-accent hover:text-titan-accent transition-colors w-full sm:w-auto justify-center"
          title={`Exportar ${processed.length} pedidos a CSV`}
        >
          <Download size={16} />
          Exportar CSV ({processed.length})
        </button>
      </div>

      {/* ── KPI STATS POR ESTADO ② ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {ALL_STATUSES.map((s) => {
          const cfg      = STATUS_CONFIG[s];
          const Icon     = cfg.icon;
          const count    = stats.counts[s];
          const isActive = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(isActive ? 'all' : s)}
              className={`p-3 border text-left transition-all duration-200 ${
                isActive
                  ? `${cfg.bg} ${cfg.border} ${cfg.color}`
                  : 'bg-titan-surface border-titan-border text-titan-text-muted hover:border-titan-accent/40'
              }`}
              aria-pressed={isActive}
              title={cfg.label}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon
                  size={14}
                  className={isActive ? cfg.color : ''}
                  aria-hidden="true"
                />
                <span className={`font-heading text-2xl ${isActive ? cfg.color : 'text-titan-text'}`}>
                  {count}
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest truncate">
                {cfg.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* ── BARRA DE BÚSQUEDA ① ── */}
      <div className="bg-titan-surface border border-titan-border p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-titan-text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Buscar por nº pedido, cliente o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-titan-bg border border-titan-border py-2.5 pl-10 pr-4 text-sm text-titan-text focus:outline-none focus:border-titan-accent transition-colors placeholder:text-titan-text-muted"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-titan-text-muted hover:text-white transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Select de estado solo visible en mobile (las KPI cards lo hacen en desktop) */}
        <select
          value={statusFilter}
          onChange={(e) => setFilter(e.target.value as OrderStatus | 'all')}
          className="sm:hidden bg-titan-bg border border-titan-border py-2.5 px-3 text-sm text-titan-text focus:outline-none focus:border-titan-accent transition-colors"
          aria-label="Filtrar por estado"
        >
          <option value="all">Todos los estados</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
          ))}
        </select>
      </div>

      {/* ── TABLA DE PEDIDOS ── */}
      <OrdersTable
        paginated={paginated}
        processed={processed}
        page={page}
        totalPages={totalPages}
        pageSize={PAGE_SIZE}
        sortField={sortField}
        sortDir={sortDir}
        onSort={handleSort}
        onPageChange={setPage}
        onViewOrder={setSelected}
        onClearFilters={() => { setSearch(''); setFilter('all'); }}
        onStatusChange={handleStatusChange}
      />

      {/* ── MODAL DE DETALLE ⑤ ── */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

    </div>
  );
}
