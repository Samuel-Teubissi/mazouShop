import { Prisma } from '@/generated/prisma/client'

export type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true }
}>
