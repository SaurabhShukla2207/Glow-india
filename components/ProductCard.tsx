'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { Product } from '@/types'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, ShieldCheck, Heart } from 'lucide-react'

export function ProductCard({ p, index }: { p: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem)
  const [isSub, setIsSub] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const handleWishlist = async () => {
    const newState = !wishlisted
    setWishlisted(newState) // Optimistic Update

    try {
      await fetch('/api/wishlist', {
         method: newState ? 'POST' : 'DELETE',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ productId: p.id })
      })
    } catch (e) {
      setWishlisted(!newState) // Revert on failure
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: index === 1 ? 48 : 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
      className={`group relative p-8 bg-white dark:bg-slate-950/80 rounded-[3rem] transition-shadow duration-500 hover:shadow-2xl hover:shadow-sky-500/10 border border-slate-100 dark:border-slate-800`}
    >
      <div className="absolute top-12 left-12 z-20 flex gap-2 pointer-events-none">
        {index === 0 && (
          <span className="px-3 py-1 bg-sky-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md">Best Seller</span>
        )}
      </div>

      <div className="absolute top-10 right-10 z-20">
         <button 
            onClick={handleWishlist} 
            className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-100 dark:border-slate-800 hover:scale-110 active:scale-95 transition-all text-slate-400 group/heart cursor-pointer"
         >
            <Heart className={`w-5 h-5 transition-colors ${wishlisted ? 'fill-pink-500 text-pink-500' : 'group-hover/heart:text-pink-400'}`} />
         </button>
      </div>

      <div className="aspect-square rounded-[2rem] overflow-hidden mb-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-transparent dark:from-slate-800 pointer-events-none mix-blend-overlay z-10"></div>
        <img alt={p.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out" src={p.imageUrl} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-headline font-bold text-2xl text-slate-900 dark:text-white leading-tight">{p.name}</h3>
          <span className="text-sky-500 font-extrabold text-xl tracking-tight shrink-0">₹{p.price}</span>
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[3rem] relative z-20">{p.description}</p>
        
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2 relative z-20">
           <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-secondary" /> Lab Tested</div>
           <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /> 5.0 (42)</div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-slate-100 dark:border-slate-800 mt-6 relative z-20">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Subscribe & Save</span>
          <button 
            onClick={() => setIsSub(!isSub)}
            className={`relative inline-block w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${isSub ? 'bg-secondary' : 'bg-slate-200 dark:bg-slate-800'}`}
          >
            <span className={`absolute top-1 bottom-1 w-4 rounded-full bg-white transition-all shadow-sm ${isSub ? 'left-[calc(100%-1.25rem)]' : 'left-1'}`}></span>
          </button>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => addItem({ ...p, isSubscription: isSub, finalPrice: p.price })}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all hover:brightness-110 shadow-xl shadow-blue-500/20 active:shadow-blue-500/10 relative z-20 group cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}
