// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

export async function GET() {
  const prisma = new PrismaClient()

  const promiseProducts = await prisma.product.findMany({
    include: {
      images: true,
      product_profits: true,
      product_tags: true,
      product_caracteristics: true,
    },
  })

  return NextResponse.json(promiseProducts)
}
