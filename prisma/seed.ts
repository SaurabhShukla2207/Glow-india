// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding products...')

  await prisma.product.upsert({
    where: { slug: 'toilet-cleaner-pro' },
    update: {},
    create: {
      slug: 'toilet-cleaner-pro',
      name: 'Precision Toilet Polish',
      description: 'Active enzymic breakdown for clinical brilliance without harsh fumes.',
      price: 249,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYnwuQRV_kfkl-draJZKNRScYUwkuduBq4lf7BOEOmeVuLRxf3FEuQ78PEks0aLkXtcN_qSU2uLj1duoEOCSMARl5VqWhMkcz1kFzIFAf7a_cr2OKtqbEnOb7OrtCxmkUuLgj6UEBzh3j3b0U7QXnJzjXIkgXupwwy2s2GBJf8qJdRNGjNycKjBx4HT0hj1l0YEgISIqkNPHSHkjOcxTImV7oyoCRka1D48bsqNx_pcm53f0uowNxaiqXH2sU7mFoK1-b1o3eu',
      category: 'Bathroom',
      stockQty: 500,
      isActive: true,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'botanical-floor-elixir' },
    update: {},
    create: {
      slug: 'botanical-floor-elixir',
      name: 'Botanical Floor Elixir',
      description: 'Pine-infused antibacterial emulsion for 24-hour surface protection.',
      price: 199,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Bih-oAKRWOzlHCIJGzcbD44dyOHKrHiPllEJmpjAAFb2g-ipHvxp3NHEREr2Pp-pldumWnHiUelx-ig768HSifCu7WosVw5EZNDqkSKXUUCsdMoojpy0ehXjMR_1GtjmN1zasLNJoXTo8hzFPmSMamD2F0xt0kkSHyCgnq8dfvM0KYaaLoikftjXlpRjPLKTrM5fV_nVjbOT0CRDZf4L9Kj3bwLIG3v3sORvUTh-Lzgv57P6lMHB8tvdBjiLQ44M9mWx0jmS',
      category: 'Floor Care',
      stockQty: 500,
      isActive: true,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'multi-surface-mist' },
    update: {},
    create: {
      slug: 'multi-surface-mist',
      name: 'Multi-Surface Mist',
      description: 'Molecular film technology prevents lime-scale buildup on ceramic.',
      price: 310,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_LgOlHVMG5Iu7qLVZfMEY5_W9h5luZiKZnt_OXJMm03-n6np2N8ZCO7PqxLBzFfzMzNNepy9_1Pf_jUu0Q75a9QHCg9TJSsVjdOcP7rTgCVhXJxV1UOHeHeKqyrQVvJs3601Rb4V4Li47FUuJjSi9FVLp4ii7vwWoQ1RSCCpfuMvkcKbog3bmD7r97Yp82UppCxJYvLiVkWI091dzRPzevKxLm-h52_l6wJrokEVssXQNPoSpMaUeJuHT-Yshz20tz8Taz2iY',
      category: 'Bathroom',
      stockQty: 500,
      isActive: true,
    },
  })

  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
