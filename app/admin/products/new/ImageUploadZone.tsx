'use client';

/**
 * ImageUploadZone.tsx — Zona de carga de imágenes con Drag & Drop
 * ────────────────────────────────────────────────────────────────
 * EXTRACCIÓN: Separado de page.tsx porque gestiona su propio estado
 * de interacción (dragActive) y es una pieza de UI autocontenida.
 *
 * INTERFAZ CON EL PADRE:
 * - onImagesChange(urls: string[]) → notifica al padre cuando la lista
 *   de imágenes cambia (para incluirlas en el submit del formulario).
 *
 * TODO PRODUCCIÓN:
 * - Reemplazar simulación por subida real a S3/Cloudinary.
 * - Añadir preview de imágenes cargadas con opción de reordenar.
 * - Añadir validación de tipo y tamaño de archivo antes de subir.
 */

import { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';

interface ImageUploadZoneProps {
  /** Callback que recibe las URLs actualizadas cada vez que cambia la lista */
  onImagesChange?: (urls: string[]) => void;
}

export default function ImageUploadZone({ onImagesChange }: ImageUploadZoneProps) {
  const addToast   = useToastStore((state) => state.addToast);
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages]         = useState<string[]>([]);

  // Simula la carga y genera una URL temporal de objeto
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    const updated = [...images, ...newUrls];

    setImages(updated);
    onImagesChange?.(updated);

    addToast({
      title: 'Imágenes detectadas',
      message: `${files.length} imagen${files.length > 1 ? 'es' : ''} añadida${files.length > 1 ? 's' : ''}.`,
      type: 'info',
    });
  };

  const handleRemove = (index: number) => {
    // Revocamos la URL de objeto para liberar memoria
    URL.revokeObjectURL(images[index]);
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onImagesChange?.(updated);
  };

  return (
    <section className="bg-titan-surface border border-titan-border p-6 space-y-6">
      <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text border-b border-titan-border pb-4">
        Multimedia
      </h3>

      {/* ── Drop Zone ── */}
      <div
        role="button"
        aria-label="Zona de carga de imágenes. Arrastra archivos o haz clic para explorar."
        tabIndex={0}
        className={`relative w-full h-48 border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
          dragActive
            ? 'border-titan-accent bg-titan-accent/5'
            : 'border-titan-border bg-titan-bg hover:border-titan-text-muted'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <UploadCloud
          size={40}
          className={`mb-4 transition-colors ${dragActive ? 'text-titan-accent' : 'text-titan-text-muted'}`}
        />
        <p className="text-sm font-bold text-titan-text uppercase tracking-widest">
          Arrastra imágenes aquí
        </p>
        <p className="text-xs text-titan-text-muted mt-2">
          o haz clic para explorar (JPG, PNG, WEBP)
        </p>

        {/* Input invisible sobre toda la zona */}
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* ── Preview de imágenes cargadas ── */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div key={url} className="relative group aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Imagen ${i + 1}`}
                className="w-full h-full object-cover border border-titan-border"
              />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                aria-label={`Eliminar imagen ${i + 1}`}
                className="absolute top-1 right-1 p-0.5 bg-titan-bg/80 border border-titan-border text-titan-text-muted hover:text-red-500 hover:border-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
