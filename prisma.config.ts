import { defineConfig } from '@prisma/config'

export default defineConfig({
  earlyAccess: true,
  seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
})