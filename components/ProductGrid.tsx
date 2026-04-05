import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types'

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-slate-500 font-body">
        <p>No products available right now.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((p, i) => (
        <ProductCard key={p.id} p={p} index={i} />
      ))}
    </div>
  )
}
