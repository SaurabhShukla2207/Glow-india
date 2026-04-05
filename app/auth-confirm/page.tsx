'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AuthConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const supabase = createClient()
    
    // Check if we are receiving an explicit raw token bypass
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')

    if (token_hash && type === 'magiclink') {
      // Execute the bypass verification natively
      supabase.auth.verifyOtp({ token_hash, type: 'magiclink' }).then(({ data, error }) => {
        if (error) {
          setErrorMsg('Secure link expired or invalid.')
          setTimeout(() => router.push('/login'), 3000)
        } else if (data?.session) {
          router.push('/account')
          router.refresh()
        }
      })
    } else {
      // Fallback for Implicit Flow Hash Fragments (if Supabase returned them instead)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          router.push('/account')
          router.refresh()
        }
      })

      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          router.push('/account')
          router.refresh()
        } else {
          // If no implicit session exists after 3 seconds
          setTimeout(() => {
            if (!errorMsg) router.push('/login')
          }, 3000)
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [router, searchParams, errorMsg])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center space-y-6">
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div>
          <h1 className="text-2xl font-bold font-headline text-slate-800 dark:text-white mb-2">Authenticating</h1>
          <p className="text-slate-500 font-body">Securely verifying your magic link...</p>
        </div>
      </div>
    </div>
  )
}
