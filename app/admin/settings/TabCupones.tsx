'use client';

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4 — CUPONES — app/admin/settings/TabCupones.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { Plus, Trash2, Copy, Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { Toggle, Modal } from './_components';
import { INIT_COUPONS, EMPTY_COUPON, generateCode, copyToClipboard } from './_data';
import type { Coupon } from './_types';

export default function TabCupones() {
  const [coupons, setCoupons]   = useState<Coupon[]>(INIT_COUPONS);
  const [showModal, setModal]   = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copied, setCopied]     = useState<string | null>(null);
  const [form, setForm]         = useState(EMPTY_COUPON);
  const [formErr, setFormErr]   = useState('');

  const toggleActive = (id: string) =>
    setCoupons((cs) => cs.map((c) => c.id === id ? { ...c, active: !c.active } : c));

  const confirmDelete = (id: string) => setDeleteId(id);

  const doDelete = () => {
    if (!deleteId) return;
    setCoupons((cs) => cs.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };

  const handleCopy = (code: string) => {
    copyToClipboard(code, () => {
      setCopied(code);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const handleAdd = () => {
    if (!form.code.trim())  { setFormErr('El código no puede estar vacío.'); return; }
    if (!form.value.trim()) { setFormErr('Introduce el valor del descuento.'); return; }
    if (coupons.some((c) => c.code.toUpperCase() === form.code.toUpperCase())) {
      setFormErr('Ese código ya existe.');
      return;
    }
    const newCoupon: Coupon = {
      id:       `c${Date.now()}`,
      code:     form.code.toUpperCase().trim(),
      type:     form.type,
      value:    form.value,
      minOrder: form.minOrder || '0',
      uses:     0,
      maxUses:  form.maxUses || '∞',
      active:   true,
      expires:  form.expires || '2025-12-31',
    };
    setCoupons((cs) => [newCoupon, ...cs]);
    setForm(EMPTY_COUPON);
    setFormErr('');
    setModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-2xl uppercase tracking-wider text-titan-text">Códigos de Descuento</h3>
          <p className="text-titan-text-muted text-sm mt-1">
            {coupons.filter((c) => c.active).length} cupones activos de {coupons.length} totales.
          </p>
        </div>
        <button
          onClick={() => { setForm(EMPTY_COUPON); setFormErr(''); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-titan-accent text-white font-bold text-sm uppercase tracking-wider hover:bg-titan-accent-hover transition-colors shadow-[0_0_15px_rgba(255,94,0,0.2)] flex-shrink-0"
        >
          <Plus size={16} /> Nuevo cupón
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-titan-surface border border-titan-border overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-titan-bg border-b border-titan-border">
                {['Código', 'Tipo', 'Descuento', 'Pedido mín.', 'Usos', 'Caduca', 'Estado', ''].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-titan-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-titan-border">
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-titan-text-muted text-sm">
                    No hay cupones. Crea el primero.
                  </td>
                </tr>
              )}
              {coupons.map((c) => (
                <tr key={c.id} className={`group hover:bg-titan-bg/50 transition-colors ${!c.active ? 'opacity-50' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-base text-titan-accent tracking-wider">{c.code}</span>
                      <button
                        onClick={() => handleCopy(c.code)}
                        className="p-1 text-titan-text-muted hover:text-titan-accent transition-colors opacity-0 group-hover:opacity-100"
                        title="Copiar código"
                      >
                        {copied === c.code ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-titan-text-muted capitalize">
                    {c.type === 'percent' ? 'Porcentual' : 'Fijo'}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-titan-text">
                      {c.type === 'percent' ? `${c.value}%` : `€${c.value}`}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-titan-text-muted">€{c.minOrder}</td>
                  <td className="px-5 py-4 text-sm text-titan-text-muted">{c.uses} / {c.maxUses}</td>
                  <td className="px-5 py-4 text-sm text-titan-text-muted">{c.expires}</td>
                  <td className="px-5 py-4">
                    <Toggle enabled={c.active} onChange={() => toggleActive(c.id)} label={`Cupón ${c.code}`} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => confirmDelete(c.id)}
                      className="p-2 text-titan-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Eliminar cupón"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: añadir cupón */}
      {showModal && (
        <Modal title="Nuevo cupón de descuento" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-titan-text-muted block mb-1.5">Código</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => { setForm((f) => ({ ...f, code: e.target.value.toUpperCase() })); setFormErr(''); }}
                  placeholder="TITAN10"
                  className="flex-1 bg-titan-bg border border-titan-border px-4 py-2.5 text-sm text-titan-text focus:outline-none focus:border-titan-accent transition-colors placeholder:text-titan-text-muted font-bold tracking-widest"
                />
                <button
                  onClick={() => setForm((f) => ({ ...f, code: generateCode() }))}
                  title="Generar código aleatorio"
                  className="px-3 py-2.5 border border-titan-border text-titan-text-muted hover:border-titan-accent hover:text-titan-accent transition-colors"
                >
                  <RefreshCw size={15} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-titan-text-muted block mb-1.5">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as 'percent' | 'fixed' }))}
                  className="w-full bg-titan-bg border border-titan-border px-3 py-2.5 text-sm text-titan-text focus:outline-none focus:border-titan-accent transition-colors"
                >
                  <option value="percent">Porcentual (%)</option>
                  <option value="fixed">Fijo (€)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-titan-text-muted block mb-1.5">
                  Valor {form.type === 'percent' ? '(%)' : '(€)'}
                </label>
                <input
                  type="number"
                  value={form.value}
                  onChange={(e) => { setForm((f) => ({ ...f, value: e.target.value })); setFormErr(''); }}
                  placeholder={form.type === 'percent' ? '10' : '5'}
                  className="w-full bg-titan-bg border border-titan-border px-4 py-2.5 text-sm text-titan-text focus:outline-none focus:border-titan-accent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-titan-text-muted block mb-1.5">Pedido mínimo (€)</label>
                <input
                  type="number"
                  value={form.minOrder}
                  onChange={(e) => setForm((f) => ({ ...f, minOrder: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-titan-bg border border-titan-border px-4 py-2.5 text-sm text-titan-text focus:outline-none focus:border-titan-accent transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-titan-text-muted block mb-1.5">Usos máximos</label>
                <input
                  type="text"
                  value={form.maxUses}
                  onChange={(e) => setForm((f) => ({ ...f, maxUses: e.target.value }))}
                  placeholder="∞ sin límite"
                  className="w-full bg-titan-bg border border-titan-border px-4 py-2.5 text-sm text-titan-text focus:outline-none focus:border-titan-accent transition-colors placeholder:text-titan-text-muted"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-titan-text-muted block mb-1.5">Fecha de caducidad</label>
              <input
                type="date"
                value={form.expires}
                onChange={(e) => setForm((f) => ({ ...f, expires: e.target.value }))}
                className="w-full bg-titan-bg border border-titan-border px-4 py-2.5 text-sm text-titan-text focus:outline-none focus:border-titan-accent transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {formErr && (
              <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/5">
                <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
                <p className="text-xs text-red-400">{formErr}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setModal(false)}
                className="flex-1 py-2.5 border border-titan-border text-titan-text-muted text-sm font-bold uppercase tracking-wider hover:border-titan-accent hover:text-titan-accent transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2.5 bg-titan-accent text-white text-sm font-bold uppercase tracking-wider hover:bg-titan-accent-hover transition-colors"
              >
                Crear cupón
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: confirmar eliminación */}
      {deleteId && (
        <Modal title="Eliminar cupón" onClose={() => setDeleteId(null)}>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 border border-red-500/20 bg-red-500/5">
              <AlertTriangle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-titan-text-muted">
                El cupón{' '}
                <strong className="text-titan-accent">{coupons.find((c) => c.id === deleteId)?.code}</strong>{' '}
                será eliminado permanentemente. Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-titan-border text-titan-text-muted text-sm font-bold uppercase tracking-wider hover:border-titan-accent hover:text-titan-accent transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={doDelete}
                className="flex-1 py-2.5 bg-red-500 text-white text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
