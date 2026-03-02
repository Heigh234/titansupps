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
// TODO: Reemplazar con llamada a API/CMS cuando el backend esté listo.

export const ALL_PRODUCTS: CatalogProduct[] = [];
