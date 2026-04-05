import { prisma } from '@/lib/prisma'
import { Package, TrendingUp, AlertTriangle, IndianRupee, Activity } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // 1. Calculate Gross Revenue Algorithmically
  const revenueObj = await prisma.order.aggregate({
    _sum: { total: true },
    where: { status: { not: 'CANCELLED' } }
  })
  const grossRevenue = revenueObj._sum.total || 0

  // 2. Calculate Daily Order Velocity
  const startOfDay = new Date()
  startOfDay.setHours(0,0,0,0)
  
  const dailyOrders = await prisma.order.count({
    where: { createdAt: { gte: startOfDay } }
  })

  // 3. Extract Inventory Intelligence (Stock < 5)
  const lowStockProducts = await prisma.product.findMany({
    where: { stockQty: { lt: 10 } },
    orderBy: { stockQty: 'asc' }
  })

  // 4. Extract recent 5 orders for activity view
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 pt-24 pb-20 font-body">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
         
         <div className="flex justify-between items-end mb-12 border-b border-slate-800 pb-6">
            <div>
               <h1 className="text-4xl font-headline font-extrabold text-white">Command Center</h1>
               <p className="text-slate-500 mt-2 font-mono text-sm tracking-widest uppercase">Glow India Intelligence Division</p>
            </div>
            <Link href="/" className="px-6 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-bold rounded-xl transition-colors">
               Return to Store
            </Link>
         </div>

         {/* KPI Metrics */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><IndianRupee className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs">Gross Revenue</h3>
               </div>
               <p className="text-4xl font-headline font-black text-white">₹{grossRevenue.toLocaleString()}</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl"></div>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl"><TrendingUp className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs">Daily Velocity</h3>
               </div>
               <p className="text-4xl font-headline font-black text-white">{dailyOrders} <span className="text-sm font-normal text-slate-500">Orders Today</span></p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl"></div>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl"><Activity className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs">Critical Alerts</h3>
               </div>
               <p className="text-4xl font-headline font-black text-white">{lowStockProducts.length}</p>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inventory Alerts Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
               <h3 className="text-xl font-bold font-headline text-white mb-6 flex items-center gap-2">
                  <AlertTriangle className="text-amber-500" />
                  Inventory Action Required
               </h3>
               
               {lowStockProducts.length === 0 ? (
                  <div className="p-6 border border-dashed border-slate-800 rounded-xl text-center text-slate-500">
                     No critical shortages detected.
                  </div>
               ) : (
                  <div className="space-y-4">
                     {lowStockProducts.map(p => (
                        <div key={p.id} className="flex justify-between items-center p-4 bg-slate-950 border border-slate-800 rounded-xl">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-800">
                                 <img src={p.imageUrl || ''} alt={p.name} className="w-full h-full object-cover grayscale opacity-80" />
                              </div>
                              <div>
                                 <p className="font-bold text-white text-sm">{p.name}</p>
                                 <p className="text-xs text-slate-500 font-mono">{p.id.substring(0,8)}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${p.stockQty === 0 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                                 {p.stockQty} Left
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            {/* Recent Live Orders */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
               <h3 className="text-xl font-bold font-headline text-white mb-6 flex items-center gap-2">
                  <Package className="text-sky-500" />
                  Live Order Stream
               </h3>

               {recentOrders.length === 0 ? (
                  <div className="p-6 border border-dashed border-slate-800 rounded-xl text-center text-slate-500">
                     Awaiting transmissions.
                  </div>
               ) : (
                  <div className="space-y-4">
                     {recentOrders.map(o => (
                        <div key={o.id} className="p-4 bg-slate-950 border border-slate-800 flex justify-between items-center rounded-xl">
                           <div>
                              <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-1">
                                 {new Date(o.createdAt).toLocaleTimeString()}
                              </p>
                              <p className="font-bold text-white text-sm">{o.shippingName || o.user?.email}</p>
                           </div>
                           <div className="text-right">
                              <span className="text-emerald-400 font-mono font-bold text-sm block">₹{o.total}</span>
                              <span className="text-[10px] text-slate-500 uppercase tracking-widest">{o.status}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>

      </div>
    </div>
  )
}
