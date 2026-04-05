import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const coreProducts = [
  {
    slug: 'toilet-cleaner-pro',
    name: 'Precision Toilet Polish',
    description: 'Active enzymic breakdown for clinical brilliance without harsh fumes.',
    price: 249,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYnwuQRV_kfkl-draJZKNRScYUwkuduBq4lf7BOEOmeVuLRxf3FEuQ78PEks0aLkXtcN_qSU2uLj1duoEOCSMARl5VqWhMkcz1kFzIFAf7a_cr2OKtqbEnOb7OrtCxmkUuLgj6UEBzh3j3b0U7QXnJzjXIkgXupwwy2s2GBJf8qJdRNGjNycKjBx4HT0hj1l0YEgISIqkNPHSHkjOcxTImV7oyoCRka1D48bsqNx_pcm53f0uowNxaiqXH2sU7mFoK1-b1o3eu',
    category: 'Bathroom',
    stockQty: 500,
    isActive: true,
  },
  {
    slug: 'botanical-floor-elixir',
    name: 'Botanical Floor Elixir',
    description: 'Pine-infused antibacterial emulsion for 24-hour surface protection.',
    price: 199,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Bih-oAKRWOzlHCIJGzcbD44dyOHKrHiPllEJmpjAAFb2g-ipHvxp3NHEREr2Pp-pldumWnHiUelx-ig768HSifCu7WosVw5EZNDqkSKXUUCsdMoojpy0ehXjMR_1GtjmN1zasLNJoXTo8hzFPmSMamD2F0xt0kkSHyCgnq8dfvM0KYaaLoikftjXlpRjPLKTrM5fV_nVjbOT0CRDZf4L9Kj3bwLIG3v3sORvUTh-Lzgv57P6lMHB8tvdBjiLQ44M9mWx0jmS',
    category: 'Floor Care',
    stockQty: 500,
    isActive: true,
  },
  {
    slug: 'multi-surface-mist',
    name: 'Multi-Surface Mist',
    description: 'Molecular film technology prevents lime-scale buildup on ceramic.',
    price: 310,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_LgOlHVMG5Iu7qLVZfMEY5_W9h5luZiKZnt_OXJMm03-n6np2N8ZCO7PqxLBzFfzMzNNepy9_1Pf_jUu0Q75a9QHCg9TJSsVjdOcP7rTgCVhXJxV1UOHeHeKqyrQVvJs3601Rb4V4Li47FUuJjSi9FVLp4ii7vwWoQ1RSCCpfuMvkcKbog3bmD7r97Yp82UppCxJYvLiVkWI091dzRPzevKxLm-h52_l6wJrokEVssXQNPoSpMaUeJuHT-Yshz20tz8Taz2iY',
    category: 'Bathroom',
    stockQty: 500,
    isActive: true,
  },
  {
    slug: 'citrus-kitchen-degreaser',
    name: 'Citrus Kitchen Degreaser',
    description: 'Cold-pressed citrus enzymes dissolve grease and oil residue instantly.',
    price: 179,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYnwuQRV_kfkl-draJZKNRScYUwkuduBq4lf7BOEOmeVuLRxf3FEuQ78PEks0aLkXtcN_qSU2uLj1duoEOCSMARl5VqWhMkcz1kFzIFAf7a_cr2OKtqbEnOb7OrtCxmkUuLgj6UEBzh3j3b0U7QXnJzjXIkgXupwwy2s2GBJf8qJdRNGjNycKjBx4HT0hj1l0YEgISIqkNPHSHkjOcxTImV7oyoCRka1D48bsqNx_pcm53f0uowNxaiqXH2sU7mFoK1-b1o3eu',
    category: 'Kitchen',
    stockQty: 350,
    isActive: true,
  },
  {
    slug: 'glass-clarity-spray',
    name: 'Glass Clarity Spray',
    description: 'Streak-free nanoparticle formula for mirrors, windows, and screens.',
    price: 149,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Bih-oAKRWOzlHCIJGzcbD44dyOHKrHiPllEJmpjAAFb2g-ipHvxp3NHEREr2Pp-pldumWnHiUelx-ig768HSifCu7WosVw5EZNDqkSKXUUCsdMoojpy0ehXjMR_1GtjmN1zasLNJoXTo8hzFPmSMamD2F0xt0kkSHyCgnq8dfvM0KYaaLoikftjXlpRjPLKTrM5fV_nVjbOT0CRDZf4L9Kj3bwLIG3v3sORvUTh-Lzgv57P6lMHB8tvdBjiLQ44M9mWx0jmS',
    category: 'Glass',
    stockQty: 420,
    isActive: true,
  },
  {
    slug: 'laundry-power-gel',
    name: 'Laundry Power Gel',
    description: 'Concentrated bio-enzyme gel removes deep fabric stains in cold water.',
    price: 299,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_LgOlHVMG5Iu7qLVZfMEY5_W9h5luZiKZnt_OXJMm03-n6np2N8ZCO7PqxLBzFfzMzNNepy9_1Pf_jUu0Q75a9QHCg9TJSsVjdOcP7rTgCVhXJxV1UOHeHeKqyrQVvJs3601Rb4V4Li47FUuJjSi9FVLp4ii7vwWoQ1RSCCpfuMvkcKbog3bmD7r97Yp82UppCxJYvLiVkWI091dzRPzevKxLm-h52_l6wJrokEVssXQNPoSpMaUeJuHT-Yshz20tz8Taz2iY',
    category: 'Laundry',
    stockQty: 280,
    isActive: true,
  },
]

export async function GET(request: Request) {
  try {
    const results = []
    
    for (const prod of coreProducts) {
      const existing = await prisma.product.findUnique({
        where: { slug: prod.slug }
      })
      
      if (!existing) {
        const created = await prisma.product.create({ data: prod as any })
        results.push({ action: 'created', name: prod.name })
      } else {
        await prisma.product.update({
          where: { slug: prod.slug },
          data: { stockQty: prod.stockQty } as any
        })
        results.push({ action: 'restocked', name: prod.name })
      }
    }

    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      seededProducts: results
    })
  } catch (error: any) {
    console.error('Seed Error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
