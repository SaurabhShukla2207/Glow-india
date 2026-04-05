'use client'

import { useCartStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const items = useCartStore((s) => s.items)
  const closeCart = useCartStore((s) => s.closeCart)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)

  const [isSuccess, setIsSuccess] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [user, setUser] = useState<any>(null)

  const subtotal = items.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [isOpen]) // Re-check when drawer opens

  const handleCheckout = () => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    setIsCheckingOut(true)
    fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ items }),
      headers: { 'Content-Type': 'application/json' }
    }).then(async res => {
      const data = await res.json()
      
      if(res.ok) {
        setIsCheckingOut(false)
        setIsSuccess(true)
        clearCart()
      } else if (data.redirect_to_account) {
        // Amazon Profile Verification Hook
        setIsCheckingOut(false)
        window.location.href = '/account'
      } else {
        alert(data.error || 'Checkout failed')
        setIsCheckingOut(false)
      }
    }).catch(() => setIsCheckingOut(false))
  }

  const handleClose = () => {
    closeCart()
    setTimeout(() => setIsSuccess(false), 300)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[55] transition-opacity" 
          onClick={handleClose} 
        />
      )}

      {/* Side Panel */}
      <aside 
        className={`fixed right-0 top-0 h-screen w-full sm:w-96 z-[60] bg-white/70 backdrop-blur-2xl shadow-2xl shadow-sky-500/10 flex flex-col p-6 space-y-6 transform transition-transform duration-500 rounded-l-3xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-lg font-bold text-slate-900">Your Selection</h2>
            <p className="text-slate-500 text-xs">Clinical Precision Care</p>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 p-2 border-0 bg-transparent cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {items.length === 0 && !isSuccess && (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400 space-y-2">
              <span className="material-symbols-outlined text-4xl">shopping_cart</span>
              <p className="text-sm">Your sterile cart is empty.</p>
            </div>
          )}

          {items.map((item) => (
            <div key={`${item.id}-${item.isSubscription}`} className="flex gap-4 bg-slate-50/50 p-3 rounded-2xl group transition-all duration-200 hover:scale-[1.02]">
              <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/30">
                <Image fill alt={item.name} className="object-cover" src={item.imageUrl} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm text-slate-900 leading-tight">{item.name}</h4>
                  <button onClick={() => removeItem(item.id, item.isSubscription)} className="text-slate-400 hover:text-red-500 ml-2 border-0 bg-transparent cursor-pointer">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">{item.isSubscription ? 'Monthly Refill' : 'One-time Purchase'}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-primary text-sm">₹{item.finalPrice}</span>
                  <div className="flex items-center space-x-3 bg-white rounded-md px-2 py-1 border border-slate-200">
                    <span 
                      className="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary transition-colors select-none"
                      onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity - 1)}
                    >remove</span>
                    <span className="text-xs font-bold w-4 text-center select-none">{item.quantity}</span>
                    <span 
                      className="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary transition-colors select-none"
                      onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity + 1)}
                    >add</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Checkout Steps Indicator */}
          {!isSuccess && items.length > 0 && (
            <div className="py-6 space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl shadow-lg border border-primary/20">
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className="text-sm font-bold tracking-wide">Cart Selection</span>
              </div>
              <div className="flex items-center space-x-4 p-3 text-slate-500 bg-white rounded-xl border border-slate-100 opacity-60">
                <span className="material-symbols-outlined">payments</span>
                <span className="text-sm font-bold tracking-wide">Secure Payment</span>
              </div>
            </div>
          )}

          {/* Success Mockup */}
          {isSuccess && (
            <div className="p-6 mt-4 bg-secondary-container/30 border border-secondary/50 rounded-2xl flex flex-col items-center text-center space-y-2 animate-pulse shadow-inner">
              <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <p className="text-secondary font-bold text-lg">Order Confirmed</p>
              <p className="text-sm text-on-secondary-container/70">Your sterile delivery is being prepared.</p>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-200/60 space-y-4">
          <div className="flex justify-between items-center text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
            <span className="font-bold text-slate-900 text-xl font-headline">₹{subtotal.toFixed(2)}</span>
          </div>
          
          {!isSuccess ? (
            <button 
              disabled={items.length === 0 || isCheckingOut}
              onClick={handleCheckout} 
              className="w-full py-4 bg-on-surface text-white rounded-xl font-bold shadow-xl shadow-slate-900/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center gap-2 border-0 cursor-pointer"
            >
              {isCheckingOut ? (
                <>
                  <span className="material-symbols-outlined animate-spin">autorenew</span>
                  Processing...
                </>
              ) : (
                'Checkout Now'
              )}
            </button>
          ) : (
            <button 
              onClick={handleClose} 
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-xl hover:bg-slate-800 transition-colors border-0 cursor-pointer"
            >
              Continue Shopping
            </button>
          )}

          <div className="flex justify-center pt-2">
            <span className="flex items-center space-x-2 text-slate-400">
              <span className="material-symbols-outlined text-sm">security</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted Checkout</span>
            </span>
          </div>
        </div>
      </aside>
    </>
  )
}
