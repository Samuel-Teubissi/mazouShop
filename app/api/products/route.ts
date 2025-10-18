// app//products/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/client'
// import { NextRequest, NextResponse } from 'next'
import { prisma } from '@/lib/clientPrisma'

// const prisma = new PrismaClient()

export async function GET(request: Request) {
  // const promiseProducts = await prisma.product.findMany({
  //   include: {
  //     images: true,
  //     product_profits: true,
  //     product_tags: true,
  //     product_caracteristics: true,
  //   },
  // })

  // return NextResponse.json(promiseProducts)

  // const { q } = req.query;

  try {
    const articles = await prisma.product.findMany({
      // where: q
      //   ? {
      //       title: { contains: String(q), mode: 'insensitive' },
      //     }
      //   : undefined, // si q est vide, récupère tous les articles
      include: {
        images: true,
        product_profits: true,
        product_tags: true,
        product_caracteristics: true,
      },
      orderBy: { id: 'desc' }, // optionnel, tri par id décroissant
    })

    return NextResponse.json(articles, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
// handler()
// .then(async () => {
//   await prisma.$disconnect()
// })
// .catch(async (e) => {
//   console.error(e)
//   await prisma.$disconnect()
//   process.exit(1)
// })
