'use client';

/**
 * app/admin/products/new/page.tsx — Crear nuevo producto
 * ─────────────────────────────────────────────────────────
 * ARQUITECTURA POST-MODULARIZACIÓN:
 * Este archivo es el orquestador del formulario. Sus responsabilidades
 * son exclusivamente: instanciar el form (useForm + zodResolver),
 * manejar el submit, y componer el layout general.
 *
 * Las responsabilidades que SALIERON de aquí:
 *   → ImageUploadZone.tsx   drag&drop + estado dragActive + preview
 *   → VariantsFieldArray.tsx  useFieldArray + UI animada de variantes
 *   → types.ts               productSchema (Zod) + ProductFormValues
 *
 * DECISIÓN DE DISEÑO — por qué pasar props y no useFormContext:
 * Pasar control/register/errors explícitamente a VariantsFieldArray
 * es más verbose pero hace la dependencia completamente visible.
 * useFormContext requeriría un FormProvider adicional y ocultaría
 * la relación entre componentes, dificultando el mantenimiento.
 */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';

import { productSchema, type ProductFormValues } from './types';
import ImageUploadZone from './ImageUploadZone';
import VariantsFieldArray from './VariantsFieldArray';

export default function NewProductPage() {
  const router   = useRouter();
  const addToast = useToastStore((state) => state.addToast);

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Las imágenes se elevan desde ImageUploadZone vía callback
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { status: 'draft', category: '', variants: [] },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Guardando producto élite:', { ...data, images });
      // TODO: Subir imágenes a S3/Cloudinary y persistir en BD
      await new Promise((resolve) => setTimeout(resolve, 1500));

      addToast({
        title: 'Producto forjado',
        message: `${data.name} ha sido guardado en el arsenal.`,
        type: 'success',
      });
      router.push('/admin/products');
    } catch {
      addToast({
        title: 'Error en la forja',
        message: 'No se pudo guardar el producto.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-24 animate-in fade-in duration-500">

      {/* ── STICKY HEADER ── */}
      <div className="sticky top-20 z-40 bg-titan-bg/80 backdrop-blur-md border-b border-titan-border pb-4 mb-8 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mt-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 bg-titan-surface border border-titan-border text-titan-text hover:text-titan-accent hover:border-titan-accent transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="font-heading text-2xl uppercase text-titan-text tracking-wider">
              Nuevo Armamento
            </h2>
            <p className="text-titan-text-muted text-xs uppercase tracking-widest font-bold">
              Añadir producto al catálogo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="px-6 py-2.5 bg-titan-surface border border-titan-border text-titan-text text-sm font-bold uppercase tracking-wider hover:bg-titan-bg transition-colors"
          >
            Descartar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-titan-accent text-white text-sm font-bold uppercase tracking-wider hover:bg-titan-accent-hover transition-colors shadow-[0_0_15px_rgba(255,94,0,0.2)] flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Guardar Producto
          </button>
        </div>
      </div>

      {/* ── LAYOUT PRINCIPAL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* COLUMNA IZQUIERDA — Contenido del producto */}
        <div className="lg:col-span-2 space-y-8">

          {/* Detalles básicos */}
          <section className="bg-titan-surface border border-titan-border p-6 space-y-6">
            <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text border-b border-titan-border pb-4">
              Detalles Generales
            </h3>

            <div>
              <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">
                Nombre del Producto
              </label>
              <input
                {...register('name')}
                className={`w-full bg-titan-bg border p-3 text-titan-text focus:outline-none focus:border-titan-accent transition-colors ${
                  errors.name ? 'border-red-500' : 'border-titan-border'
                }`}
                placeholder="Ej: Titan Whey Isolate 5lbs"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">
                Descripción Completa
              </label>
              <textarea
                {...register('description')}
                rows={6}
                className={`w-full bg-titan-bg border p-3 text-titan-text focus:outline-none focus:border-titan-accent transition-colors resize-y ${
                  errors.description ? 'border-red-500' : 'border-titan-border'
                }`}
                placeholder="Describe los beneficios, ingredientes clave y uso recomendado..."
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>
          </section>

          {/* Media — delega completamente a ImageUploadZone */}
          <ImageUploadZone onImagesChange={setImages} />

          {/* Variantes — delega a VariantsFieldArray */}
          <VariantsFieldArray control={control} register={register} errors={errors} />

        </div>

        {/* COLUMNA DERECHA — Configuración de negocio */}
        <div className="space-y-8">

          {/* Estado del producto */}
          <section className="bg-titan-surface border border-titan-border p-6 space-y-4">
            <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text border-b border-titan-border pb-4">
              Estado
            </h3>
            <select
              {...register('status')}
              className="w-full bg-titan-bg border border-titan-border p-3 text-titan-text focus:outline-none focus:border-titan-accent uppercase tracking-widest text-sm font-bold cursor-pointer"
            >
              <option value="active">Activo (Visible)</option>
              <option value="draft">Borrador (Oculto)</option>
              <option value="archived">Archivado</option>
            </select>
          </section>

          {/* Categoría */}
          <section className="bg-titan-surface border border-titan-border p-6 space-y-4">
            <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text border-b border-titan-border pb-4">
              Categoría
            </h3>
            <select
              {...register('category')}
              className={`w-full bg-titan-bg border p-3 text-titan-text focus:outline-none focus:border-titan-accent uppercase tracking-widest text-sm font-bold cursor-pointer ${
                errors.category ? 'border-red-500' : 'border-titan-border'
              }`}
            >
              <option value="">Selecciona una...</option>
              <option value="proteina">Proteínas</option>
              <option value="pre-workout">Pre-Workouts</option>
              <option value="creatina">Creatinas</option>
              <option value="vitaminas">Vitaminas & Salud</option>
              <option value="accesorios">Accesorios</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </section>

          {/* Precios */}
          <section className="bg-titan-surface border border-titan-border p-6 space-y-4">
            <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text border-b border-titan-border pb-4">
              Precios
            </h3>

            <div>
              <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">
                Precio de Venta ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('price')}
                className={`w-full bg-titan-bg border p-3 text-titan-text focus:outline-none focus:border-titan-accent font-heading text-xl ${
                  errors.price ? 'border-red-500' : 'border-titan-border'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">
                Precio de Comparación ($) — Opcional
              </label>
              <input
                type="number"
                step="0.01"
                {...register('comparePrice')}
                className="w-full bg-titan-bg border border-titan-border p-3 text-titan-text focus:outline-none focus:border-titan-accent font-heading text-xl text-titan-text-muted"
                placeholder="0.00"
              />
              <p className="text-[10px] text-titan-text-muted mt-1 uppercase tracking-widest">
                Para mostrar un precio tachado (Oferta)
              </p>
            </div>
          </section>

          {/* Inventario */}
          <section className="bg-titan-surface border border-titan-border p-6 space-y-4">
            <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text border-b border-titan-border pb-4">
              Inventario
            </h3>

            <div>
              <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">
                SKU (Código Interno)
              </label>
              <input
                {...register('sku')}
                className={`w-full bg-titan-bg border p-3 text-titan-text focus:outline-none focus:border-titan-accent ${
                  errors.sku ? 'border-red-500' : 'border-titan-border'
                }`}
                placeholder="PR-WHEY-001"
              />
              {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">
                Stock Disponible
              </label>
              <input
                type="number"
                {...register('stock')}
                className={`w-full bg-titan-bg border p-3 text-titan-text focus:outline-none focus:border-titan-accent ${
                  errors.stock ? 'border-red-500' : 'border-titan-border'
                }`}
                placeholder="0"
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
            </div>
          </section>

        </div>
      </div>
    </form>
  );
}
