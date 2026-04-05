import { Suspense } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { ProductGrid } from '@/components/ProductGrid'

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
  isActive: boolean
}

async function getProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 60 },
    })
    
    if (!res.ok) throw new Error('Failed to fetch')
    const json = await res.json()
    return (json.data || []) as Product[]
  } catch (error) {
    return [
      {
        id: 'seed-1',
        slug: 'toilet-cleaner-pro',
        name: 'Precision Toilet Polish',
        description: 'Active enzymic breakdown for clinical brilliance without harsh fumes.',
        price: 249,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYnwuQRV_kfkl-draJZKNRScYUwkuduBq4lf7BOEOmeVuLRxf3FEuQ78PEks0aLkXtcN_qSU2uLj1duoEOCSMARl5VqWhMkcz1kFzIFAf7a_cr2OKtqbEnOb7OrtCxmkUuLgj6UEBzh3j3b0U7QXnJzjXIkgXupwwy2s2GBJf8qJdRNGjNycKjBx4HT0hj1l0YEgISIqkNPHSHkjOcxTImV7oyoCRka1D48bsqNx_pcm53f0uowNxaiqXH2sU7mFoK1-b1o3eu',
        category: 'Bathroom',
        stock: 500,
        isActive: true,
      },
      {
        id: 'seed-2',
        slug: 'botanical-floor-elixir',
        name: 'Botanical Floor Elixir',
        description: 'Pine-infused antibacterial emulsion for 24-hour surface protection.',
        price: 199,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Bih-oAKRWOzlHCIJGzcbD44dyOHKrHiPllEJmpjAAFb2g-ipHvxp3NHEREr2Pp-pldumWnHiUelx-ig768HSifCu7WosVw5EZNDqkSKXUUCsdMoojpy0ehXjMR_1GtjmN1zasLNJoXTo8hzFPmSMamD2F0xt0kkSHyCgnq8dfvM0KYaaLoikftjXlpRjPLKTrM5fV_nVjbOT0CRDZf4L9Kj3bwLIG3v3sORvUTh-Lzgv57P6lMHB8tvdBjiLQ44M9mWx0jmS',
        category: 'Floor Care',
        stock: 500,
        isActive: true,
      },
      {
        id: 'seed-3',
        slug: 'multi-surface-mist',
        name: 'Multi-Surface Mist',
        description: 'Molecular film technology prevents lime-scale buildup on ceramic.',
        price: 310,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_LgOlHVMG5Iu7qLVZfMEY5_W9h5luZiKZnt_OXJMm03-n6np2N8ZCO7PqxLBzFfzMzNNepy9_1Pf_jUu0Q75a9QHCg9TJSsVjdOcP7rTgCVhXJxV1UOHeHeKqyrQVvJs3601Rb4V4Li47FUuJjSi9FVLp4ii7vwWoQ1RSCCpfuMvkcKbog3bmD7r97Yp82UppCxJYvLiVkWI091dzRPzevKxLm-h52_l6wJrokEVssXQNPoSpMaUeJuHT-Yshz20tz8Taz2iY',
        category: 'Bathroom',
        stock: 500,
        isActive: true,
      },
    ] as Product[]
  }
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main className="mesh-gradient-bg">
      <HeroSection />
      
      <section id="products" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-[2.5rem] font-headline font-bold text-on-surface">The Core Collection</h2>
            <p className="text-on-surface-variant max-w-md">Our signature formulations designed for clinical efficiency and domestic elegance.</p>
          </div>
          <div className="flex gap-2">
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-low transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-low transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <ProductGrid products={products} />
      </section>

      <section className="py-32 px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="bg-surface-container-low rounded-[3.5rem] p-12 lg:p-20 relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-[20rem]">science</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-[2.5rem] leading-tight font-headline font-extrabold text-on-surface">Designed for Purity. <br/>Proven for Safety.</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Every GLOW formula undergoes rigorous clinical trials to ensure maximum sanitation with zero respiratory impact. Our laboratory standards exceed international cleaning benchmarks.
              </p>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-700">Bio-Safety Index</span>
                    <span className="text-secondary font-bold">100%</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div className="h-full bg-gradient-to-r from-secondary to-secondary-fixed rounded-full shadow-[0_0_12px_rgba(122,193,66,0.4)]" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-700">Clinical Efficiency</span>
                    <span className="text-primary font-bold">99.9%</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_12px_rgba(29,161,242,0.4)]" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-outline-variant/30 space-y-4">
                <span className="material-symbols-outlined text-secondary text-3xl">pet_supplies</span>
                <h4 className="font-bold text-slate-900">Pet Safe</h4>
                <p className="text-xs text-slate-500">Non-toxic residue safe for all paws and claws.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-outline-variant/30 space-y-4 translate-y-8">
                <span className="material-symbols-outlined text-primary text-3xl">high_quality</span>
                <h4 className="font-bold text-slate-900">Pure Form</h4>
                <p className="text-xs text-slate-500">No artificial fillers or bulk synthetic carriers.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-outline-variant/30 space-y-4">
                <span className="material-symbols-outlined text-tertiary text-3xl">spa</span>
                <h4 className="font-bold text-slate-900">Organic Scent</h4>
                <p className="text-xs text-slate-500">Essential oil infusions for natural freshness.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-outline-variant/30 space-y-4 translate-y-8">
                <span className="material-symbols-outlined text-error text-3xl">microbiology</span>
                <h4 className="font-bold text-slate-900">Zero Pathogens</h4>
                <p className="text-xs text-slate-500">Neutralizes 99.99% of bacterial variants.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

