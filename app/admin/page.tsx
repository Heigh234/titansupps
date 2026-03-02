import { ArrowUpRight, ArrowDownRight, DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

const METRICS = [
  { title: "Ventas Totales", value: "$42,500", change: "+12.5%", isPositive: true, icon: DollarSign },
  { title: "Pedidos Hoy", value: "142", change: "+5.2%", isPositive: true, icon: ShoppingCart },
  { title: "Productos Activos", value: "86", change: "-2.1%", isPositive: false, icon: Package },
  { title: "Nuevos Clientes", value: "1,240", change: "+18.0%", isPositive: true, icon: Users },
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
              <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 ${metric.isPositive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                {metric.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
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
            [Gráfico de Área con Recharts / Chart.js iría aquí]
          </div>
        </div>

        {/* Recent Orders Mini-table */}
        <div className="bg-titan-surface border border-titan-border p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading text-xl uppercase tracking-wider text-titan-text">Pedidos Recientes</h3>
            <a href="/admin/orders" className="text-xs text-titan-accent uppercase tracking-widest hover:text-white transition-colors">Ver todos</a>
          </div>
          
          <div className="space-y-4 flex-1">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex justify-between items-center pb-4 border-b border-titan-border last:border-0">
                <div>
                  <p className="text-sm font-bold text-titan-text">ORD-{1000 + order}</p>
                  <p className="text-xs text-titan-text-muted">Hace 2 horas</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-titan-accent">$129.99</p>
                  <span className="text-[10px] uppercase px-2 py-0.5 bg-yellow-500/10 text-yellow-500 font-bold">Pendiente</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}