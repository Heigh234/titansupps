/**
 * StatsSection.tsx — Barra de métricas / social proof
 * ──────────────────────────────────────────────────────
 * Posición en el flujo: entre el Hero y los Productos Destacados.
 * Función psicológica: anclar credibilidad antes de que el usuario
 * vea los productos. Los números (50K+, 99.2%, 4.9★, 48h) responden
 * las 4 objeciones de compra más comunes: comunidad, calidad, satisfacción
 * y velocidad de entrega.
 *
 * cv-section-stats: clase de content-visibility definida en globals.css.
 * Omite layout/paint hasta que el usuario hace scroll hacia aquí.
 */

import { STATS } from './_data';

export default function StatsSection() {
  return (
    <section
      className="cv-section-stats border-y border-titan-border bg-titan-surface/40"
      aria-label="Estadísticas de TitanSupps"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-3 group"
            >
              {/* Icono en recuadro con hover sutil */}
              <div className="w-10 h-10 flex items-center justify-center border border-titan-border text-titan-accent group-hover:border-titan-accent/50 group-hover:bg-titan-accent/5 transition-all duration-300">
                <Icon size={18} aria-hidden="true" />
              </div>

              {/* Valor principal */}
              <span className="font-heading text-fluid-2xl text-titan-text leading-none">
                {value}
              </span>

              {/* Etiqueta descriptiva */}
              <span className="text-xs text-titan-text-muted uppercase tracking-widest font-bold">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
