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

export const PRODUCT_DETAIL_MAP: Record<string, ProductDetail> = {
  '1': {
    id:          '1',
    name:        'Titan Whey Isolate',
    slug:        '1',
    price:       64.99,
    category:    'Proteína',
    brand:       'Titan Labs',
    badge:       'Best Seller',
    description: 'La proteína hidrolizada de absorción ultra rápida diseñada para romper mesetas. 28g de proteína pura por servicio, cero azúcares añadidos y un perfil de aminoácidos diseñado para la hipertrofia extrema.',
    rating:      4.9,
    reviews:     248,
    stock:       15,
    images: [
      'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1000&auto=format&fit=crop',
    ],
    variants:    ['Chocolate Suizo', 'Vainilla Bourbon', 'Fresa Salvaje'],
    ingredients: 'Aislado de proteína de suero de leche, Cacao en polvo, Sucralosa, Enzimas digestivas (Aminogen).',
  },
  '2': {
    id:          '2',
    name:        'Berserker Pre-Workout',
    slug:        '2',
    price:       39.99,
    category:    'Energía',
    brand:       'Titan Labs',
    badge:       'Nuevo',
    description: 'Fórmula de pre-entreno sin compromiso. 400mg de cafeína anhidra + L-Citrulina Malato + Beta-Alanina para un pump extremo y foco mental total durante toda la sesión. Sin crash post-entreno.',
    rating:      4.7,
    reviews:     132,
    stock:       42,
    images: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    ],
    variants:    ['Sandía Ártica', 'Frutos del Bosque', 'Sin Sabor'],
    ingredients: 'L-Citrulina Malato (6g), Beta-Alanina (3.2g), Cafeína Anhidra (400mg), L-Tirosina (1g), Vitamina B6.',
  },
  '3': {
    id:          '3',
    name:        'Creatina Monohidratada',
    slug:        '3',
    price:       29.99,
    category:    'Recuperación',
    brand:       'Optimum',
    description: 'Creatina monohidratada micronizada de grado farmacéutico. 5g por servicio, sin aditivos ni rellenos. El suplemento más respaldado por la ciencia para aumentar la fuerza, potencia y recuperación muscular.',
    rating:      4.8,
    reviews:     319,
    stock:       88,
    images: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop',
    ],
    variants:    ['Sin Sabor', 'Limón'],
    ingredients: 'Creatina Monohidratada Micronizada (Creapure®) 5g. Sin otros ingredientes.',
  },
  '4': {
    id:          '4',
    name:        'Mass Gainer Colossus',
    slug:        '4',
    price:       54.99,
    category:    'Volumen',
    brand:       'MuscleTech',
    description: 'Ganador de masa hipercalórico diseñado para hardgainers. 1.250 kcal por servicio con 50g de proteína de alta calidad y carbohidratos complejos de absorción progresiva. Sin grasas trans.',
    rating:      4.5,
    reviews:     87,
    stock:       23,
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1000&auto=format&fit=crop',
    ],
    variants:    ['Chocolate Intenso', 'Vainilla & Caramelo'],
    ingredients: 'Mezcla de proteínas (Concentrado de suero, Caseína), Maltodextrina, Avena en polvo, Cacao, Sucralosa, Vitaminas y minerales.',
  },
  '5': {
    id:          '5',
    name:        'Aminoácidos BCAA Elite',
    slug:        '5',
    price:       34.99,
    category:    'Recuperación',
    brand:       'BSN',
    badge:       'Nuevo',
    description: 'Ratio 2:1:1 de Leucina, Isoleucina y Valina instantizados para máxima solubilidad. Añade Glutamina y Vitamina B6 para potenciar la síntesis proteica y reducir el catabolismo muscular intraentreno.',
    rating:      4.6,
    reviews:     74,
    stock:       56,
    images: [
      'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    ],
    variants:    ['Mango Tropical', 'Limón & Lima', 'Sin Sabor'],
    ingredients: 'L-Leucina (5g), L-Isoleucina (2.5g), L-Valina (2.5g), L-Glutamina (2g), Vitamina B6 (5mg).',
  },
  '6': {
    id:          '6',
    name:        'Quemador de Grasa Inferno',
    slug:        '6',
    price:       44.99,
    category:    'Pérdida de Peso',
    brand:       'Titan Labs',
    description: 'Termogénico de alta potencia con tecnología de liberación en capas. Acelera el metabolismo basal, suprime el apetito y mejora la oxidación de ácidos grasos. Formulado para preservar la masa muscular en déficit calórico.',
    rating:      4.4,
    reviews:     63,
    stock:       31,
    images: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop',
    ],
    variants:    ['Cápsula', 'Polvo — Naranja'],
    ingredients: 'Cafeína Anhidra (200mg), Extracto de Té Verde (500mg, 50% EGCG), L-Carnitina Tartrato (1g), Pimienta Negra (BioPerine®).',
  },
  '7': {
    id:          '7',
    name:        'Omega-3 Ultra Pure',
    slug:        '7',
    price:       24.99,
    category:    'Vitaminas',
    brand:       'Optimum',
    description: 'Aceite de pescado molecular destilado con 3.000mg de EPA+DHA por servicio. Certificado libre de metales pesados y contaminantes. Cápsula entérica para eliminar el sabor a pescado y maximizar la absorción intestinal.',
    rating:      4.7,
    reviews:     105,
    stock:       67,
    images: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop',
    ],
    variants:    ['90 cápsulas', '180 cápsulas'],
    ingredients: 'Aceite de pescado concentrado (EPA 1.800mg, DHA 1.200mg), Vitamina E (como tocoferol), Gelatina, Glicerina.',
  },
  '8': {
    id:          '8',
    name:        'Glutamina Recovery',
    slug:        '8',
    price:       32.99,
    category:    'Recuperación',
    brand:       'BSN',
    badge:       'Nuevo',
    description: 'L-Glutamina micronizada de calidad farmacéutica. El aminoácido más abundante en el músculo esquelético — crítico para la recuperación post-entreno, la salud intestinal y el mantenimiento del sistema inmune bajo entrenamiento intenso.',
    rating:      4.6,
    reviews:     58,
    stock:       44,
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    ],
    variants:    ['Sin Sabor', 'Limón'],
    ingredients: 'L-Glutamina micronizada 5g. Sin otros ingredientes. Apto para veganos.',
  },
};

/**
 * Busca un producto por su ID/slug.
 * Retorna undefined si el ID no existe en el mapa → la página llama notFound().
 */
export function getProductBySlug(slug: string): ProductDetail | undefined {
  return PRODUCT_DETAIL_MAP[slug];
}

/** IDs de todos los productos — para generateStaticParams (SSG en build time) */
export const ALL_PRODUCT_SLUGS = Object.keys(PRODUCT_DETAIL_MAP);
