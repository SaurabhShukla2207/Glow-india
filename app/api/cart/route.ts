import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) return NextResponse.json({ items: [] })

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if(!user) return NextResponse.json({ items: [] })

    // Find or Create user's Server Cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { 
        items: {
          include: { product: true }
        }
      }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: { items: { include: { product: true } } }
      })
    }

    // Map Prisma models to Zustand expected format
    const formattedItems = cart.items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      finalPrice: item.product.price, // Can be expanded for discounts later
      quantity: item.quantity,
      image: item.product.imageUrl
    }))

    return NextResponse.json({ items: formattedItems })
  } catch (error) {
    console.error('Cart GET Error:', error)
    return NextResponse.json({ items: [] }) // Silent fail for cart to not break UX
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { productId, quantity } = await request.json()
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })

    let cart = await prisma.cart.findUnique({ where: { userId: user!.id } })
    if (!cart) cart = await prisma.cart.create({ data: { userId: user!.id } })

    // Atomic Upsert: if it exists, add quantity. If not, create.
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId
        }
      },
      update: {
        quantity
      },
      create: {
        cartId: cart.id,
        productId: productId,
        quantity: quantity
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed sync' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { productId } = await request.json()
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    const cart = await prisma.cart.findUnique({ where: { userId: user!.id } })

    if(cart && productId) {
        await prisma.cartItem.delete({
            where: {
                cartId_productId: { cartId: cart.id, productId }
            }
        })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed cleanup' }, { status: 500 })
  }
}
