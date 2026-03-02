'use client';

/*
  ActiveFiltersPills.tsx
  ──────────────────────
  Muestra los filtros activos como pills removibles debajo del botón de filtros
  en mobile. El usuario sabe en todo momento qué tiene filtrado sin abrir el drawer.

  Fuente de verdad: URL searchParams (igual que CatalogFilters y CatalogGrid).
  Cada pill tiene una X que limpia ese filtro específico de la URL.
  Si no hay filtros activos, no renderiza nada (null) — no ocupa espacio.
*/

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { X } from 'lucide-react';

// Labels legibles para cada valor de categoría
const CATEGORY_LABELS: Record<string, string> = {
  proteina:     'Proteínas',
  'pre-workout': 'Pre-Workout',
  creatina:     'Creatina',
  vitaminas:    'Vitaminas',
  recuperacion: 'Recuperación',
  'perdida-peso': 'Pérdida de Peso',
};

const BRAND_LABELS: Record<string, string> = {
  'titan labs': 'Titan Labs',
  optimum:      'Optimum',
  muscletech:   'MuscleTech',
  bsn:          'BSN',
};

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').map((v) => v.trim().toLowerCase()).filter(Boolean);
}

export default function ActiveFiltersPills() {
  const searchParams     = useSearchParams();
  const router           = useRouter();
  const pathname         = usePathname();

  const activeCategories = parseList(searchParams.get('category'));
  const activeBrands     = parseList(searchParams.get('brand'));
  const hasPrice         = searchParams.get('price') !== null;
  const query            = searchParams.get('q');

  const totalActive =
    activeCategories.length + activeBrands.length + (hasPrice ? 1 : 0) + (query ? 1 : 0);

  // Sin filtros → no renderizar nada
  if (totalActive === 0) return null;

  const removeFromList = (key: string, value: string, current: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    const next   = current.filter((v) => v !== value);
    next.length > 0 ? params.set(key, next.join(',')) : params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => router.push(pathname, { scroll: false });

  return (
    <div className="lg:hidden flex flex-wrap items-center gap-2 py-2" aria-label="Filtros activos">

      {/* Pills de categorías */}
      {activeCategories.map((cat) => (
        <span
          key={cat}
          className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 bg-titan-accent/10 border border-titan-accent/40 text-titan-accent text-xs font-bold uppercase tracking-wider"
        >
          {CATEGORY_LABELS[cat] ?? cat}
          <button
            onClick={() => removeFromList('category', cat, activeCategories)}
            className="hover:bg-titan-accent/20 rounded-full p-0.5 transition-colors"
            aria-label={`Quitar filtro ${CATEGORY_LABELS[cat] ?? cat}`}
          >
            <X size={10} />
          </button>
        </span>
      ))}

      {/* Pills de marcas */}
      {activeBrands.map((brand) => (
        <span
          key={brand}
          className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 bg-titan-surface border border-titan-border text-titan-text-muted text-xs font-bold uppercase tracking-wider"
        >
          {BRAND_LABELS[brand] ?? brand}
          <button
            onClick={() => removeFromList('brand', brand, activeBrands)}
            className="hover:text-white transition-colors rounded-full p-0.5"
            aria-label={`Quitar filtro ${BRAND_LABELS[brand] ?? brand}`}
          >
            <X size={10} />
          </button>
        </span>
      ))}

      {/* Pill de precio */}
      {hasPrice && (
        <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 bg-titan-surface border border-titan-border text-titan-text-muted text-xs font-bold uppercase tracking-wider">
          Precio: ${searchParams.get('price')}
          <button
            onClick={() => removeParam('price')}
            className="hover:text-white transition-colors rounded-full p-0.5"
            aria-label="Quitar filtro de precio"
          >
            <X size={10} />
          </button>
        </span>
      )}

      {/* Pill de búsqueda */}
      {query && (
        <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 bg-titan-surface border border-titan-border text-titan-text-muted text-xs font-bold uppercase tracking-wider">
          &ldquo;{query}&rdquo;
          <button
            onClick={() => removeParam('q')}
            className="hover:text-white transition-colors rounded-full p-0.5"
            aria-label="Limpiar búsqueda"
          >
            <X size={10} />
          </button>
        </span>
      )}

      {/* Limpiar todo */}
      {totalActive > 1 && (
        <button
          onClick={clearAll}
          className="text-[10px] font-bold text-titan-text-muted hover:text-titan-accent uppercase tracking-widest underline underline-offset-2 transition-colors ml-1"
        >
          Limpiar todo
        </button>
      )}
    </div>
  );
}
