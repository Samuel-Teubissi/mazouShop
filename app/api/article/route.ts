import { handleFileUpload } from '@/components/HandleFileUpload'
// import { PrismaClient } from '@/generated/prisma'
// import { prisma } from '@/lib/clientPrisma'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Gestion de la requête POST
export async function POST(req: Request) {
  try {
    // Récupérer les fichiers envoyés depuis le frontend (via FormData)
    const formData = await req.formData()

    // Récupération des fichiers
    const files = formData.getAll('files') as File[]
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Aucun fichier reçu.' },
        { status: 400 },
      )
    }
    // Gérer plusieurs fichiers avec Promise.all()
    const fileUrls = await Promise.all(files.map(handleFileUpload))

    //   return NextResponse.json({ files: fileUrls });
    const data = {
      title: formData.get('title') as string,
      newPrice: formData.get('price') as string,
      oldPrice: formData.get('discount') as string,
      description: formData.get('description') as string,
      note: formData.get('note') as string,
      review: formData.get('review') as string,
      profits: formData.get('profits') as string,
      tags: formData.get('tags') as string,
      caracteristics: formData.get('caracteristics') as string,
      // tags: JSON.parse(formData.get('tags') as string),
      // profits: JSON.parse(formData.get('profits') as string),
      // caracteristics: JSON.parse(formData.get('caracteristics') as string),
      //   imagesFiles: formData.get('files'),
    }
    const arrayTags = data.tags
      ?.split(',')
      // .map((t) => t.trim())
      .map((item) => item.replace(/"/g, '').trim())
      .filter(Boolean)
    const arrayProfits = data.profits
      ?.split(',')
      .map((item) => item.replace(/"/g, '').trim())
      .filter(Boolean)
    const arrayCaracteristics = data.caracteristics
      ?.split(',')
      .map((item) => item.replace(/"/g, '').trim())
      .filter(Boolean)

    // const prisma = new PrismaClient()
    const newProduct = await prisma.product.create({
      data: {
        title: data.title,
        new_price: parseInt(data.newPrice),
        old_price: parseInt(data.oldPrice),
        // product_category: 'mazou product',
        product_note: parseInt(data.note),
        testimonial: parseInt(data.review),
        description: data.description,
        images: {
          create: fileUrls.map((i) => ({ url: i })),
        },
        product_profits: {
          create: arrayProfits.map((p: string) => ({ label: p })),
        },
        product_tags: {
          create: arrayTags.map((t: string) => ({ label: t })),
        },
        product_caracteristics: {
          create: arrayCaracteristics.map((c: string) => ({ label: c })),
        },
      },
    })

    return NextResponse.json({
      success: true,
      product: JSON.stringify(newProduct),
    })
  } catch (error) {
    console.error('Erreur upload :', error)
    return NextResponse.json(
      { error: "Erreur lors de l'upload." },
      { status: 500 },
    )
  }
}
