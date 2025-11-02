// import { prisma } from '@/lib/clientPrisma'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // const productId = Number(params.id)
  // console.log('props', props)

  // const params = await props.params
  const { id } = await params
  const productId = parseInt(id)

  if (isNaN(productId)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 })
  }

  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: {
        images: true,
        product_profits: true,
        product_tags: true,
        product_caracteristics: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produit introuvable' },
        { status: 404 },
      )
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 404 })
  }
}
