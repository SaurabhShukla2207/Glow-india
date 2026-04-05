'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/lib/store'
import { Product } from '@/types'
import { ShoppingBag, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function FrequentlyBoughtTogether({ anchorProductId }: { anchorProductId: string }) {
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    if (!anchorProductId) return
    fetch(`/api/recommendations?productId=${anchorProductId}`)
      .then(r => r.json())
      .then(data => {
        if (data.suggestions?.length > 0) setSuggestions(data.suggestions)
      })
      .catch(() => {})
  }, [anchorProductId])

  if (suggestions.length === 0) return null

  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl border border-amber-500/20">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-headline font-black text-slate-900 dark:text-white">
            Frequently Bought Together
          </h2>
          <p className="text-slate-500 text-sm mt-1">Curated by order intelligence from your community.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex gap-5 items-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:shadow-sky-500/5 transition-all"
          >
            <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
              {product.imageUrl && (
                <Image fill alt={product.name} src={product.imageUrl} className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug line-clamp-2 mb-1">{product.name}</h3>
              <span className="text-sky-500 font-extrabold text-sm">₹{product.price}</span>
              <button
                onClick={() => addItem({ ...product, isSubscription: false, finalPrice: product.price, imageUrl: product.imageUrl || '', slug: product.slug || '' })}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                <ShoppingBag className="w-3 h-3" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
