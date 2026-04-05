import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, address, city, state, pincode } = body

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: name !== undefined ? name : undefined,
        phone: phone !== undefined ? phone : undefined,
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error('Update profile error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
