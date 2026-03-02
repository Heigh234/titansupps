/**
 * app/catalog/_data.ts — Datos estáticos del Catálogo
 * ──────────────────────────────────────────────────────
 * Sigue el mismo patrón del resto del proyecto:
 * about/_data.ts / blog/_data.ts / affiliates/_data.ts
 *
 * Extrae ALL_PRODUCTS de CatalogGrid.tsx donde estaba
 * embebido junto a la lógica de filtrado y render.
 *
 * PRÓXIMO PASO (producción):
 * Reemplazar este array por una llamada a API/CMS.
 * El tipo CatalogProduct ya está preparado para esa migración.
 */

// ─── Tipo ─────────────────────────────────────────────────────────────────────

export interface CatalogProduct {
  id:        string;
  title:     string;
  price:     number;
  category:  string;
  brand:     string;
  image:     string;
  badge?:    string;
  createdAt: number;
}

// ─── Datos ────────────────────────────────────────────────────────────────────

export const ALL_PRODUCTS: CatalogProduct[] = [
  {
    id:        '1',
    title:     'Titan Whey Isolate',
    price:     64.99,
    category:  'proteina',
    brand:     'titan labs',
    image:     'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=500',
    badge:     'Best Seller',
    createdAt: 1,
  },
  {
    id:        '2',
    title:     'Berserker Pre-Workout',
    price:     39.99,
    category:  'pre-workout',
    brand:     'titan labs',
    image:     'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=500',
    createdAt: 3,
  },
  {
    id:        '3',
    title:     'Creatina Monohidratada',
    price:     29.99,
    category:  'creatina',
    brand:     'optimum',
    image:     'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=500',
    createdAt: 2,
  },
  {
    id:        '4',
    title:     'Mass Gainer Colossus',
    price:     54.99,
    category:  'proteina',
    brand:     'muscletech',
    image:     'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500',
    createdAt: 4,
  },
  {
    id:        '5',
    title:     'Aminoácidos BCAA Elite',
    price:     34.99,
    category:  'recuperacion',
    brand:     'bsn',
    image:     'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=500',
    badge:     'Nuevo',
    createdAt: 6,
  },
  {
    id:        '6',
    title:     'Quemador de Grasa Inferno',
    price:     44.99,
    category:  'perdida-peso',
    brand:     'titan labs',
    image:     'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=500',
    createdAt: 5,
  },
  {
    id:        '7',
    title:     'Omega-3 Ultra Pure',
    price:     24.99,
    category:  'vitaminas',
    brand:     'optimum',
    image:     'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=500',
    createdAt: 7,
  },
  {
    id:        '8',
    title:     'Glutamina Recovery',
    price:     32.99,
    category:  'recuperacion',
    brand:     'bsn',
    image:     'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500',
    badge:     'Nuevo',
    createdAt: 8,
  },
];
