import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')

  if (!productId) {
    return NextResponse.json({ error: 'productId required' }, { status: 400 })
  }

  try {
    // Stage 5 Intelligence Engine:
    // 1. Find all orders that contain this product
    const ordersWithProduct = await prisma.orderItem.findMany({
      where: { productId },
      select: { orderId: true }
    })

    const orderIds = ordersWithProduct.map(o => o.orderId)

    if (orderIds.length === 0) {
      return NextResponse.json({ suggestions: [] })
    }

    // 2. Find all OTHER products from those orders (excluding current product)
    const companionItems = await prisma.orderItem.findMany({
      where: {
        orderId: { in: orderIds },
        productId: { not: productId }
      },
      include: {
        product: {
          select: { id: true, name: true, price: true, imageUrl: true, slug: true, description: true, category: true }
        }
      }
    })

    // 3. Count frequency of each companion product (raw statistics)
    const frequencyMap: Record<string, { count: number; product: any }> = {}
    for (const item of companionItems) {
      if (!frequencyMap[item.productId]) {
        frequencyMap[item.productId] = { count: 0, product: item.product }
      }
      frequencyMap[item.productId].count++
    }

    // 4. Sort by frequency descending, take top 3
    const sorted = Object.values(frequencyMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)

    return NextResponse.json({ suggestions: sorted.map(s => s.product) })
  } catch (error) {
    console.error('FBT Engine error:', error)
    return NextResponse.json({ suggestions: [] })
  }
}
