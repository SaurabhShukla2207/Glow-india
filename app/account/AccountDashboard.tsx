'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Phone, User, Package, Calendar, Settings, Heart, LogOut } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'

export function AccountDashboard({ userProfile }: { userProfile: any }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }
  
  // Local state for the address book
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    phone: userProfile.phone || '',
    address: userProfile.address || '',
    city: userProfile.city || '',
    state: userProfile.state || '',
    pincode: userProfile.pincode || '',
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setIsEditing(false)
      } else {
        alert('Failed to save profile.')
      }
    } catch {
      alert('Network error')
    }
    setSaving(false)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      
      {/* Sidebar Navigation */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center border-4 border-white shadow-md">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white capitalize">{userProfile.name || 'Glow Customer'}</h3>
            <p className="text-sm text-slate-500 font-mono mt-1">{userProfile.email}</p>
          </div>
        </div>

        <nav className="flex flex-col space-y-2 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all border-0 cursor-pointer ${activeTab === 'profile' ? 'bg-sky-50 text-sky-600 font-bold' : 'bg-transparent text-slate-600 hover:bg-slate-50'}`}
          >
            <Settings className="w-5 h-5" />
            <span>Shipping Profile</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all border-0 cursor-pointer ${activeTab === 'orders' ? 'bg-sky-50 text-sky-600 font-bold' : 'bg-transparent text-slate-600 hover:bg-slate-50'}`}
          >
            <Package className="w-5 h-5" />
            <span>Order History</span>
          </button>
          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all border-0 cursor-pointer ${activeTab === 'wishlist' ? 'bg-sky-50 text-sky-600 font-bold' : 'bg-transparent text-slate-600 hover:bg-slate-50'}`}
          >
            <Heart className="w-5 h-5" />
            <span>Saved Wishlist</span>
          </button>

          <div className="mt-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all border-0 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-bold">{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="md:col-span-3">
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 space-y-8">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold font-headline text-slate-800 flex items-center gap-2">
                <MapPin className="text-sky-500" />
                Shipping Addresses
              </h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:scale-105 transition-transform border-0 cursor-pointer"
              >
                {isEditing ? 'Cancel' : '+ New Address'}
              </button>
            </div>

            {/* Existing Address List */}
            {!isEditing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.addresses?.length === 0 ? (
                   <div className="md:col-span-2 p-8 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
                      <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-slate-500 font-bold mb-4">No shipping addresses configured.</p>
                      <button onClick={() => setIsEditing(true)} className="text-sky-600 font-bold hover:underline cursor-pointer">Add your first address</button>
                   </div>
                ) : (
                  userProfile.addresses.map((addr: any) => (
                    <div key={addr.id} className={`p-5 rounded-xl border-2 relative transition-all ${addr.isDefault ? 'border-sky-500 bg-sky-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      {addr.isDefault && (
                        <div className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-xl rounded-tr-xl">
                          Default Pin
                        </div>
                      )}
                      <h4 className="font-bold text-slate-900 leading-tight">{addr.name}</h4>
                      <p className="text-sm text-slate-500 tracking-tight font-mono mb-2">{addr.phone}</p>
                      <p className="text-sm text-slate-700 leading-relaxed max-w-[90%]">{addr.street}<br/>{addr.city}, {addr.state} {addr.pincode}</p>
                      
                      <div className="mt-4 flex gap-4">
                        {!addr.isDefault && (
                          <button 
                            onClick={async () => {
                              await fetch('/api/address', { method: 'POST', body: JSON.stringify({ action: 'PIN', addressId: addr.id })})
                              window.location.reload()
                            }}
                            className="text-xs font-bold text-sky-600 hover:text-sky-800 uppercase tracking-widest cursor-pointer group flex items-center gap-1"
                          >
                           Pin as Default
                          </button>
                        )}
                        <button 
                           onClick={async () => {
                              await fetch('/api/address', { method: 'DELETE', body: JSON.stringify({ addressId: addr.id })})
                              window.location.reload()
                           }}
                           className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* New Address Form */}
            {isEditing && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-6">Add New Shipping Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Recipient Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Contact Phone</label>
                    <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 outline-none" />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Street Address</label>
                    <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-3 min-h-[80px] focus:ring-2 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">City</label>
                    <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">State</label>
                    <input type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 outline-none" />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Pincode</label>
                    <input type="text" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 outline-none" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                   <button 
                    onClick={async () => {
                      setSaving(true)
                      await fetch('/api/address', { method: 'POST', body: JSON.stringify({...formData, street: formData.address}) })
                      setSaving(false)
                      window.location.reload()
                    }}
                    className="bg-sky-500 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-md hover:bg-sky-600 transition-colors border-0 cursor-pointer disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? 'Writing...' : 'Save Configuration'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-xl font-bold font-headline text-slate-800 mb-6 flex items-center gap-2">
              <Package className="text-sky-500" />
              Past Activity
            </h2>

            {userProfile.orders.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                <Package className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-800">No sterile deliveries yet.</h3>
                <p className="text-slate-500 mt-2">Explore our scientific collection to secure your first order.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {userProfile.orders.map((order: any) => (
                  <div key={order.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-100 pb-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
                          <Calendar className="w-4 h-4 cursor-auto" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <p className="text-sm text-slate-500 select-all font-mono">Order: {order.id}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' : 'bg-primary-container text-primary'}`}>
                          {order.status}
                        </span>
                        <p className="text-lg font-bold text-slate-900 mt-2">₹{order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <div className="relative w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                             {item.product.imageUrl && <Image fill alt={item.product.name} src={item.product.imageUrl} className="object-cover" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm">{item.product.name}</h4>
                            <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-xl font-bold font-headline text-slate-800 mb-6 flex items-center gap-2">
              <Heart className="text-pink-500" />
              Saved Intelligence
            </h2>
            
            {!userProfile.wishlists || userProfile.wishlists.length === 0 ? (
               <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                  <Heart className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-800">Your wishlist is currently empty.</h3>
                  <p className="text-slate-500 mt-2">Save premium setups here for later execution.</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {userProfile.wishlists.map((wItem: any) => (
                    <div key={wItem.id} className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-4 group hover:shadow-lg transition-shadow">
                       <div className="aspect-square bg-slate-50 rounded-xl relative overflow-hidden border border-slate-100">
                          {wItem.product?.imageUrl && (
                            <Image fill alt={wItem.product.name} src={wItem.product.imageUrl} className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform" />
                          )}
                          <button 
                             onClick={async () => {
                                await fetch('/api/wishlist', { method: 'DELETE', body: JSON.stringify({ productId: wItem.productId })})
                                window.location.reload()
                             }}
                             className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-pink-500 hover:scale-110 cursor-pointer border border-pink-100"
                          >
                             <Heart className="w-4 h-4 fill-pink-500" />
                          </button>
                       </div>
                       <div>
                         <h4 className="font-bold text-slate-900 leading-tight line-clamp-1">{wItem.product?.name}</h4>
                         <span className="text-sky-500 font-extrabold text-lg tracking-tight">₹{wItem.product?.price}</span>
                       </div>
                    </div>
                 ))}
               </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
