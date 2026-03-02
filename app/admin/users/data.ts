/**
 * app/admin/users/data.ts
 *
 * Datos y configuración del módulo de Gestión de Clientes.
 *
 * Exporta:
 *   MOCK_CLIENTS         → 20 clientes con historial de pedidos realista.
 *                          En producción se reemplaza por fetch/useQuery a la API.
 *   PAGE_SIZE            → Clientes por página en la tabla.
 *   SEGMENT_CONFIG       → Colores, iconos y descripción de cada segmento.
 *   STATUS_ORDER_CONFIG  → Colores de estado de pedido para el modal.
 *   ALL_SEGMENTS         → Array tipado de todos los segmentos (para iteración).
 */

import {
  Sparkles, UserCheck, UserX, Star,
} from 'lucide-react';
import type { Client, Segment } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────────────────────

export const PAGE_SIZE = 8;

// ─────────────────────────────────────────────────────────────────────────────
// SEGMENT CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const SEGMENT_CONFIG: Record<Segment, {
  label:  string;
  color:  string;
  bg:     string;
  border: string;
  icon:   React.ElementType;
  desc:   string;
}> = {
  vip:        { label: 'VIP',        color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30', icon: Sparkles,  desc: '+10 pedidos o >€1.000 gastados' },
  activo:     { label: 'Activo',     color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', icon: UserCheck, desc: 'Compra regularmente' },
  nuevo:      { label: 'Nuevo',      color: 'text-blue-400',  bg: 'bg-blue-400/10',  border: 'border-blue-400/30',  icon: Star,      desc: 'Primer pedido reciente' },
  suspendido: { label: 'Suspendido', color: 'text-red-400',   bg: 'bg-red-400/10',   border: 'border-red-400/30',   icon: UserX,     desc: 'Acceso restringido' },
};

export const ALL_SEGMENTS = Object.keys(SEGMENT_CONFIG) as Segment[];

// ─────────────────────────────────────────────────────────────────────────────
// STATUS ORDER CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const STATUS_ORDER_CONFIG = {
  entregado:  { label: 'Entregado',  color: 'text-green-400'  },
  enviado:    { label: 'Enviado',    color: 'text-purple-400' },
  procesando: { label: 'Procesando', color: 'text-blue-400'   },
  cancelado:  { label: 'Cancelado',  color: 'text-red-400'    },
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — 20 clientes con historial de pedidos realista
// En producción: reemplazar por fetch/useQuery al endpoint de clientes.
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'CLI-001', name: 'Carlos Mendoza', email: 'carlos.m@gmail.com', phone: '+34 612 345 678',
    city: 'Barcelona', country: 'España', segment: 'vip',
    totalOrders: 14, totalSpent: 1248.60, avgOrderValue: 89.18,
    lastPurchase: '2025-02-14T10:32:00Z', registered: '2023-06-12T09:00:00Z',
    favoriteProduct: 'Titan Whey Isolate Elite',
    notes: 'Cliente premium. Suele hacer pedidos de stock completo cada 2 meses.',
    orders: [
      { id: 'ORD-1021', date: '2025-02-14T10:32:00Z', total: 159.97, status: 'entregado', items: 'Whey Isolate ×2, Creatina ×1' },
      { id: 'ORD-0998', date: '2024-12-20T08:10:00Z', total: 194.96, status: 'entregado', items: 'Whey Isolate ×3, Berserker ×1' },
      { id: 'ORD-0972', date: '2024-10-05T14:22:00Z', total: 124.98, status: 'entregado', items: 'Mass Gainer ×1, Creatina ×2' },
    ],
  },
  {
    id: 'CLI-002', name: 'Laura Vidal', email: 'laura.vidal@icloud.com', phone: '+34 633 211 444',
    city: 'Madrid', country: 'España', segment: 'activo',
    totalOrders: 5, totalSpent: 289.94, avgOrderValue: 57.99,
    lastPurchase: '2025-02-16T08:15:00Z', registered: '2024-03-18T11:30:00Z',
    favoriteProduct: 'Berserker Pre-Workout',
    orders: [
      { id: 'ORD-1020', date: '2025-02-16T08:15:00Z', total: 39.99, status: 'enviado',    items: 'Berserker Pre-Workout ×1' },
      { id: 'ORD-0989', date: '2024-11-30T16:45:00Z', total: 79.98, status: 'entregado',  items: 'Berserker Pre-Workout ×2' },
      { id: 'ORD-0961', date: '2024-09-10T09:00:00Z', total: 64.99, status: 'entregado',  items: 'Titan Whey Isolate ×1' },
    ],
  },
  {
    id: 'CLI-003', name: 'Diego Romero', email: 'd.romero@outlook.es', phone: '+34 677 891 234',
    city: 'Barcelona', country: 'España', segment: 'vip',
    totalOrders: 19, totalSpent: 1892.40, avgOrderValue: 99.60,
    lastPurchase: '2025-02-17T14:47:00Z', registered: '2023-01-05T08:00:00Z',
    favoriteProduct: 'Mass Gainer Colossus',
    notes: 'Powerlifter competitivo. Prioritario en lanzamientos y stock limitado.',
    orders: [
      { id: 'ORD-1019', date: '2025-02-17T14:47:00Z', total: 164.96, status: 'procesando', items: 'Mass Gainer ×1, Berserker ×1, BCAA ×2' },
      { id: 'ORD-0995', date: '2024-12-08T11:20:00Z', total: 219.95, status: 'entregado',  items: 'Whey Isolate ×2, Mass Gainer ×2' },
      { id: 'ORD-0970', date: '2024-10-01T09:30:00Z', total: 179.97, status: 'entregado',  items: 'Creatina ×3, Berserker ×2' },
    ],
  },
  {
    id: 'CLI-004', name: 'Ana Fuentes', email: 'ana.fuentes@gmail.com', phone: '+34 600 123 456',
    city: 'Madrid', country: 'España', segment: 'nuevo',
    totalOrders: 1, totalSpent: 64.99, avgOrderValue: 64.99,
    lastPurchase: '2025-02-19T09:05:00Z', registered: '2025-02-19T08:55:00Z',
    favoriteProduct: 'Titan Whey Isolate Elite',
    orders: [
      { id: 'ORD-1018', date: '2025-02-19T09:05:00Z', total: 64.99, status: 'procesando', items: 'Whey Isolate Fresa ×1' },
    ],
  },
  {
    id: 'CLI-005', name: 'Miquel Torres', email: 'miquel.t@protonmail.com', phone: '+34 655 789 012',
    city: 'Barcelona', country: 'España', segment: 'suspendido',
    totalOrders: 3, totalSpent: 174.95, avgOrderValue: 58.32,
    lastPurchase: '2025-02-12T17:30:00Z', registered: '2023-11-20T14:00:00Z',
    favoriteProduct: 'Omega-3 Ultra EPA/DHA',
    notes: 'Suspendido por chargebacks repetidos. Requiere aprobación manual.',
    orders: [
      { id: 'ORD-1017', date: '2025-02-12T17:30:00Z', total: 79.97, status: 'cancelado', items: 'Omega-3 ×2, Creatina ×1' },
      { id: 'ORD-0980', date: '2024-11-01T10:10:00Z', total: 64.99, status: 'cancelado', items: 'Whey Isolate ×1' },
      { id: 'ORD-0944', date: '2024-08-14T15:20:00Z', total: 29.99, status: 'entregado', items: 'Creatina ×1' },
    ],
  },
  {
    id: 'CLI-006', name: 'Sandra Molina', email: 's.molina@hotmail.com', phone: '+34 644 321 098',
    city: 'Sevilla', country: 'España', segment: 'activo',
    totalOrders: 7, totalSpent: 612.83, avgOrderValue: 87.55,
    lastPurchase: '2025-02-08T11:20:00Z', registered: '2023-09-01T10:00:00Z',
    favoriteProduct: 'Berserker Pre-Workout',
    orders: [
      { id: 'ORD-1016', date: '2025-02-08T11:20:00Z', total: 144.97, status: 'entregado', items: 'Berserker ×2, Whey ×1' },
      { id: 'ORD-0985', date: '2024-11-22T09:40:00Z', total: 79.98,  status: 'entregado', items: 'Berserker ×2' },
      { id: 'ORD-0958', date: '2024-09-05T14:00:00Z', total: 124.98, status: 'entregado', items: 'Whey ×1, Creatina ×2' },
    ],
  },
  {
    id: 'CLI-007', name: 'Roberto Herrera', email: 'rob.herrera@gmail.com', phone: '+34 618 456 789',
    city: 'Valencia', country: 'España', segment: 'activo',
    totalOrders: 4, totalSpent: 274.95, avgOrderValue: 68.74,
    lastPurchase: '2025-02-18T16:00:00Z', registered: '2024-01-10T08:30:00Z',
    favoriteProduct: 'Mass Gainer Colossus',
    orders: [
      { id: 'ORD-1015', date: '2025-02-18T16:00:00Z', total: 54.99,  status: 'enviado',   items: 'Mass Gainer Chocolate ×1' },
      { id: 'ORD-0983', date: '2024-11-14T10:30:00Z', total: 54.99,  status: 'entregado', items: 'Mass Gainer Vainilla ×1' },
      { id: 'ORD-0960', date: '2024-09-08T12:00:00Z', total: 109.98, status: 'entregado', items: 'Mass Gainer ×2' },
    ],
  },
  {
    id: 'CLI-008', name: 'Elena Castillo', email: 'elena.castillo@me.com', phone: '+34 666 012 345',
    city: 'Madrid', country: 'España', segment: 'nuevo',
    totalOrders: 1, totalSpent: 44.98, avgOrderValue: 44.98,
    lastPurchase: '2025-02-19T07:45:00Z', registered: '2025-02-18T22:10:00Z',
    favoriteProduct: 'Omega-3 Ultra EPA/DHA',
    orders: [
      { id: 'ORD-1014', date: '2025-02-19T07:45:00Z', total: 44.98, status: 'procesando', items: 'Omega-3 ×1, Vitamina D3 ×1' },
    ],
  },
  {
    id: 'CLI-009', name: 'Javier Morales', email: 'javier.m@gmail.com', phone: '+34 699 876 543',
    city: 'Madrid', country: 'España', segment: 'vip',
    totalOrders: 22, totalSpent: 2340.90, avgOrderValue: 106.40,
    lastPurchase: '2025-02-05T13:10:00Z', registered: '2022-11-15T07:00:00Z',
    favoriteProduct: 'Titan Whey Isolate Elite',
    notes: 'Cliente desde el lanzamiento. Embajador no oficial en su gym. Siempre compra pack completo.',
    orders: [
      { id: 'ORD-1013', date: '2025-02-05T13:10:00Z', total: 254.95, status: 'entregado', items: 'Whey ×3, Creatina ×2' },
      { id: 'ORD-0993', date: '2024-12-01T08:00:00Z', total: 194.96, status: 'entregado', items: 'Whey ×2, Berserker ×2' },
      { id: 'ORD-0965', date: '2024-09-20T11:00:00Z', total: 289.94, status: 'entregado', items: 'Whey ×3, Creatina ×2, Omega-3 ×2' },
    ],
  },
  {
    id: 'CLI-010', name: 'Patricia López', email: 'p.lopez@icloud.com', phone: '+34 622 345 678',
    city: 'Tarragona', country: 'España', segment: 'activo',
    totalOrders: 3, totalSpent: 134.97, avgOrderValue: 44.99,
    lastPurchase: '2025-02-20T08:30:00Z', registered: '2024-06-05T10:15:00Z',
    favoriteProduct: 'Berserker Pre-Workout',
    orders: [
      { id: 'ORD-1012', date: '2025-02-20T08:30:00Z', total: 39.99, status: 'procesando', items: 'Berserker Frambuesa ×1' },
      { id: 'ORD-0971', date: '2024-10-03T09:20:00Z', total: 49.99, status: 'entregado',  items: 'Berserker ×1, Vitamina D3 ×1' },
      { id: 'ORD-0944', date: '2024-08-11T14:00:00Z', total: 44.99, status: 'entregado',  items: 'Creatina ×1, BCAA ×1' },
    ],
  },
  {
    id: 'CLI-011', name: 'Fernando García', email: 'f.garcia@empresa.es', phone: '+34 611 234 567',
    city: 'Zaragoza', country: 'España', segment: 'vip',
    totalOrders: 11, totalSpent: 1098.56, avgOrderValue: 99.87,
    lastPurchase: '2025-02-17T10:15:00Z', registered: '2023-04-22T08:00:00Z',
    favoriteProduct: 'Mass Gainer Colossus',
    notes: 'Compra para equipo de atletismo corporativo. Factura B2B.',
    orders: [
      { id: 'ORD-1011', date: '2025-02-17T10:15:00Z', total: 189.96, status: 'enviado',   items: 'Mass Gainer ×2, Berserker ×2' },
      { id: 'ORD-0991', date: '2024-11-28T15:30:00Z', total: 219.94, status: 'entregado', items: 'Mass Gainer ×4' },
      { id: 'ORD-0963', date: '2024-09-15T09:00:00Z', total: 164.96, status: 'entregado', items: 'Whey ×2, Creatina ×2' },
    ],
  },
  {
    id: 'CLI-012', name: 'Isabel Ruiz', email: 'isabel.ruiz@hotmail.es', phone: '+34 655 678 901',
    city: 'Málaga', country: 'España', segment: 'activo',
    totalOrders: 6, totalSpent: 398.92, avgOrderValue: 66.49,
    lastPurchase: '2025-01-29T15:40:00Z', registered: '2023-12-01T11:00:00Z',
    favoriteProduct: 'Omega-3 Ultra EPA/DHA',
    orders: [
      { id: 'ORD-1010', date: '2025-01-29T15:40:00Z', total: 74.97, status: 'entregado', items: 'Omega-3 ×3' },
      { id: 'ORD-0976', date: '2024-10-18T10:00:00Z', total: 49.98, status: 'entregado', items: 'Omega-3 ×2' },
      { id: 'ORD-0952', date: '2024-08-22T08:30:00Z', total: 94.97, status: 'entregado', items: 'Omega-3 ×2, Vitamina D3 ×1' },
    ],
  },
  {
    id: 'CLI-013', name: 'Marcos Silva', email: 'marcos.s@gmail.com', phone: '+34 633 456 789',
    city: 'Bilbao', country: 'España', segment: 'suspendido',
    totalOrders: 2, totalSpent: 64.98, avgOrderValue: 32.49,
    lastPurchase: '2025-01-25T12:00:00Z', registered: '2024-09-30T16:00:00Z',
    favoriteProduct: 'Titan Whey Isolate Elite',
    notes: 'Dos pedidos cancelados por problemas de pago.',
    orders: [
      { id: 'ORD-1009', date: '2025-01-25T12:00:00Z', total: 104.97, status: 'cancelado', items: 'Whey ×1, Vitamina D3 ×2' },
      { id: 'ORD-0966', date: '2024-09-22T14:00:00Z', total: 64.99,  status: 'cancelado', items: 'Whey Isolate ×1' },
    ],
  },
  {
    id: 'CLI-014', name: 'Carmen Jiménez', email: 'carmen.j@proton.me', phone: '+34 677 234 567',
    city: 'Granada', country: 'España', segment: 'activo',
    totalOrders: 4, totalSpent: 219.95, avgOrderValue: 54.99,
    lastPurchase: '2025-02-19T11:30:00Z', registered: '2024-02-14T10:00:00Z',
    favoriteProduct: 'BCAA 2:1:1 Micronized',
    orders: [
      { id: 'ORD-1008', date: '2025-02-19T11:30:00Z', total: 64.98, status: 'procesando', items: 'BCAA ×1, Creatina ×1' },
      { id: 'ORD-0978', date: '2024-10-25T13:00:00Z', total: 69.98, status: 'entregado',  items: 'BCAA ×2' },
      { id: 'ORD-0950', date: '2024-08-19T11:20:00Z', total: 49.99, status: 'entregado',  items: 'BCAA ×1, Vitamina D3 ×1' },
    ],
  },
  {
    id: 'CLI-015', name: 'Pablo Navarro', email: 'p.navarro@outlook.com', phone: '+34 600 789 012',
    city: 'Valencia', country: 'España', segment: 'activo',
    totalOrders: 8, totalSpent: 639.92, avgOrderValue: 79.99,
    lastPurchase: '2025-01-18T09:00:00Z', registered: '2023-07-07T07:00:00Z',
    favoriteProduct: 'Berserker Pre-Workout',
    orders: [
      { id: 'ORD-1007', date: '2025-01-18T09:00:00Z', total: 119.97, status: 'entregado', items: 'Berserker ×3' },
      { id: 'ORD-0982', date: '2024-11-12T14:30:00Z', total: 79.98,  status: 'entregado', items: 'Berserker ×2' },
      { id: 'ORD-0956', date: '2024-09-01T10:00:00Z', total: 119.97, status: 'entregado', items: 'Berserker ×3' },
    ],
  },
  {
    id: 'CLI-016', name: 'Lucía Martín', email: 'lucia.martin@gmail.com', phone: '+34 644 567 890',
    city: 'Palma', country: 'España', segment: 'activo',
    totalOrders: 5, totalSpent: 469.85, avgOrderValue: 93.97,
    lastPurchase: '2025-02-16T14:20:00Z', registered: '2023-10-10T09:30:00Z',
    favoriteProduct: 'Titan Whey Isolate Elite',
    orders: [
      { id: 'ORD-1006', date: '2025-02-16T14:20:00Z', total: 154.97, status: 'enviado',   items: 'Whey ×2, Omega-3 ×1' },
      { id: 'ORD-0988', date: '2024-11-28T08:00:00Z', total: 129.98, status: 'entregado', items: 'Whey ×2' },
      { id: 'ORD-0962', date: '2024-09-12T12:00:00Z', total: 94.98,  status: 'entregado', items: 'Whey ×1, Omega-3 ×2' },
    ],
  },
  {
    id: 'CLI-017', name: 'Álvaro Pérez', email: 'a.perez@empresa.com', phone: '+34 611 890 123',
    city: 'Madrid', country: 'España', segment: 'nuevo',
    totalOrders: 1, totalSpent: 179.96, avgOrderValue: 179.96,
    lastPurchase: '2025-02-20T07:00:00Z', registered: '2025-02-20T06:50:00Z',
    favoriteProduct: 'Mass Gainer Colossus',
    orders: [
      { id: 'ORD-1005', date: '2025-02-20T07:00:00Z', total: 179.96, status: 'procesando', items: 'Mass Gainer ×1, Whey ×1, Creatina ×2' },
    ],
  },
  {
    id: 'CLI-018', name: 'Natalia Gómez', email: 'natalia.g@icloud.com', phone: '+34 666 345 678',
    city: 'Barcelona', country: 'España', segment: 'activo',
    totalOrders: 9, totalSpent: 519.84, avgOrderValue: 57.76,
    lastPurchase: '2025-01-10T10:00:00Z', registered: '2023-05-15T11:00:00Z',
    favoriteProduct: 'Vitamina D3 + K2 5000 UI',
    orders: [
      { id: 'ORD-1004', date: '2025-01-10T10:00:00Z', total: 79.96, status: 'entregado', items: 'Vitamina D3 ×4' },
      { id: 'ORD-0975', date: '2024-10-14T09:00:00Z', total: 59.97, status: 'entregado', items: 'Vitamina D3 ×3' },
      { id: 'ORD-0949', date: '2024-08-18T10:00:00Z', total: 79.96, status: 'entregado', items: 'Vitamina D3 ×4' },
    ],
  },
  {
    id: 'CLI-019', name: 'Raúl Domínguez', email: 'raul.d@hotmail.com', phone: '+34 633 112 233',
    city: 'Alicante', country: 'España', segment: 'nuevo',
    totalOrders: 1, totalSpent: 39.99, avgOrderValue: 39.99,
    lastPurchase: '2025-02-20T10:15:00Z', registered: '2025-02-20T10:00:00Z',
    favoriteProduct: 'Berserker Pre-Workout',
    orders: [
      { id: 'ORD-1022', date: '2025-02-20T10:15:00Z', total: 39.99, status: 'procesando', items: 'Berserker Sandía ×1' },
    ],
  },
  {
    id: 'CLI-020', name: 'Sofía Blanco', email: 'sofia.b@gmail.com', phone: '+34 655 443 221',
    city: 'San Sebastián', country: 'España', segment: 'vip',
    totalOrders: 16, totalSpent: 1524.80, avgOrderValue: 95.30,
    lastPurchase: '2025-02-13T08:45:00Z', registered: '2022-12-01T10:00:00Z',
    favoriteProduct: 'Titan Whey Isolate Elite',
    notes: 'Atleta de crossfit con patrocinio de la marca. Recibe 15% de descuento permanente.',
    orders: [
      { id: 'ORD-1023', date: '2025-02-13T08:45:00Z', total: 214.95, status: 'entregado', items: 'Whey ×2, Creatina ×2, BCAA ×1' },
      { id: 'ORD-0997', date: '2024-12-18T11:00:00Z', total: 189.97, status: 'entregado', items: 'Whey ×2, Berserker ×1' },
      { id: 'ORD-0969', date: '2024-09-30T09:30:00Z', total: 159.97, status: 'entregado', items: 'Whey ×2, Creatina ×1' },
    ],
  },
];
