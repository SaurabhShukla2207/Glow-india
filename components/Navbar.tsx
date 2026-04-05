'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/store'

export function Navbar() {
  const openCart = useCartStore((state) => state.openCart)
  const items = useCartStore((state) => state.items)
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm dark:shadow-none no-border md:space-y-20 hover:backdrop-blur-2xl transition-all duration-300">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image src="/logo.png" alt="Glow India Logo" fill className="object-contain" priority />
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-12">
          <Link className="text-sky-600 dark:text-sky-400 font-bold border-b-2 border-sky-500 pb-1 font-headline font-semibold tracking-tight" href="/">Home</Link>
          <Link className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors font-headline font-semibold tracking-tight" href="#products">Products</Link>
          <Link className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors font-headline font-semibold tracking-tight" href="#">Mission</Link>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={openCart} className="relative scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-sky-500 dark:text-sky-400">shopping_cart</span>
            {mounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <img alt="User profile" className="w-8 h-8 rounded-full border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgCnz9IYAG-43w8vAMelWD7-Kn_ipkllyFbq5tja2dIcU02vK5BNGhztMeHoc6ausFYxwcOweXRtu1_LiLq-oEBcl_Npjx8ToArbwDfAoNsvcZgcCWq7Zql3fOmTU-vqzY-h-yjpXlbuCzZwim1WHMTDbapTU7I5HixdYzONVOqvNyl84J1FMgXUquRsRiHzmF_TexNKCyIy2V5uH04gONzJ1sn1R0jh70zEzRdenMDxfoebTB9ImROX1AB6K1wOPkN918X_Al"/>
        </div>
      </div>
    </nav>
  )
}