export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
  isActive?: boolean
}
