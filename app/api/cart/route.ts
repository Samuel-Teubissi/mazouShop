// pages/api/products/details.ts

import { prisma } from '@/lib/clientPrisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

// ⚠️ Initialisez PrismaClient une seule fois pour éviter les problèmes de connexion
// const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // 1. Vérifiez que la méthode est POST (plus sécurisé et adapté pour envoyer une liste d'IDs)

  // 2. Extrayez les IDs du corps de la requête
  // Utiliser .json() sur NextRequest pour lire le corps
  const body = await req.json()
  const { ids } = body as { ids: (string | number)[] }

  if (ids || Array.isArray(ids)) {
    try {
      // 3. Interrogez la base de données avec Prisma
      // Utilisez `in` pour récupérer tous les produits dont l'ID est dans le tableau fourni.
      const products = await prisma.product.findMany({
        where: {
          id: {
            in: ids.map((id) => Number(id)), // Assurez-vous que les IDs sont des nombres si votre DB utilise des entiers
          },
        },
        // 4. Sélectionnez uniquement les champs nécessaires pour le panier (optimisation)
        select: {
          id: true,
          title: true,
          new_price: true,
          images: {
            select: {
              // Vous devez utiliser un select imbriqué pour les relations
              url: true, // Exemple: ne sélectionner que l'URL de l'image
            },
          },
          product_tags: {
            select: {
              label: true,
            },
          },
          // ... ajoutez d'autres champs nécessaires
        },
      })

      // 5. Retournez les données au format JSON
      // 200 OK
      return NextResponse.json(products, { status: 200 })
    } catch (error) {
      console.error('Prisma query failed:', error)
      // 500 Internal Server Error
      return NextResponse.json(
        { message: 'Failed to fetch product details from the database.' },
        { status: 500 },
      )
    }
  }
}
