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

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if(!user) return NextResponse.json({ error: 'User missing' }, { status: 400 })

    const body = await request.json()
    const { name, phone, street, city, state, pincode, action, addressId } = body

    // Route: Pin existing address
    if (action === 'PIN' && addressId) {
      await prisma.$transaction([
        // Demote all to false
        prisma.address.updateMany({
          where: { userId: user.id },
          data: { isDefault: false }
        }),
        // Promote the target
        prisma.address.update({
          where: { id: addressId },
          data: { isDefault: true }
        })
      ])
      return NextResponse.json({ success: true })
    }

    // Route: Create New Address
    const addressCount = await prisma.address.count({ where: { userId: user.id } })
    const isFirstAddress = addressCount === 0

    const newAddress = await prisma.address.create({
      data: {
        userId: user.id,
        name,
        phone,
        street,
        city,
        state,
        pincode,
        isDefault: isFirstAddress // Auto-pin if it's their first
      }
    })

    return NextResponse.json(newAddress)
  } catch (error: any) {
    console.error('Address API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return NextResponse.json({}, { status: 401 })

    const body = await request.json()
    const { addressId } = body

    await prisma.address.delete({
      where: { id: addressId }
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({}, { status: 500 })
  }
}
