/**
 * app/admin/orders/data.ts
 *
 * Datos y configuración del módulo de Gestión de Pedidos.
 *
 * Exporta:
 *   MOCK_ORDERS    → 18 pedidos con variedad de estados, fechas y montos reales.
 *                    En producción se reemplaza por fetch/useQuery al endpoint de pedidos.
 *   PAGE_SIZE      → Pedidos por página en la tabla.
 *   STATUS_CONFIG  → Colores, iconos y etiquetas de cada estado de pedido.
 *   ALL_STATUSES   → Array tipado de todos los estados (para iteración).
 */

import {
  Clock, RefreshCw, Truck, CheckCircle, XCircle,
} from 'lucide-react';
import type { Order, OrderStatus } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────────────────────

export const PAGE_SIZE = 8;

// ─────────────────────────────────────────────────────────────────────────────
// STATUS CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const STATUS_CONFIG: Record<OrderStatus, {
  label:  string;
  color:  string;
  bg:     string;
  border: string;
  icon:   React.ElementType;
}> = {
  pendiente:  { label: 'Pendiente',  color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', icon: Clock       },
  procesando: { label: 'Procesando', color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/30',   icon: RefreshCw   },
  enviado:    { label: 'Enviado',    color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', icon: Truck       },
  entregado:  { label: 'Entregado',  color: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/30',  icon: CheckCircle },
  cancelado:  { label: 'Cancelado',  color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/30',    icon: XCircle     },
};

export const ALL_STATUSES = Object.keys(STATUS_CONFIG) as OrderStatus[];

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — 18 pedidos con variedad de estados, fechas y montos reales.
// En producción: reemplazar por fetch/useQuery al endpoint de pedidos.
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-1021',
    customer: { name: 'Carlos Mendoza', email: 'carlos.m@gmail.com', phone: '+34 612 345 678' },
    address: { street: 'Av. Diagonal 421, 3°B', city: 'Barcelona', country: 'España' },
    items: [
      { id: 'p1', name: 'Titan Whey Isolate Elite', variant: 'Chocolate Suizo',   qty: 2, price: 64.99, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=80&q=80' },
      { id: 'p5', name: 'Creatina Monohidratada',   variant: 'Sin sabor 500g',   qty: 1, price: 29.99, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&q=80' },
    ],
    total: 159.97, status: 'entregado', paymentMethod: 'Visa •••• 4242',
    date: '2025-02-14T10:32:00Z', trackingCode: 'GLS-ES-884921',
    notes: 'Entregar en horario de mañana.',
  },
  {
    id: 'ORD-1020',
    customer: { name: 'Laura Vidal', email: 'laura.vidal@icloud.com', phone: '+34 633 211 444' },
    address: { street: 'Calle Mayor 12', city: 'Madrid', country: 'España' },
    items: [
      { id: 'p2', name: 'Berserker Pre-Workout', variant: 'Sandía Explosiva', qty: 1, price: 39.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=80&q=80' },
    ],
    total: 39.99, status: 'enviado', paymentMethod: 'PayPal',
    date: '2025-02-16T08:15:00Z', trackingCode: 'SEUR-20254488123',
  },
  {
    id: 'ORD-1019',
    customer: { name: 'Diego Romero', email: 'd.romero@outlook.es', phone: '+34 677 891 234' },
    address: { street: 'Paseo de Gracia 88, Ático', city: 'Barcelona', country: 'España' },
    items: [
      { id: 'p3', name: 'Mass Gainer Colossus',  variant: 'Vainilla Bourbon 5kg', qty: 1, price: 54.99, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&q=80' },
      { id: 'p2', name: 'Berserker Pre-Workout', variant: 'Frambuesa Azul',       qty: 1, price: 39.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=80&q=80' },
      { id: 'p5', name: 'BCAA 2:1:1 Micronized', variant: 'Naranja',             qty: 2, price: 34.99, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&q=80' },
    ],
    total: 164.96, status: 'procesando', paymentMethod: 'Mastercard •••• 8831',
    date: '2025-02-17T14:47:00Z',
  },
  {
    id: 'ORD-1018',
    customer: { name: 'Ana Fuentes', email: 'ana.fuentes@gmail.com', phone: '+34 600 123 456' },
    address: { street: 'Ronda de Atocha 7, 2°C', city: 'Madrid', country: 'España' },
    items: [
      { id: 'p1', name: 'Titan Whey Isolate Elite', variant: 'Fresa Salvaje', qty: 1, price: 64.99, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=80&q=80' },
    ],
    total: 64.99, status: 'pendiente', paymentMethod: 'Transferencia',
    date: '2025-02-19T09:05:00Z',
  },
  {
    id: 'ORD-1017',
    customer: { name: 'Miquel Torres', email: 'miquel.t@protonmail.com', phone: '+34 655 789 012' },
    address: { street: 'Carrer de Balmes 200, Entl.', city: 'Barcelona', country: 'España' },
    items: [
      { id: 'p6', name: 'Omega-3 Ultra EPA/DHA',  variant: '120 cápsulas',  qty: 2, price: 24.99, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=80&q=80' },
      { id: 'p5', name: 'Creatina Monohidratada', variant: 'Sin sabor 500g', qty: 1, price: 29.99, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&q=80' },
    ],
    total: 79.97, status: 'cancelado', paymentMethod: 'Visa •••• 9910',
    date: '2025-02-12T17:30:00Z',
    notes: 'Cliente solicitó cancelación por error de dirección.',
  },
  {
    id: 'ORD-1016',
    customer: { name: 'Sandra Molina', email: 's.molina@hotmail.com', phone: '+34 644 321 098' },
    address: { street: 'Calle Sierpes 45', city: 'Sevilla', country: 'España' },
    items: [
      { id: 'p2', name: 'Berserker Pre-Workout',    variant: 'Sandía Explosiva', qty: 2, price: 39.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=80&q=80' },
      { id: 'p1', name: 'Titan Whey Isolate Elite', variant: 'Chocolate Suizo',  qty: 1, price: 64.99, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=80&q=80' },
    ],
    total: 144.97, status: 'entregado', paymentMethod: 'PayPal',
    date: '2025-02-08T11:20:00Z', trackingCode: 'GLS-ES-774810',
  },
  {
    id: 'ORD-1015',
    customer: { name: 'Roberto Herrera', email: 'rob.herrera@gmail.com', phone: '+34 618 456 789' },
    address: { street: 'Avenida Constitución 3', city: 'Valencia', country: 'España' },
    items: [
      { id: 'p3', name: 'Mass Gainer Colossus', variant: 'Chocolate Intenso 5kg', qty: 1, price: 54.99, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&q=80' },
    ],
    total: 54.99, status: 'enviado', paymentMethod: 'Visa •••• 1337',
    date: '2025-02-18T16:00:00Z', trackingCode: 'SEUR-20254491777',
  },
  {
    id: 'ORD-1014',
    customer: { name: 'Elena Castillo', email: 'elena.castillo@me.com', phone: '+34 666 012 345' },
    address: { street: 'Calle Goya 80, 5°A', city: 'Madrid', country: 'España' },
    items: [
      { id: 'p6', name: 'Omega-3 Ultra EPA/DHA',    variant: '120 cápsulas', qty: 1, price: 24.99, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=80&q=80' },
      { id: 'p7', name: 'Vitamina D3 + K2 5000 UI', variant: '60 cápsulas',  qty: 1, price: 19.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&q=80' },
    ],
    total: 44.98, status: 'procesando', paymentMethod: 'Mastercard •••• 5544',
    date: '2025-02-19T07:45:00Z',
  },
  {
    id: 'ORD-1013',
    customer: { name: 'Javier Morales', email: 'javier.m@gmail.com', phone: '+34 699 876 543' },
    address: { street: 'Gran Via 41, 7°', city: 'Madrid', country: 'España' },
    items: [
      { id: 'p1', name: 'Titan Whey Isolate Elite', variant: 'Vainilla Bourbon',  qty: 3, price: 64.99, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=80&q=80' },
      { id: 'p5', name: 'Creatina Monohidratada',   variant: 'Sin sabor 500g',   qty: 2, price: 29.99, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&q=80' },
    ],
    total: 254.95, status: 'entregado', paymentMethod: 'Visa •••• 7788',
    date: '2025-02-05T13:10:00Z', trackingCode: 'GLS-ES-661233',
  },
  {
    id: 'ORD-1012',
    customer: { name: 'Patricia López', email: 'p.lopez@icloud.com', phone: '+34 622 345 678' },
    address: { street: 'Rambla Nova 88', city: 'Tarragona', country: 'España' },
    items: [
      { id: 'p2', name: 'Berserker Pre-Workout', variant: 'Frambuesa Azul', qty: 1, price: 39.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=80&q=80' },
    ],
    total: 39.99, status: 'pendiente', paymentMethod: 'Transferencia',
    date: '2025-02-20T08:30:00Z',
  },
  {
    id: 'ORD-1011',
    customer: { name: 'Fernando García', email: 'f.garcia@empresa.es', phone: '+34 611 234 567' },
    address: { street: 'Parque Empresarial, Edif. C', city: 'Zaragoza', country: 'España' },
    items: [
      { id: 'p3', name: 'Mass Gainer Colossus',  variant: 'Vainilla 5kg',     qty: 2, price: 54.99, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&q=80' },
      { id: 'p2', name: 'Berserker Pre-Workout', variant: 'Sandía Explosiva', qty: 2, price: 39.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=80&q=80' },
    ],
    total: 189.96, status: 'enviado', paymentMethod: 'Mastercard •••• 2233',
    date: '2025-02-17T10:15:00Z', trackingCode: 'SEUR-20254489990',
  },
  {
    id: 'ORD-1010',
    customer: { name: 'Isabel Ruiz', email: 'isabel.ruiz@hotmail.es', phone: '+34 655 678 901' },
    address: { street: 'Calle Real 12', city: 'Málaga', country: 'España' },
    items: [
      { id: 'p6', name: 'Omega-3 Ultra EPA/DHA', variant: '120 cápsulas', qty: 3, price: 24.99, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=80&q=80' },
    ],
    total: 74.97, status: 'entregado', paymentMethod: 'PayPal',
    date: '2025-01-29T15:40:00Z', trackingCode: 'GLS-ES-559810',
  },
  {
    id: 'ORD-1009',
    customer: { name: 'Marcos Silva', email: 'marcos.s@gmail.com', phone: '+34 633 456 789' },
    address: { street: 'Avenida de la Libertad 55', city: 'Bilbao', country: 'España' },
    items: [
      { id: 'p1', name: 'Titan Whey Isolate Elite', variant: 'Chocolate Suizo', qty: 1, price: 64.99, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=80&q=80' },
      { id: 'p7', name: 'Vitamina D3 + K2 5000 UI', variant: '60 cápsulas',    qty: 2, price: 19.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&q=80' },
    ],
    total: 104.97, status: 'cancelado', paymentMethod: 'Visa •••• 3344',
    date: '2025-01-25T12:00:00Z',
    notes: 'Cancelado por duplicado de pedido.',
  },
  {
    id: 'ORD-1008',
    customer: { name: 'Carmen Jiménez', email: 'carmen.j@proton.me', phone: '+34 677 234 567' },
    address: { street: 'Plaza España 1, 2°A', city: 'Granada', country: 'España' },
    items: [
      { id: 'p5', name: 'BCAA 2:1:1 Micronized',  variant: 'Naranja',         qty: 1, price: 34.99, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&q=80' },
      { id: 'p5', name: 'Creatina Monohidratada', variant: 'Sin sabor 500g',  qty: 1, price: 29.99, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&q=80' },
    ],
    total: 64.98, status: 'procesando', paymentMethod: 'Mastercard •••• 6677',
    date: '2025-02-19T11:30:00Z',
  },
  {
    id: 'ORD-1007',
    customer: { name: 'Pablo Navarro', email: 'p.navarro@outlook.com', phone: '+34 600 789 012' },
    address: { street: 'Calle Colón 18', city: 'Valencia', country: 'España' },
    items: [
      { id: 'p2', name: 'Berserker Pre-Workout', variant: 'Sandía Explosiva', qty: 3, price: 39.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=80&q=80' },
    ],
    total: 119.97, status: 'entregado', paymentMethod: 'PayPal',
    date: '2025-01-18T09:00:00Z', trackingCode: 'GLS-ES-447720',
  },
  {
    id: 'ORD-1006',
    customer: { name: 'Lucía Martín', email: 'lucia.martin@gmail.com', phone: '+34 644 567 890' },
    address: { street: 'Paseo Marítimo 77', city: 'Palma', country: 'España' },
    items: [
      { id: 'p1', name: 'Titan Whey Isolate Elite', variant: 'Fresa Salvaje',   qty: 2, price: 64.99, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=80&q=80' },
      { id: 'p6', name: 'Omega-3 Ultra EPA/DHA',    variant: '120 cápsulas',    qty: 1, price: 24.99, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=80&q=80' },
    ],
    total: 154.97, status: 'enviado', paymentMethod: 'Visa •••• 8899',
    date: '2025-02-16T14:20:00Z', trackingCode: 'SEUR-20254487654',
  },
  {
    id: 'ORD-1005',
    customer: { name: 'Álvaro Pérez', email: 'a.perez@empresa.com', phone: '+34 611 890 123' },
    address: { street: 'Calle Alcalá 200', city: 'Madrid', country: 'España' },
    items: [
      { id: 'p3', name: 'Mass Gainer Colossus',    variant: 'Chocolate Intenso 5kg', qty: 1, price: 54.99, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&q=80' },
      { id: 'p1', name: 'Titan Whey Isolate Elite', variant: 'Vainilla Bourbon',     qty: 1, price: 64.99, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=80&q=80' },
      { id: 'p5', name: 'Creatina Monohidratada',  variant: 'Sin sabor 500g',       qty: 2, price: 29.99, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&q=80' },
    ],
    total: 179.96, status: 'pendiente', paymentMethod: 'Transferencia',
    date: '2025-02-20T07:00:00Z',
  },
  {
    id: 'ORD-1004',
    customer: { name: 'Natalia Gómez', email: 'natalia.g@icloud.com', phone: '+34 666 345 678' },
    address: { street: 'Av. Meridiana 300, 4°', city: 'Barcelona', country: 'España' },
    items: [
      { id: 'p7', name: 'Vitamina D3 + K2 5000 UI', variant: '60 cápsulas', qty: 4, price: 19.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&q=80' },
    ],
    total: 79.96, status: 'entregado', paymentMethod: 'Mastercard •••• 1122',
    date: '2025-01-10T10:00:00Z', trackingCode: 'GLS-ES-330019',
  },
];
