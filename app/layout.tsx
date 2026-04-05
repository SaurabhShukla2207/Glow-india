// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { CartDrawer } from '@/components/CartDrawer'
import { Footer } from '@/components/Footer'
import { Inter, Poppins, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-poppins' })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-roboto' })

export const metadata: Metadata = {
  title: 'GLOW INDIA | Abstract Clinical Cleaning',
  description:
    'Hospital-grade cleaning products crafted for the Indian home. Fresh. Clinical. Pure.',
  keywords: ['cleaning products', 'toilet cleaner', 'phenyl', 'bathroom cleaner', 'India'],
  openGraph: {
    title: 'Glow India — Premium Cleaning Products',
    description: 'Hospital-grade cleaning products crafted for the Indian home.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${roboto.variable} light`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-background font-body text-on-surface antialiased overflow-x-hidden selection:bg-primary-container min-h-screen">
        <Navbar />
        {children}
        <CartDrawer />
        <Footer />
      </body>
    </html>
  )
}
