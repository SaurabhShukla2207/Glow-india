// app/login/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, Sparkles, CheckCircle, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

type LoginStep = 'email' | 'loading' | 'sent' | 'error'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<LoginStep>('email')
  const [errorMsg, setErrorMsg] = useState('')

  const supabase = createClient()

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStep('loading')
    setErrorMsg('')

    try {
      const response = await fetch('/api/auth/send-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed })
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStep('error')
        return
      }

      setStep('sent')
    } catch {
      setErrorMsg('Network error. Please check your connection.')
      setStep('error')
    }
  }

  const handleRetry = () => {
    setStep('email')
    setErrorMsg('')
  }

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-cyan-200/20 blur-3xl pointer-events-none" />

      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-8 left-6 flex items-center gap-2 text-sm text-[#1D2631]/50 hover:text-[#1DA1F2] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl shadow-blue-200/20 border border-white/70">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-14 h-14 gradient-blue rounded-2xl flex items-center justify-center shadow-xl shadow-blue-400/30">
                <Sparkles className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 gradient-green rounded-full border-2 border-white" />
            </div>
            <h1 className="font-display font-800 text-2xl text-[#1D2631]">
              Glow<span className="gradient-text-blue">India</span>
            </h1>
            <p className="text-[#1D2631]/40 text-xs mt-1 tracking-wide">
              Premium Cleaning Products
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* ===== EMAIL INPUT STEP ===== */}
            {(step === 'email' || step === 'error') && (
              <motion.div
                key="email-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="font-display font-700 text-xl text-[#1D2631]">
                    Sign in to your account
                  </h2>
                  <p className="text-[#1D2631]/50 text-sm mt-2 leading-relaxed">
                    Enter your email and we'll send you a secure magic link —
                    no password needed.
                  </p>
                </div>

                <form onSubmit={handleSendMagicLink} className="space-y-4">
                  {/* Email input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-[#1D2631]/35" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errorMsg) setErrorMsg('')
                      }}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/70 border border-[#1D2631]/10 text-[#1D2631] placeholder-[#1D2631]/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/40 focus:border-[#1DA1F2]/40 transition-all"
                      autoComplete="email"
                      autoFocus
                    />
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                      >
                        {errorMsg}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full btn-blue py-3.5 text-sm flex items-center justify-center gap-2.5 mt-2"
                  >
                    Send Magic Link
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-[#1D2631]/10" />
                  <span className="text-xs text-[#1D2631]/30 font-medium">or</span>
                  <div className="flex-1 h-px bg-[#1D2631]/10" />
                </div>

                {/* Guest note */}
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm text-[#1D2631]/50 hover:text-[#1D2631] font-medium border border-[#1D2631]/10 rounded-xl hover:bg-[#1D2631]/5 transition-all"
                >
                  Continue as Guest
                </Link>

                <p className="text-center text-xs text-[#1D2631]/30 mt-6 leading-relaxed">
                  By continuing, you agree to our{' '}
                  <Link href="#" className="text-[#1DA1F2] hover:underline">Terms</Link>
                  {' '}and{' '}
                  <Link href="#" className="text-[#1DA1F2] hover:underline">Privacy Policy</Link>.
                </p>
              </motion.div>
            )}

            {/* ===== LOADING STEP ===== */}
            {step === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12 gap-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full gradient-blue flex items-center justify-center">
                    <Loader2 className="w-7 h-7 text-white animate-spin" />
                  </div>
                  <div className="absolute inset-0 rounded-full animate-ping bg-blue-300/40" />
                </div>
                <div className="text-center">
                  <p className="font-display font-700 text-[#1D2631] text-lg">
                    Sending your link...
                  </p>
                  <p className="text-[#1D2631]/40 text-sm mt-1">Just a moment</p>
                </div>
              </motion.div>
            )}

            {/* ===== SUCCESS / SENT STEP ===== */}
            {step === 'sent' && (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center py-8 gap-5 text-center"
              >
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 250, damping: 20 }}
                  className="w-20 h-20 rounded-full gradient-green flex items-center justify-center shadow-xl shadow-green-400/30"
                >
                  <CheckCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <h2 className="font-display font-700 text-xl text-[#1D2631]">
                    Check your inbox!
                  </h2>
                  <p className="text-[#1D2631]/55 text-sm leading-relaxed">
                    We've sent a magic link to{' '}
                    <strong className="text-[#1D2631]">{email}</strong>.
                    Click the link to sign in instantly.
                  </p>
                </motion.div>

                {/* Email client hints */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full bg-blue-50 rounded-2xl p-4 text-left space-y-2"
                >
                  <p className="text-xs font-semibold text-[#1D2631]/60 uppercase tracking-wider">
                    💡 Pro tip
                  </p>
                  <p className="text-xs text-[#1D2631]/50 leading-relaxed">
                    The link expires in 1 hour. If you don't see the email,
                    check your spam folder.
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleRetry}
                  className="text-sm text-[#1DA1F2] hover:text-[#1D2631] font-medium transition-colors"
                >
                  Use a different email
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security note */}
        <p className="text-center text-xs text-[#1D2631]/35 mt-6">
          🔒 Your data is encrypted and never shared.
        </p>
      </motion.div>
    </div>
  )
}
