import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import ProductInteractive from '@/components/product/ProductInteractive';
import ProductGallery from '@/components/product/ProductGallery';
import { getProductBySlug, ALL_PRODUCT_SLUGS } from './_data';

/*
  CORRECCIÓN DEL BUG — "siempre abre Titan Whey Isolate":
  ─────────────────────────────────────────────────────────
  CAUSA: getProductData() ignoraba el parámetro slug y retornaba
  siempre el mismo objeto hardcodeado. No importaba qué producto
  clickeara el usuario — la página siempre mostraba el mismo.

  SOLUCIÓN:
  1. Los datos de los 8 productos se definen en ./_data.ts con
     un mapa PRODUCT_DETAIL_MAP indexado por ID ('1'…'8').
  2. getProductBySlug(slug) busca en ese mapa y retorna el
     producto correcto, o undefined → notFound() si no existe.
  3. generateStaticParams() exporta los 8 slugs para que Next.js
     pre-genere las rutas en build time (SSG), igual que el blog.

  REGLA App Router — iconos de Lucide:
  Los iconos son objetos con métodos ($$typeof, render…) que NO
  se pueden serializar para pasar de Server → Client Component.
  GUARANTEES se define aquí y se renderiza en el Server Component,
  nunca se pasa como prop a ProductInteractive ni ProductGallery.
*/

// Definidas aquí en el servidor — nunca se serializan ni pasan como prop
const GUARANTEES = [
  { icon: ShieldCheck, label: 'Fórmula certificada', desc: 'Laboratorio independiente' },
  { icon: Truck,       label: 'Envío 24-48h',        desc: 'En tu base en 2 días' },
  { icon: RotateCcw,   label: 'Devolución 30 días',  desc: 'Sin preguntas' },
];

// ─── SSG: pre-genera /product/1 … /product/8 en build time ───────────────────

export function generateStaticParams() {
  return ALL_PRODUCT_SLUGS.map((slug) => ({ slug }));
}

// ─── Metadata dinámica por producto ──────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Producto no encontrado | TitanSupps' };

  return {
    title: `${product.name} | TitanSupps`,
    description: product.description.substring(0, 160),
    openGraph: { images: [product.images[0]] },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product  = getProductBySlug(slug);

  // Slug no encontrado en el mapa → 404
  if (!product) notFound();

  return (
    /*
      pt reducido: 24 → 20. pb: 24 → 12.
      El grid ahora usa gap-8 en vez de gap-16 — reduce el "aire" entre columnas.
      items-start para que ambas columnas arranquen desde arriba (no centradas).
    */
    <div className="min-h-screen pt-20 pb-12 container mx-auto px-6">

      {/* Breadcrumb — mb reducido de 8 → 4 */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-bold uppercase tracking-widest text-titan-text-muted">
        <ol className="flex items-center gap-2 flex-wrap">
          <li><Link href="/" className="hover:text-titan-accent transition-colors">Home</Link></li>
          <li><span className="text-titan-border" aria-hidden="true">/</span></li>
          <li><Link href="/catalog" className="hover:text-titan-accent transition-colors">Arsenal</Link></li>
          <li><span className="text-titan-border" aria-hidden="true">/</span></li>
          <li className="text-titan-text truncate max-w-[200px]" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 items-start">

        <ProductGallery
          images={product.images}
          productName={product.name}
          stock={product.stock}
        />

        {/* Columna derecha — gap reducido de 8 → 4 */}
        <div className="flex flex-col gap-4">

          {/* Header */}
          <div className="border-b border-titan-border pb-4">

            {/* Badge de categoría + marca */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              {product.badge && (
                <span className="px-2 py-0.5 bg-titan-accent text-black text-[10px] font-bold uppercase tracking-widest">
                  {product.badge}
                </span>
              )}
              <span className="text-[10px] font-bold text-titan-text-muted uppercase tracking-widest">
                {product.category}
              </span>
              <span className="text-titan-border text-[10px]" aria-hidden="true">·</span>
              <span className="text-[10px] font-bold text-titan-accent/70 uppercase tracking-widest">
                {product.brand}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div role="img" aria-label={`${product.rating} de 5 estrellas`} className="flex text-titan-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} aria-hidden="true" fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-titan-text-muted text-xs">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            <h1 className="font-heading text-fluid-2xl text-titan-text uppercase leading-[1.05] mb-2">
              {product.name}
            </h1>

            <div className="flex items-end gap-2">
              <span className="font-heading text-fluid-xl text-titan-accent">${product.price.toFixed(2)}</span>
              <span className="text-titan-text-muted text-sm pb-0.5">/ unidad</span>
            </div>
          </div>

          {/* Descripción — text-sm en vez de text-base, menos line-height */}
          <p className="text-titan-text-muted leading-relaxed text-sm">
            {product.description}
          </p>

          <ProductInteractive product={product} />

          {/* 
            MOBILE FIX: grid-cols-3 fijo → a 320px cada col era ~90px con texto de 8-9px (ilegible, falla WCAG 1.4.4).
            Ahora: 1 col en mobile (full width, legible), 3 cols desde sm (≥640px) en adelante.
            Texto escalado: text-[9px] → text-xs (12px), text-[8px] → text-[11px].
          */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {GUARANTEES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-1.5 p-3 sm:p-2.5 border border-titan-border bg-titan-surface">
                <Icon size={16} className="text-titan-accent flex-shrink-0" />
                <div className="flex sm:flex-col items-center sm:items-center gap-1 sm:gap-0.5">
                  <p className="text-xs font-bold uppercase tracking-widest text-titan-text leading-tight">{label}</p>
                  <span className="text-titan-text-muted sm:hidden" aria-hidden="true">·</span>
                  <p className="text-[11px] text-titan-text-muted leading-tight">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ingredientes — pt reducido */}
          <div className="border-t border-titan-border pt-4">
            <h2 className="font-heading text-base uppercase tracking-widest text-titan-text mb-2">Ingredientes</h2>
            <p className="text-titan-text-muted text-sm leading-relaxed">{product.ingredients}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
