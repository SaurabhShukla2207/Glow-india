// app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Use db as any to bridge stale TypeScript cache (runtime is correct via npx prisma db push)
const db = prisma as any

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value },
          set(_name: string, _value: string, _options: CookieOptions) {},
          remove(_name: string, _options: CookieOptions) {},
        },
      }
    )

    const { data: { session }, error: authError } = await supabase.auth.getSession()

    if (!session?.user?.email || authError) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to checkout.' },
        { status: 401 }
      )
    }

    // Fetch user with their default pinned address
    let user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        addresses: { where: { isDefault: true } }
      }
    })

    if (!user) {
      user = await db.user.create({
        data: { id: session.user.id, email: session.user.email },
        include: { addresses: true }
      })
    }

    const defaultAddress = user?.addresses?.[0]

    if (!defaultAddress) {
      return NextResponse.json(
        { 
          error: 'Please add a default shipping address in your account before ordering.',
          redirect_to_account: true 
        },
        { status: 400 }
      )
    }

    // STAGE 4: The Supreme Atomic Transaction Engine
    const newOrder = await db.$transaction(async (tx: any) => {
      let calcTotal = 0

      // 1. Validate stock and decrement atomically
      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.id } })
        if (!product) throw new Error(`Product not found: ${item.id}`)

        const stock = product.stockQty ?? 0
        if (stock < item.quantity) {
          throw new Error(`Insufficient stock for "${product.name}". Only ${stock} remaining.`)
        }

        calcTotal += product.price * item.quantity

        await tx.product.update({
          where: { id: item.id },
          data: { stockQty: { decrement: item.quantity } }
        })
      }

      // 2. Create the order with address snapshot permanently stamped
      const createdOrder = await tx.order.create({
        data: {
          userId: user.id,
          total: parseFloat(calcTotal.toFixed(2)),
          status: 'PENDING',
          shippingName: defaultAddress.name,
          shippingPhone: defaultAddress.phone,
          shippingAddress: defaultAddress.street,
          shippingCity: defaultAddress.city,
          shippingState: defaultAddress.state,
          shippingPincode: defaultAddress.pincode,
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.finalPrice || item.price,
            }))
          }
        }
      })

      // 3. Wipe the server-side cart post-order
      await tx.cart.deleteMany({ where: { userId: user.id } })

      return createdOrder
    })

    return NextResponse.json({
      success: true,
      data: {
        orderId: newOrder.id,
        total: newOrder.total,
        itemCount: items.length,
        status: newOrder.status,
      },
    })
  } catch (error: any) {
    console.error('[POST /api/checkout] Error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Checkout failed' },
      { status: 500 }
    )
  }
}
