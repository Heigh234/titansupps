-- ═══════════════════════════════════════════════════════════════════
-- TITANSUPPS — DATOS DE PRUEBA
-- Migration: 004_seed_data.sql
-- ADVERTENCIA: Ejecutar solo en entornos de desarrollo / staging.
-- ═══════════════════════════════════════════════════════════════════

-- ─── PRODUCTOS ──────────────────────────────────────────────────────
INSERT INTO public.products
  (name, slug, description, price, compare_price, sku, stock, category, status, featured)
VALUES
  ('Whey Isolate Pro',
   'whey-isolate-pro',
   'Proteína de suero aislada de máxima pureza. 90% de proteína por porción, mínima lactosa y grasa.',
   49.99, 64.99, 'WIP-001', 142, 'proteinas', 'active', TRUE),

  ('Creatina Monohidrato',
   'creatina-monohidrato',
   'Creatina de grado farmacéutico. Aumenta la fuerza, potencia y masa muscular.',
   24.99, 34.99, 'CRE-001', 87, 'creatinas', 'active', TRUE),

  ('Pre-Workout Titan Blast',
   'pre-workout-titan-blast',
   'Fórmula pre-entreno con cafeína, beta-alanina, citrulina y L-arginina.',
   39.99, 54.99, 'PRE-001', 63, 'pre-workout', 'active', FALSE),

  ('BCAA Recovery Complex',
   'bcaa-recovery-complex',
   'Aminoácidos de cadena ramificada en ratio 2:1:1 para máxima recuperación muscular.',
   34.99, 44.99, 'BCA-001', 9, 'aminoacidos', 'low_stock', FALSE),

  ('Mass Gainer Ultra',
   'mass-gainer-ultra',
   'Ganador de masa con 1200 kcal por porción, proteínas de alta calidad y carbohidratos complejos.',
   54.99, 69.99, 'MAS-001', 0, 'gainers', 'out_of_stock', FALSE),

  ('Omega-3 Premium',
   'omega-3-premium',
   'Aceite de pescado de alta concentración con EPA y DHA para salud cardiovascular y articular.',
   19.99, NULL, 'OME-001', 210, 'vitaminas', 'active', FALSE)
ON CONFLICT (slug) DO NOTHING;

-- ─── VARIANTES DE PRODUCTOS ─────────────────────────────────────────
INSERT INTO public.product_variants (product_id, name, options)
SELECT id, 'Sabor', ARRAY['Vainilla', 'Chocolate', 'Fresa', 'Sin sabor']
FROM public.products WHERE slug = 'whey-isolate-pro'
ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (product_id, name, options)
SELECT id, 'Tamaño', ARRAY['1 kg', '2.5 kg', '5 kg']
FROM public.products WHERE slug = 'whey-isolate-pro'
ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (product_id, name, options)
SELECT id, 'Sabor', ARRAY['Frutas del bosque', 'Limón', 'Naranja', 'Sin sabor']
FROM public.products WHERE slug = 'pre-workout-titan-blast'
ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (product_id, name, options)
SELECT id, 'Tamaño', ARRAY['500 g', '1 kg']
FROM public.products WHERE slug = 'creatina-monohidrato'
ON CONFLICT DO NOTHING;

-- ─── CUPONES ─────────────────────────────────────────────────────────
INSERT INTO public.coupons (code, type, value, min_order, max_uses, active, expires)
VALUES
  ('TITAN10',    'percent', 10,  0,    NULL, TRUE,  NOW() + INTERVAL '1 year'),
  ('BIENVENIDO', 'percent', 15,  0,    500,  TRUE,  NOW() + INTERVAL '6 months'),
  ('VERANO25',   'fixed',   25,  100,  200,  TRUE,  NOW() + INTERVAL '3 months'),
  ('BLACKFRIDAY','percent', 30,  50,   1000, FALSE, NOW() + INTERVAL '1 day')
ON CONFLICT (code) DO NOTHING;

-- ─── BLOG POSTS ──────────────────────────────────────────────────────
INSERT INTO public.blog_posts (slug, title, excerpt, category, author_name, published, published_at, content)
VALUES
  ('guia-proteina-whey',
   'Guía Definitiva de Proteína Whey: Todo lo que Necesitas Saber',
   'Descubre los tipos de proteína whey, cuál elegir según tus objetivos y cómo sacarle el máximo partido.',
   'nutricion',
   'Dr. Carlos Ruiz',
   TRUE,
   NOW() - INTERVAL '7 days',
   '[{"type":"heading","text":"¿Qué es la proteína Whey?"},{"type":"paragraph","text":"La proteína whey o proteína de suero de leche es un subproducto del proceso de fabricación del queso..."}]'),

  ('creatina-beneficios-ciencia',
   'Creatina: Beneficios Respaldados por la Ciencia',
   'La creatina es uno de los suplementos más estudiados del mundo. Aquí te contamos qué dice la ciencia.',
   'suplementacion',
   'Equipo TitanSupps',
   TRUE,
   NOW() - INTERVAL '14 days',
   '[{"type":"heading","text":"¿Qué es la creatina?"},{"type":"paragraph","text":"La creatina es un compuesto nitrogenado que se sintetiza naturalmente en el organismo..."}]')
ON CONFLICT (slug) DO NOTHING;

-- ─── SHIPPING ZONES (ya insertadas en 001, pero refreshamos) ────────
-- (Las zonas ya están en el schema migration)

-- ─── STORE SETTINGS ──────────────────────────────────────────────────
UPDATE public.store_settings SET
  name          = 'TitanSupps',
  tagline       = 'Suplementación de élite para atletas de alto rendimiento',
  email         = 'hola@titansupps.com',
  phone         = '+34 900 123 456',
  address       = 'Calle Deportiva 1, Planta 3',
  city          = 'Madrid',
  currency      = 'EUR',
  vat_rate      = 21,
  support_hours = 'Lun–Vie 9:00–18:00'
WHERE id = 1;
