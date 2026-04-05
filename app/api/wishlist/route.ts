import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId } = await request.json()
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })

    if(!user) return NextResponse.json({ error: 'User missing' }, { status: 400 })

    await prisma.wishlistItem.create({
      data: {
        userId: user.id,
        productId: productId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2002') {
       return NextResponse.json({ success: true, message: 'Already exists' }) // Idempotent 
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return NextResponse.json({}, { status: 401 })

    const { productId } = await request.json()
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })

    if(user && productId) {
        await prisma.wishlistItem.delete({
            where: {
                userId_productId: { userId: user.id, productId }
            }
        })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({}, { status: 500 })
  }
}
