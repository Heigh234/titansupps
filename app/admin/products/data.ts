/**
 * app/admin/products/data.ts
 *
 * Datos y configuración del módulo de Gestión de Inventario.
 *
 * Exporta:
 *   MOCK_PRODUCTS   → 4 productos de ejemplo con variedad de estados y stock.
 *                     En producción se reemplaza por fetch/useQuery al endpoint de inventario.
 *   PAGE_SIZE       → Productos por página en la tabla.
 *   STATUS_CONFIG   → Colores, etiquetas de cada estado de producto.
 *                     Fuente única de verdad — usada por ProductStatusBadge y ProductsTable.
 *   LOW_STOCK_LIMIT → Umbral por debajo del cual el stock se considera crítico (rojo).
 *
 * Estructura análoga a app/admin/orders/data.ts y app/admin/users/data.ts.
 */

import type { Product, ProductStatus } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────────────────────

export const PAGE_SIZE = 8;

/**
 * Umbral de stock bajo. Si stock < LOW_STOCK_LIMIT el número se pinta en rojo.
 * Centralizado aquí para que ProductsTable y cualquier lógica futura lo usen
 * sin hardcodear el 20 en varios sitios.
 */
export const LOW_STOCK_LIMIT = 20;

// ─────────────────────────────────────────────────────────────────────────────
// STATUS CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const STATUS_CONFIG: Record<
  ProductStatus,
  { label: string; bg: string; color: string; border: string }
> = {
  active:       { label: 'Activo',      bg: 'bg-green-500/10',    color: 'text-green-500',        border: 'border-green-500/20'  },
  low_stock:    { label: 'Stock Bajo',  bg: 'bg-yellow-500/10',   color: 'text-yellow-500',       border: 'border-yellow-500/20' },
  out_of_stock: { label: 'Agotado',     bg: 'bg-red-500/10',      color: 'text-red-500',          border: 'border-red-500/20'    },
  draft:        { label: 'Borrador',    bg: 'bg-titan-border/40', color: 'text-titan-text-muted', border: 'border-titan-border'  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_PRODUCTS: Product[] = [
  {
    id:       '1',
    name:     'Titan Whey Isolate Elite',
    sku:      'PR-WHEY-001',
    price:    64.99,
    stock:    145,
    status:   'active',
    category: 'Proteína',
    image:    'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=100&q=80',
  },
  {
    id:       '2',
    name:     'Berserker Pre-Workout',
    sku:      'PR-PRE-002',
    price:    39.99,
    stock:    12,
    status:   'low_stock',
    category: 'Energía',
    image:    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100&q=80',
  },
  {
    id:       '3',
    name:     'Creatina Monohidratada Pura',
    sku:      'CR-MONO-001',
    price:    29.99,
    stock:    0,
    status:   'out_of_stock',
    category: 'Recuperación',
    image:    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=100&q=80',
  },
  {
    id:       '4',
    name:     'Aminoácidos BCAA 2:1:1',
    sku:      'AM-BCAA-001',
    price:    34.99,
    stock:    89,
    status:   'draft',
    category: 'Recuperación',
    image:    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&q=80',
  },
];
