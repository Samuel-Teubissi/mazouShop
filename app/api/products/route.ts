// app//products/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/client'
// import { NextRequest, NextResponse } from 'next'
import { prisma } from '@/lib/clientPrisma'

// const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  let q = searchParams.get('q')
  let categ = searchParams.get('categ')
  q = q?.toLocaleLowerCase() ? decodeURIComponent(q) : ''
  categ = categ?.toLocaleLowerCase() ? decodeURIComponent(categ) : ''

  // const promiseProducts = await prisma.product.findMany({
  //   include: {
  //     images: true,
  //     product_profits: true,
  //     product_tags: true,
  //     product_caracteristics: true,
  //   },
  // })

  // return NextResponse.json(promiseProducts)
  // On construit dynamiquement le "where"
  const where: any = {}

  if (q && categ) {
    // Recherche combinée (ET logique)
    where.AND = [
      {
        OR: [{ title: { contains: q } }, { description: { contains: q } }],
      },
      { product_tags: { some: { label: { contains: categ } } } },
    ]
  } else if (q) {
    // Recherche uniquement par mot-clé
    where.OR = [{ title: { contains: q } }, { description: { contains: q } }]
  } else if (categ) {
    // Recherche uniquement par catégorie
    where.product_tags = { some: { label: { contains: categ } } }
  }
  try {
    const articles = await prisma.product.findMany({
      where: where || undefined,
      // where,
      include: {
        images: true,
        product_profits: true,
        product_tags: true,
        product_caracteristics: true,
      },
      orderBy: { id: 'desc' }, // optionnel, tri par id décroissant
    })
    console.log('articles 2', where)

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
