'use client';

/*
 * app/admin/users/page.tsx — Orquestador de Gestión de Clientes
 * ─────────────────────────────────────────────────────────────────────────────
 * Funcionalidades 100% operativas:
 *
 *  ① Búsqueda en tiempo real:  por nombre, email, teléfono o ciudad
 *  ② Filtrado por segmento:    tarjetas clicables VIP / Activo / Nuevo / Suspendido
 *  ③ Ordenación por columnas:  nombre, gasto total, pedidos y fecha de registro
 *  ④ Cambio de segmento inline: badge → dropdown → nuevo segmento en tiempo real
 *  ⑤ Modal de perfil completo: datos, historial de pedidos, métricas y timeline
 *  ⑥ Exportación CSV real:     descarga el listado filtrado activo como .csv
 *  ⑦ Envío de email directo:   botón que abre el cliente de correo con mailto:
 *  ⑧ Paginación funcional:     navegación con ellipsis para muchas páginas
 *  ⑨ Estadísticas en tiempo real: los KPIs se recalculan al cambiar segmentos
 *
 * ARQUITECTURA:
 * Este archivo es el único dueño del estado del módulo.
 * Los componentes hijos reciben todo via props + callbacks — sin prop drilling
 * oculto ni contextos innecesarios para una página de esta complejidad.
 *
 * Árbol de componentes:
 *   AdminUsers (page.tsx)
 *   ├── KPI cards de segmento (inline — 4 botones simples)
 *   ├── Barra de búsqueda (inline — un input + select mobile)
 *   ├── ClientsTable  → tabla + paginación + estado vacío
 *   │   ├── Avatar
 *   │   └── SegmentChanger → SegmentBadge
 *   └── ClientProfileModal (condicional)
 *       ├── Avatar
 *       └── SegmentChanger → SegmentBadge
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Download, X } from 'lucide-react';

import { MOCK_CLIENTS, SEGMENT_CONFIG, ALL_SEGMENTS, PAGE_SIZE } from './data';
import { downloadCSV } from './utils';
import ClientsTable from './ClientsTable';
import ClientProfileModal from './ClientProfileModal';
import type { Client, Segment, SortField, SortDir } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminUsers() {
  // ── Estado del módulo ──────────────────────────────────────────────────────
  const [clients, setClients]         = useState<Client[]>(MOCK_CLIENTS);
  const [search, setSearch]           = useState('');
  const [segmentFilter, setFilter]    = useState<Segment | 'all'>('all');
  const [sortField, setSortField]     = useState<SortField>('registered');
  const [sortDir, setSortDir]         = useState<SortDir>('desc');
  const [page, setPage]               = useState(1);
  const [selectedClient, setSelected] = useState<Client | null>(null);

  // ── ④ Cambiar segmento (operativo en tabla Y modal simultáneamente) ────────
  const handleSegmentChange = useCallback((id: string, next: Segment) => {
    setClients((prev) => prev.map((c) => c.id === id ? { ...c, segment: next } : c));
    setSelected((prev) => prev?.id === id ? { ...prev, segment: next } : prev);
  }, []);

  // ── Pipeline: filtrar → ordenar ────────────────────────────────────────────
  const processed = useMemo(() => {
    let result = clients;

    // Búsqueda ① — por nombre, email, teléfono o ciudad
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((c) =>
        c.name.toLowerCase().includes(q)  ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)               ||
        c.city.toLowerCase().includes(q)
      );
    }

    // Filtro de segmento ②
    if (segmentFilter !== 'all') {
      result = result.filter((c) => c.segment === segmentFilter);
    }

    // Ordenación ③
    return [...result].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name')       cmp = a.name.localeCompare(b.name, 'es');
      if (sortField === 'spent')      cmp = a.totalSpent - b.totalSpent;
      if (sortField === 'orders')     cmp = a.totalOrders - b.totalOrders;
      if (sortField === 'registered') cmp = new Date(a.registered).getTime() - new Date(b.registered).getTime();
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [clients, search, segmentFilter, sortField, sortDir]);

  // ── Estadísticas en tiempo real ⑨ ─────────────────────────────────────────
  const stats = useMemo(() => {
    const counts = { vip: 0, activo: 0, nuevo: 0, suspendido: 0 } as Record<Segment, number>;
    let totalRevenue = 0;
    for (const c of clients) {
      counts[c.segment]++;
      totalRevenue += c.totalSpent;
    }
    return { counts, totalRevenue, avgLTV: clients.length > 0 ? totalRevenue / clients.length : 0 };
  }, [clients]);

  // ── Paginación ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
  const paginated  = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset a página 1 cuando cambian los filtros o el orden
  useEffect(() => { setPage(1); }, [search, segmentFilter, sortField, sortDir]);

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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl uppercase text-titan-text tracking-wider">
            Gestión de Clientes
          </h2>
          <p className="text-titan-text-muted text-sm mt-1">
            {clients.length} clientes registrados · LTV medio:{' '}
            <span className="text-titan-accent font-bold">€{stats.avgLTV.toFixed(0)}</span>
            {' '}· Revenue total:{' '}
            <span className="text-titan-accent font-bold">€{stats.totalRevenue.toFixed(0)}</span>
          </p>
        </div>

        {/* ⑥ Exportar CSV — descarga solo los clientes del filtro activo */}
        <button
          onClick={() => downloadCSV(processed)}
          className="flex items-center gap-2 px-4 py-2.5 bg-titan-surface border border-titan-border text-titan-text text-sm font-bold uppercase tracking-wider hover:border-titan-accent hover:text-titan-accent transition-colors w-full sm:w-auto justify-center"
          title={`Exportar ${processed.length} clientes a CSV`}
        >
          <Download size={16} />
          Exportar CSV ({processed.length})
        </button>
      </div>

      {/* ── KPI CARDS DE SEGMENTO ② ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ALL_SEGMENTS.map((s) => {
          const cfg      = SEGMENT_CONFIG[s];
          const Icon     = cfg.icon;
          const count    = stats.counts[s];
          const isActive = segmentFilter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(isActive ? 'all' : s)}
              className={`p-4 border text-left transition-all duration-200 group ${
                isActive
                  ? `${cfg.bg} ${cfg.border} ${cfg.color}`
                  : 'bg-titan-surface border-titan-border text-titan-text-muted hover:border-titan-accent/40'
              }`}
              aria-pressed={isActive}
              title={cfg.desc}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  size={16}
                  className={isActive ? cfg.color : 'text-titan-text-muted'}
                  aria-hidden="true"
                />
                <span className={`font-heading text-3xl leading-none ${isActive ? cfg.color : 'text-titan-text'}`}>
                  {count}
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest">{cfg.label}</p>
              <p className="text-[9px] text-titan-text-muted mt-0.5 leading-tight">{cfg.desc}</p>
            </button>
          );
        })}
      </div>

      {/* ── BARRA DE BÚSQUEDA ① ── */}
      <div className="bg-titan-surface border border-titan-border p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-titan-text-muted" aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar por nombre, email, teléfono o ciudad..."
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

        {/* Select de segmento solo visible en mobile (las KPI cards lo hacen en desktop) */}
        <select
          value={segmentFilter}
          onChange={(e) => setFilter(e.target.value as Segment | 'all')}
          className="sm:hidden bg-titan-bg border border-titan-border py-2.5 px-3 text-sm text-titan-text focus:outline-none focus:border-titan-accent transition-colors"
          aria-label="Filtrar por segmento"
        >
          <option value="all">Todos los segmentos</option>
          {ALL_SEGMENTS.map((s) => (
            <option key={s} value={s}>{SEGMENT_CONFIG[s].label}</option>
          ))}
        </select>
      </div>

      {/* ── TABLA DE CLIENTES ── */}
      <ClientsTable
        paginated={paginated}
        processed={processed}
        page={page}
        totalPages={totalPages}
        sortField={sortField}
        sortDir={sortDir}
        onSort={handleSort}
        onPageChange={setPage}
        onViewClient={setSelected}
        onClearFilters={() => { setSearch(''); setFilter('all'); }}
        onSegmentChange={handleSegmentChange}
      />

      {/* ── MODAL DE PERFIL ⑤ ── */}
      {selectedClient && (
        <ClientProfileModal
          client={selectedClient}
          onClose={() => setSelected(null)}
          onSegmentChange={handleSegmentChange}
        />
      )}

    </div>
  );
}
