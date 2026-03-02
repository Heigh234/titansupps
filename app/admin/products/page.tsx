'use client';

/**
 * app/admin/products/page.tsx — Orquestador del Inventario
 * ──────────────────────────────────────────────────────────
 * ARQUITECTURA POST-MODULARIZACIÓN:
 * Este archivo es el coordinador del módulo. Sus responsabilidades:
 *   1. Estado de búsqueda (searchTerm) y paginación (page)
 *   2. Derivar `filtered` y `paginated` desde MOCK_PRODUCTS
 *   3. Handlers de acciones: onEdit, onDelete (TODO: modales/API)
 *   4. Componer el layout: header de sección + ProductsTable
 *
 * MÓDULOS EXTRAÍDOS (equivalencia con orders/ y users/):
 *   → types.ts               ProductStatus + Product interface
 *   → data.ts                MOCK_PRODUCTS + STATUS_CONFIG + PAGE_SIZE + LOW_STOCK_LIMIT
 *   → ProductStatusBadge.tsx Badge presentacional (≈ StatusBadge, SegmentBadge)
 *   → ProductsTable.tsx      Tabla completa con búsqueda y paginación (≈ OrdersTable, ClientsTable)
 *
 * FILTRADO REAL:
 * El original tenía un searchTerm conectado al input pero sin lógica de filtrado
 * (los productos siempre se mostraban todos). Aquí el filtro funciona de verdad:
 * filtra por nombre, SKU o categoría de forma case-insensitive, y resetea
 * la página a 1 automáticamente al buscar para evitar páginas vacías.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';
import { MOCK_PRODUCTS, PAGE_SIZE } from './data';
import ProductsTable from './ProductsTable';
import type { Product } from './types';

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage]             = useState(1);
  const addToast                    = useToastStore((s) => s.addToast);

  // ── Filtrado por nombre, SKU o categoría ─────────────────────────────────
  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q)     ||
        p.sku.toLowerCase().includes(q)      ||
        p.category.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  // ── Paginación ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Resetear a página 1 al cambiar la búsqueda
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  // ── Handlers de acciones ─────────────────────────────────────────────────

  const handleEdit = (product: Product) => {
    // TODO: Abrir modal de edición o navegar a /admin/products/[id]/edit
    addToast({
      type:    'info',
      title:   'Editar producto',
      message: `Editando "${product.name}"`,
    });
  };

  const handleDelete = (product: Product) => {
    // TODO: Confirmar con modal de destructive action antes de eliminar
    addToast({
      type:    'info',
      title:   'Eliminar producto',
      message: `Acción de eliminación para "${product.name}" pendiente de confirmar.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* ── HEADER DE SECCIÓN ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="font-heading text-3xl uppercase text-titan-text tracking-wider">
          Inventario
        </h2>
        <Link
          href="/admin/products/new"
          className="bg-titan-accent text-white px-4 py-2 font-bold text-sm uppercase tracking-wider hover:bg-titan-accent-hover transition-colors flex items-center gap-2 w-full sm:w-auto justify-center shadow-[0_0_15px_rgba(255,94,0,0.2)]"
        >
          <Plus size={18} /> Nuevo Producto
        </Link>
      </div>

      {/* ── TABLA CON BÚSQUEDA Y PAGINACIÓN ───────────────────────────────── */}
      <ProductsTable
        filtered={filtered}
        paginated={paginated}
        searchTerm={searchTerm}
        page={page}
        totalPages={totalPages}
        onSearch={handleSearch}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}
