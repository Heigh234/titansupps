'use client';

// ─────────────────────────────────────────────────────────────────────────────
// TAB: DATOS PERSONALES — app/account/TabProfile.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Formulario de edición de nombre, email y contraseña.
// Recibe el usuario desde el auth store vía prop para evitar re-suscripciones.

import { motion } from 'framer-motion';
import { useToastStore } from '@/store/useToastStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function TabProfile() {
  const addToast = useToastStore((state) => state.addToast);
  const user     = useAuthStore((state) => state.user);

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // En producción: PATCH /api/user con los datos del formulario
    addToast({ title: 'Perfil Actualizado', type: 'success' });
  };

  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="max-w-2xl space-y-8"
    >
      <h2 className="font-heading text-2xl uppercase tracking-wider text-titan-text border-b border-titan-border pb-4">
        Información del Atleta
      </h2>

      <form className="space-y-6" onSubmit={handleSave}>
        {/* Datos básicos */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full bg-titan-surface border border-titan-border p-3 text-titan-text focus:outline-none focus:border-titan-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full bg-titan-surface border border-titan-border p-3 text-titan-text focus:outline-none focus:border-titan-accent transition-colors"
            />
          </div>
        </div>

        {/* Seguridad */}
        <div className="border-t border-titan-border pt-6">
          <h3 className="font-heading text-lg uppercase tracking-wider text-titan-text mb-4">Seguridad</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-titan-text-muted uppercase tracking-wider mb-2">
                Nueva Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-titan-surface border border-titan-border p-3 text-titan-text focus:outline-none focus:border-titan-accent transition-colors"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-titan-text text-titan-bg font-heading text-xl uppercase tracking-wider hover:bg-titan-accent hover:text-white transition-colors"
        >
          Guardar Cambios
        </button>
      </form>
    </motion.div>
  );
}
