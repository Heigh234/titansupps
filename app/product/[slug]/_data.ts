/**
 * app/product/[slug]/_data.ts — Catálogo completo de productos con detalle
 * ──────────────────────────────────────────────────────────────────────────
 * Fuente de verdad para las páginas de detalle de producto.
 *
 * El slug de cada producto es su ID numérico (el mismo que usa ProductCard
 * para construir el href: `/product/${id}`). Así la URL /product/1 carga
 * el producto con id '1', /product/2 el de id '2', etc.
 *
 * PROBLEMA QUE RESUELVE:
 * getProductData() ignoraba el slug y siempre devolvía "Titan Whey Isolate
 * Elite" independientemente del producto clickeado. Ahora busca en este
 * mapa por ID y retorna el producto correcto.
 *
 * PRÓXIMO PASO (producción):
 * Reemplazar PRODUCT_DETAIL_MAP por un fetch a DB/CMS usando el slug/id.
 * Los tipos ya están preparados para esa migración.
 */

// ─── Tipo ─────────────────────────────────────────────────────────────────────

export interface ProductDetail {
  id:          string;
  name:        string;
  slug:        string;
  price:       number;
  category:    string;
  brand:       string;
  badge?:      string;
  description: string;
  rating:      number;
  reviews:     number;
  stock:       number;
  images:      string[];
  variants:    string[];
  ingredients: string;
}

// ─── Datos ────────────────────────────────────────────────────────────────────
// TODO: Reemplazar con fetch a DB/CMS por slug cuando el backend esté listo.

export const PRODUCT_DETAIL_MAP: Record<string, ProductDetail> = {};

/**
 * Busca un producto por su ID/slug.
 * Retorna undefined si el ID no existe en el mapa → la página llama notFound().
 */
export function getProductBySlug(slug: string): ProductDetail | undefined {
  return PRODUCT_DETAIL_MAP[slug];
}

/** IDs de todos los productos — para generateStaticParams (SSG en build time) */
export const ALL_PRODUCT_SLUGS = Object.keys(PRODUCT_DETAIL_MAP);
