/**
 * app/_data.ts — Datos estáticos del Home
 * ─────────────────────────────────────────
 * Centraliza todos los arrays de datos que antes vivían en page.tsx.
 *
 * CONVENCIÓN DE NOMENCLATURA:
 * El prefijo "_" indica que es un archivo de infraestructura/soporte
 * de la ruta, no un componente ni una página. Sigue el mismo patrón
 * establecido en about/_data.ts, affiliates/_data.ts, careers/_data.ts.
 *
 * PRÓXIMO PASO (producción):
 * Reemplazar estos arrays por llamadas a una API o CMS.
 * La firma de los tipos ya está preparada para esa migración.
 */

import { Trophy, FlaskConical, Star, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface FeaturedProduct {
  id:       string;
  title:    string;
  price:    number;
  category: string;
  brand:    string;
  image:    string;
  badge?:   string;
}

export interface Category {
  label: string;
  href:  string;
  image: string;
  desc:  string;
}

export interface Stat {
  value: string;
  label: string;
  icon:  LucideIcon;
}

export interface Testimonial {
  name:   string;
  role:   string;
  rating: number;
  text:   string;
}

// ─── Datos ───────────────────────────────────────────────────────────────────
// TODO: Reemplazar estos arrays con llamadas a API/CMS cuando el backend esté listo.

export const FEATURED_PRODUCTS: FeaturedProduct[] = [];

export const CATEGORIES: Category[] = [];

export const STATS: Stat[] = [
  { value: '—',  label: 'Atletas Activos',    icon: Trophy },
  { value: '—',  label: 'Pureza Certificada', icon: FlaskConical },
  { value: '—',  label: 'Rating Promedio',    icon: Star },
  { value: '—',  label: 'Entrega Máxima',     icon: Zap },
];

export const TESTIMONIALS: Testimonial[] = [];
