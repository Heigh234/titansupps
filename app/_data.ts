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

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id:       '1',
    title:    'Titan Whey Isolate',
    price:    59.99,
    category: 'Proteína',
    brand:    'Titan Labs',
    image:    'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=500&auto=format&fit=crop',
    badge:    'Best Seller',
  },
  {
    id:       '2',
    title:    'Berserker Pre-Workout',
    price:    39.99,
    category: 'Energía',
    brand:    'Titan Labs',
    image:    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=500&auto=format&fit=crop',
    badge:    'Nuevo',
  },
  {
    id:       '3',
    title:    'Creatina Monohidratada',
    price:    29.99,
    category: 'Recuperación',
    brand:    'Optimum',
    image:    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=500&auto=format&fit=crop',
  },
  {
    id:       '4',
    title:    'Mass Gainer Colossus',
    price:    54.99,
    category: 'Volumen',
    brand:    'MuscleTech',
    image:    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop',
  },
];

export const CATEGORIES: Category[] = [
  {
    label: 'Proteínas',
    href:  '/catalog?category=proteina',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    desc:  'Máxima absorción y pureza',
  },
  {
    label: 'Pre-Workout',
    href:  '/catalog?category=pre-workout',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    desc:  'Energía y foco extremos',
  },
  {
    label: 'Creatina',
    href:  '/catalog?category=creatina',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    desc:  'Potencia y recuperación',
  },
];

export const STATS: Stat[] = [
  { value: '50K+',  label: 'Atletas Activos',     icon: Trophy },
  { value: '99.2%', label: 'Pureza Certificada',  icon: FlaskConical },
  { value: '4.9★',  label: 'Rating Promedio',     icon: Star },
  { value: '48h',   label: 'Entrega Máxima',      icon: Zap },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name:   'Carlos M.',
    role:   'Culturista Amateur',
    rating: 5,
    text:   'El Titan Whey es el mejor aislado que he probado. Sin hinchazón, absorción brutal y el sabor chocolate es adictivo.',
  },
  {
    name:   'Laura V.',
    role:   'CrossFit Atleta',
    rating: 5,
    text:   'El Berserker Pre-Workout me cambió los entrenamientos. Sin crash post-sesión y con foco total durante 2 horas.',
  },
  {
    name:   'Diego R.',
    role:   'Powerlifter',
    rating: 5,
    text:   'La creatina monohidratada es pura. Sin rellenos raros. Llevo 6 meses usándola y los resultados hablan solos.',
  },
];
