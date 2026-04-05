import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 w-full py-20 px-8 no-line macro-whitespace spacing-y-20">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto space-y-12 md:space-y-0">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link href="/">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <Image src="/logo.png" alt="Glow India Logo" fill className="object-contain" />
            </div>
          </Link>
          <p className="font-body text-[10px] uppercase tracking-[0.05em] text-slate-500 max-w-xs text-center md:text-left">
            &copy; 2026 GLOW INDIA. THE ABSTRACT CLINICAL ECOSYSTEM. ENGINEERED FOR SUPREME DOMESTIC SANITATION.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-body text-[10px] uppercase tracking-[0.05em]" href="/privacy">Privacy Policy</Link>
          <Link className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-body text-[10px] uppercase tracking-[0.05em]" href="/terms">Terms of Service</Link>
          <Link className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-body text-[10px] uppercase tracking-[0.05em]" href="/refund">Cancellation & Refund</Link>
          <Link className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-body text-[10px] uppercase tracking-[0.05em]" href="/shipping">Shipping Policy</Link>
          <Link className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-body text-[10px] uppercase tracking-[0.05em]" href="/contact">Contact Us</Link>
        </div>
        <div className="flex space-x-4">
          <a className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-slate-100 transition-colors" href="#">
            <span className="material-symbols-outlined text-slate-600 text-sm">language</span>
          </a>
          <a className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-slate-100 transition-colors" href="#">
            <span className="material-symbols-outlined text-slate-600 text-sm">star</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
