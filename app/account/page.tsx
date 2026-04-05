import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'
import { AccountDashboard } from './AccountDashboard'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
  const supabase = await createClient()
  
  // 1. Secure Execution Guard
  const { data: { session }, error } = await supabase.auth.getSession()
  if (!session || error) {
    redirect('/login')
  }

  // 2. Hydrate Customer Profile via Prisma
  let userRecord = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      addresses: {
        orderBy: { isDefault: 'desc' }
      },
      orders: {
        orderBy: { createdAt: 'desc' },
        include: { items: { include: { product: true } } }
      },
      wishlists: {
        include: { product: true }
      }
    }
  })

  // If the user signed in gracefully but checkout never created their base profile, create it now
  if (!userRecord && session.user.email) {
    userRecord = await prisma.user.create({
      data: {
        id: session.user.id,
        email: session.user.email
      },
      include: { 
        addresses: true,
        orders: { include: { items: { include: { product: true } } } }, 
        wishlists: { include: { product: true } } 
      }
    })
  }

  if (!userRecord) {
    redirect('/login?error=account_not_found')
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h1 className="text-3xl font-headline font-bold text-slate-900 dark:text-white">Customer Portal</h1>
          <p className="text-slate-500 mt-2">Manage your clinical profiles, shipping routes, and past activity.</p>
        </div>
        
        <AccountDashboard userProfile={userRecord} />
      </div>
    </div>
  )
}
