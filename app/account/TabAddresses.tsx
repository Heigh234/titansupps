'use client';

// ─────────────────────────────────────────────────────────────────────────────
// TAB: DIRECCIONES — app/account/TabAddresses.tsx
// ─────────────────────────────────────────────────────────────────────────────
// CRUD completo de direcciones de envío.
// Estado y handlers de direcciones viven aquí — no necesitan subir al padre.
// El modal de añadir/editar se gestiona con AnimatePresence para animación de salida.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Edit2, Check, Trash2, Plus } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';
import AddressModal from './AddressModal';
import { INITIAL_ADDRESSES, emptyForm } from './_types';
import type { Address, AddressFormData } from './_types';

export default function TabAddresses() {
  const addToast = useToastStore((state) => state.addToast);

  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [modal, setModal] = useState<{
    open:    boolean;
    mode:    'add' | 'edit';
    editing: Address | null;
  }>({ open: false, mode: 'add', editing: null });

  // ── Apertura del modal ──────────────────────────────────────────────────────
  const openAddModal  = () => setModal({ open: true, mode: 'add',  editing: null });
  const openEditModal = (addr: Address) => setModal({ open: true, mode: 'edit', editing: addr });
  const closeModal    = () => setModal({ open: false, mode: 'add', editing: null });

  // ── Guardar (añadir o editar) ───────────────────────────────────────────────
  const handleSave = (data: AddressFormData) => {
    if (modal.mode === 'add') {
      const newAddr: Address = {
        id:        Date.now(),
        ...data,
        // Primera dirección añadida se convierte en principal automáticamente
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, newAddr]);
      addToast({ type: 'success', title: '¡Base añadida!', message: `"${data.title}" se añadió a tus direcciones.` });
    } else if (modal.editing) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === modal.editing!.id ? { ...a, ...data } : a))
      );
      addToast({ type: 'success', title: 'Dirección actualizada', message: `"${data.title}" se guardó correctamente.` });
    }
    closeModal();
  };

  // ── Eliminar ────────────────────────────────────────────────────────────────
  const handleDelete = (id: number, title: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      // Si eliminamos la principal y quedan otras, la primera pasa a ser principal
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
    addToast({ type: 'info', title: 'Dirección eliminada', message: `"${title}" fue removida.` });
  };

  // ── Establecer como principal ───────────────────────────────────────────────
  const handleSetDefault = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    addToast({ type: 'success', title: 'Dirección principal actualizada', message: 'Tu dirección de envío por defecto fue cambiada.' });
  };

  return (
    <>
      <motion.div
        key="addresses"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        {/* Header con botón de nueva dirección */}
        <div className="flex justify-between items-center border-b border-titan-border pb-4">
          <h2 className="font-heading text-2xl uppercase tracking-wider text-titan-text">Tus Bases</h2>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 text-xs text-titan-accent font-bold uppercase tracking-widest hover:text-white transition-colors px-3 py-2 border border-titan-accent/30 hover:border-white/30 hover:bg-white/5"
          >
            <Plus size={14} /> Nueva dirección
          </button>
        </div>

        {/* Estado vacío */}
        {addresses.length === 0 ? (
          <div className="border border-dashed border-titan-border p-12 text-center">
            <MapPin size={32} className="text-titan-text-muted mx-auto mb-3" />
            <p className="text-titan-text-muted mb-4">Aún no tienes direcciones guardadas.</p>
            <button
              onClick={openAddModal}
              className="text-xs font-bold text-titan-accent uppercase tracking-widest hover:text-white transition-colors"
            >
              + Añadir tu primera dirección
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            <AnimatePresence>
              {addresses.map((addr) => (
                <motion.div
                  key={addr.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="bg-titan-surface border border-titan-border p-6 relative group"
                >
                  {/* Badge de dirección principal */}
                  {addr.isDefault && (
                    <span className="absolute top-0 right-0 bg-titan-text text-titan-bg text-[10px] uppercase font-bold px-2 py-1">
                      Principal
                    </span>
                  )}

                  <h3 className="font-bold text-titan-text mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-titan-text-muted" /> {addr.title}
                  </h3>
                  <p className="text-sm text-titan-text-muted mb-6">
                    {addr.address}<br />{addr.city}
                  </p>

                  {/* Acciones */}
                  <div className="flex flex-wrap gap-4 border-t border-titan-border pt-4">
                    <button
                      onClick={() => openEditModal(addr)}
                      className="text-xs font-bold uppercase tracking-widest text-titan-text-muted hover:text-titan-text flex items-center gap-1 transition-colors"
                    >
                      <Edit2 size={12} /> Editar
                    </button>

                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-xs font-bold uppercase tracking-widest text-titan-text-muted hover:text-titan-accent flex items-center gap-1 transition-colors"
                      >
                        <Check size={12} /> Hacer principal
                      </button>
                    )}

                    {(!addr.isDefault || addresses.length > 1) && (
                      <button
                        onClick={() => handleDelete(addr.id, addr.title)}
                        className="text-xs font-bold uppercase tracking-widest text-titan-text-muted hover:text-red-500 flex items-center gap-1 transition-colors ml-auto"
                      >
                        <Trash2 size={12} /> Eliminar
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Modal — fuera del flujo del tab para animación de salida correcta */}
      <AnimatePresence>
        {modal.open && (
          <AddressModal
            mode={modal.mode}
            initial={
              modal.mode === 'edit' && modal.editing
                ? { title: modal.editing.title, address: modal.editing.address, city: modal.editing.city }
                : emptyForm
            }
            onSave={handleSave}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
