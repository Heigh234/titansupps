import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

// TODO: Reemplazar con fetch a la API cuando el backend esté listo.
const METRICS = [
  { title: 'Ventas Totales',    value: '—',  change: '—', isPositive: true,  icon: DollarSign },
  { title: 'Pedidos Hoy',      value: '—',  change: '—', isPositive: true,  icon: ShoppingCart },
  { title: 'Productos Activos', value: '—', change: '—', isPositive: false, icon: Package },
  { title: 'Nuevos Clientes',  value: '—',  change: '—', isPositive: true,  icon: Users },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-heading text-3xl uppercase text-titan-text tracking-wider">Métricas Generales</h2>
          <p className="text-titan-text-muted text-sm mt-1">Resumen del rendimiento de los últimos 30 días.</p>
        </div>
      </div>

      {/* GRID DE MÉTRICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((metric, idx) => (
          <div key={idx} className="bg-titan-surface border border-titan-border p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-titan-bg border border-titan-border text-titan-accent">
                <metric.icon size={20} />
              </div>
              <span className="text-xs font-bold px-2 py-1 text-titan-text-muted bg-titan-surface-hover">
                {metric.change}
              </span>
            </div>
            <div>
              <p className="text-titan-text-muted text-xs uppercase tracking-widest font-bold mb-1">{metric.title}</p>
              <p className="font-heading text-4xl text-titan-text">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PLACEHOLDER PARA GRÁFICOS Y ÓRDENES RECIENTES */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-titan-surface border border-titan-border p-6 min-h-[400px] flex flex-col">
          <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text mb-6">Ingresos (Últimos 7 días)</h3>
          <div className="flex-1 border border-dashed border-titan-border flex items-center justify-center text-titan-text-muted text-sm">
            [Gráfico de Área — conectar con API]
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-titan-surface border border-titan-border p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text">Pedidos Recientes</h3>
            <a href="/admin/orders" className="text-xs text-titan-accent uppercase tracking-widest hover:text-white transition-colors">Ver todos</a>
          </div>
          <div className="flex-1 border border-dashed border-titan-border flex items-center justify-center text-titan-text-muted text-sm">
            [Conectar con API de pedidos]
          </div>
        </div>

      </div>
    </div>
  );
}
