/**
 * FeaturedProducts.tsx — Sección de productos destacados
 * ─────────────────────────────────────────────────────────
 * Muestra los 4 productos best-seller con el componente ProductCard.
 *
 * DECISIÓN DE GRID:
 * grid-cols-2 en mobile (no 1 col) — las cards de producto se leen
 * perfectamente en 2 columnas en mobile. Una sola columna desperdiciaría
 * espacio horizontal y requeriría más scroll vertical.
 * gap-3 en mobile vs gap-6 en desktop para dar más aire en pantallas grandes.
 *
 * "Ver todo" duplicado:
 * - Desktop: alineado a la derecha del header (visible md+)
 * - Mobile: botón centrado al pie de la sección (oculto en md+)
 * Evita que el usuario mobile tenga que hacer scroll de vuelta arriba
 * para encontrar el enlace al catálogo completo.
 *
 * cv-section-products: clase de content-visibility de globals.css.
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { FEATURED_PRODUCTS } from './_data';

export default function FeaturedProducts() {
  return (
    <section
      className="cv-section-products container mx-auto px-6 py-24"
      aria-labelledby="featured-heading"
    >
      {/* Header: título + enlace desktop al catálogo */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-xs font-bold text-titan-accent uppercase tracking-[0.25em] mb-3">
            Los más elegidos
          </p>
          <h2
            id="featured-heading"
            className="text-fluid-4xl text-titan-text"
          >
            Armamento <span className="text-titan-accent">Destacado</span>
          </h2>
          <p className="text-titan-text-muted mt-2 text-lg">
            Los más vendidos por atletas reales.
          </p>
        </div>

        {/* Solo visible en md+ */}
        <Link
          href="/catalog"
          className="hidden md:flex items-center gap-2 text-titan-text hover:text-titan-accent font-heading text-xl uppercase tracking-wide transition-colors group"
        >
          Ver todo
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* CTA "Ver todo" — solo visible en mobile */}
      <div className="mt-8 flex justify-center md:hidden">
        <Link
          href="/catalog"
          className="flex items-center gap-2 px-6 py-3 border border-titan-border text-titan-text hover:border-titan-accent hover:text-titan-accent font-heading text-lg uppercase tracking-wider transition-colors"
        >
          Ver Todo el Catálogo <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
