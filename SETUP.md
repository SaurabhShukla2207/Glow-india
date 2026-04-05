# Glow India — Setup Guide

## 1. Bootstrap the Project

```bash
npx create-next-app@14 glow-india \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd glow-india
```

## 2. Install All Dependencies

```bash
# UI & Animation
npm install framer-motion lucide-react clsx

# State Management
npm install zustand

# Database ORM
npm install prisma @prisma/client
npx prisma init --datasource-provider postgresql

# Supabase SSR Auth
npm install @supabase/supabase-js @supabase/ssr

# Dev utilities
npm install -D @types/node
```

## 3. Environment Variables

Create `.env.local` in project root:

```env
# Supabase (get from your Supabase project settings)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Database (Supabase PostgreSQL connection string)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.YOUR_PROJECT_REF.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
```

## 4. Push Database Schema

```bash
npx prisma db push
npx prisma generate
```

## 5. Seed the Database (products)

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

Or add to `package.json`:
```json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

Then run: `npx prisma db seed`

## 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## File Structure

```
glow-india/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── utils/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── lib/
│   └── store.ts
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── login/
│   │   └── page.tsx
│   └── api/
│       ├── products/
│       │   └── route.ts
│       └── checkout/
│           └── route.ts
└── components/
    ├── Navbar.tsx
    ├── ProductCard.tsx
    └── CartDrawer.tsx
```
