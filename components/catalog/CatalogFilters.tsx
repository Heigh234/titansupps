'use client';

/**
 * components/catalog/CatalogFilters.tsx
 *
 * Lee el estado actual desde la URL y escribe de vuelta en ella.
 * Fuente de verdad única = searchParams — sin useState interno para filtros.
 *
 * Escribe los parámetros:
 *   ?category=proteina,creatina   (multi-selección, comma-separated)
 *   ?brand=titan+labs,bsn         (multi-selección)
 *   ?price=150                    (precio máximo)
 *
 * También lee ?category= al montar para pre-seleccionar si viene del navbar.
 */

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Check } from 'lucide-react';
import { useCallback } from 'react';

/* ─── DATA ──────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { label: 'Proteínas',      value: 'proteina' },
  { label: 'Pre-Workout',    value: 'pre-workout' },
  { label: 'Creatina',       value: 'creatina' },
  { label: 'Vitaminas',      value: 'vitaminas' },
  { label: 'Recuperación',   value: 'recuperacion' },
  { label: 'Pérdida de Peso', value: 'perdida-peso' },
];

const BRANDS = [
  { label: 'Titan Labs',  value: 'titan labs' },
  { label: 'Optimum',     value: 'optimum' },
  { label: 'MuscleTech',  value: 'muscletech' },
  { label: 'BSN',         value: 'bsn' },
];

/* ─── HELPERS ───────────────────────────────────────────────────────── */

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').map((v) => v.trim().toLowerCase()).filter(Boolean);
}

/* ─── COMPONENT ─────────────────────────────────────────────────────── */

export default function CatalogFilters() {
  const router     = useRouter();
  const pathname   = usePathname();
  const searchParams = useSearchParams();

  // Estado actual leído de la URL
  const activeCategories = parseList(searchParams.get('category'));
  const activeBrands     = parseList(searchParams.get('brand'));
  const currentPrice     = Number(searchParams.get('price') || 200);

  // Función central de actualización — construye la URL y navega
  const updateParams = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  // Toggle de ítem en lista multi-selección (category o brand)
  const toggleListParam = (key: string, value: string, current: string[]) => {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)   // quitar
      : [...current, value];                  // añadir
    updateParams(key, next.join(','));
  };

  // Limpiar TODOS los filtros
  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters =
    activeCategories.length > 0 ||
    activeBrands.length > 0 ||
    searchParams.get('price') !== null;

  return (
    <div className="space-y-8 pr-6">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-titan-border pb-4">
        <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-titan-accent hover:text-white uppercase tracking-widest transition-colors font-bold"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* ── Categorías ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-titan-text-muted">Categoría</h4>
        <div className="space-y-3">
          {CATEGORIES.map(({ label, value }) => {
            const isChecked = activeCategories.includes(value);
            return (
              <label key={value} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleListParam('category', value, activeCategories)}
                    className="peer appearance-none w-5 h-5 border border-titan-border bg-titan-bg checked:bg-titan-accent checked:border-titan-accent transition-colors cursor-pointer"
                  />
                  <Check
                    size={14}
                    className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  />
                </div>
                <span className={`text-sm transition-colors ${isChecked ? 'text-white font-bold' : 'text-titan-text group-hover:text-white'}`}>
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Precio Máximo ───────────────────────────────────────────── */}
      <div className="space-y-4 border-t border-titan-border pt-6">
        <h4 className="text-sm font-bold uppercase tracking-widest text-titan-text-muted">Precio Máximo</h4>
        <input
          type="range"
          min="0"
          max="200"
          value={currentPrice}
          onChange={(e) => updateParams('price', e.target.value)}
          className="w-full accent-titan-accent bg-titan-border h-1 appearance-none cursor-pointer"
          aria-label="Precio máximo"
        />
        <div className="flex justify-between text-xs font-bold">
          <span className="text-titan-text-muted">$0</span>
          <span className="text-titan-accent">${currentPrice === 200 ? '200+' : currentPrice}</span>
          <span className="text-titan-text-muted">$200+</span>
        </div>
      </div>

      {/* ── Marcas ─────────────────────────────────────────────────── */}
      <div className="space-y-4 border-t border-titan-border pt-6">
        <h4 className="text-sm font-bold uppercase tracking-widest text-titan-text-muted">Marca</h4>
        <div className="space-y-3">
          {BRANDS.map(({ label, value }) => {
            const isChecked = activeBrands.includes(value);
            return (
              <label key={value} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleListParam('brand', value, activeBrands)}
                    className="peer appearance-none w-5 h-5 border border-titan-border bg-titan-bg checked:bg-titan-accent checked:border-titan-accent transition-colors cursor-pointer"
                  />
                  <Check
                    size={14}
                    className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  />
                </div>
                <span className={`text-sm transition-colors ${isChecked ? 'text-white font-bold' : 'text-titan-text group-hover:text-white'}`}>
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
}
