'use client';

/**
 * components/catalog/CatalogGrid.tsx
 *
 * Lee los searchParams de la URL como fuente de verdad única.
 * Filtra y ordena el array de productos en el cliente.
 * Usa ProductCard para renderizar cada producto (incluye botón de favoritos).
 *
 * CORRECCIÓN: Anteriormente renderizaba cards inline sin usar ProductCard,
 * por lo que el botón de favoritos nunca aparecía en el catálogo.
 *
 * Parámetros de URL que consume:
 *   ?category=proteina,creatina  → filtro de categorías (multi, comma-separated)
 *   ?brand=titan+labs,bsn        → filtro de marcas (multi)
 *   ?price=120                   → precio máximo
 *   ?sort=price_asc|price_desc|new|popular → ordenamiento
 *   ?q=whey                      → búsqueda por texto libre
 */

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { ALL_PRODUCTS } from '@/app/catalog/_data';

/* ─── HELPER ────────────────────────────────────────────────────────── */

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').map((v) => v.trim().toLowerCase()).filter(Boolean);
}

/* ─── COMPONENT ─────────────────────────────────────────────────────── */

export default function CatalogGrid() {
  const searchParams = useSearchParams();

  const activeCategories = parseList(searchParams.get('category'));
  const activeBrands     = parseList(searchParams.get('brand'));
  const maxPrice         = Number(searchParams.get('price') || 9999);
  const sortOrder        = searchParams.get('sort') || 'popular';
  const query            = (searchParams.get('q') || '').toLowerCase().trim();

  /* Filtrado */
  let filtered = ALL_PRODUCTS.filter((p) => {
    if (activeCategories.length > 0 && !activeCategories.includes(p.category)) return false;
    if (activeBrands.length > 0     && !activeBrands.includes(p.brand))        return false;
    if (p.price > maxPrice)                                                      return false;
    if (query && !p.title.toLowerCase().includes(query) && !p.category.includes(query)) return false;
    return true;
  });

  /* Ordenamiento */
  filtered = [...filtered].sort((a, b) => {
    if (sortOrder === 'price_asc')  return a.price - b.price;
    if (sortOrder === 'price_desc') return b.price - a.price;
    if (sortOrder === 'new')        return b.createdAt - a.createdAt;
    return a.id.localeCompare(b.id);
  });

  /* Estado vacío */
  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
        <div className="w-16 h-16 border border-titan-border flex items-center justify-center text-titan-text-muted">
          <SlidersHorizontal size={28} />
        </div>
        <div>
          <h3 className="font-heading text-2xl uppercase text-titan-text mb-2">Sin resultados</h3>
          <p className="text-titan-text-muted text-sm max-w-xs">
            Ningún producto coincide con los filtros actuales.
          </p>
        </div>
        <Link href="/catalog" className="px-6 py-3 border border-titan-border text-titan-text hover:border-titan-accent hover:text-titan-accent transition-colors font-heading uppercase tracking-wider text-sm">
          Limpiar filtros
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Barra de estado + ordenamiento */}
      <div className="flex justify-between items-center mb-6 text-sm text-titan-text-muted">
        <p>
          Mostrando <span className="text-white font-bold">{filtered.length}</span> de{' '}
          <span className="text-white font-bold">{ALL_PRODUCTS.length}</span> armamentos
          {query && <span className="ml-2 text-titan-accent font-bold">para &ldquo;{query}&rdquo;</span>}
        </p>
        <SortSelect current={sortOrder} />
      </div>

      {/* 
        MOBILE 2-COL: grid-cols-2 en mobile (≈ Amazon).
        gap-3 en mobile para maximizar espacio de card, gap-6 en sm+.
        lg pasa a 3 columnas como antes.
      */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            brand={product.brand}
            image={product.image}
            badge={product.badge}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── SORT SELECT ────────────────────────────────────────────────────── */

function SortSelect({ current }: { current: string }) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', e.target.value);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <select
      defaultValue={current}
      onChange={handleChange}
      className="bg-titan-bg border border-titan-border text-titan-text py-2 px-4 focus:outline-none focus:border-titan-accent cursor-pointer uppercase tracking-widest text-xs font-bold"
      aria-label="Ordenar productos"
    >
      <option value="popular">Más Populares</option>
      <option value="price_asc">Precio: Menor a Mayor</option>
      <option value="price_desc">Precio: Mayor a Menor</option>
      <option value="new">Novedades</option>
    </select>
  );
}
