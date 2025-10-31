// actions/tags.ts
'use server'
import { PrismaClient } from '@/generated/prisma'

// 👈 Indique à Next.js que toutes les fonctions de ce fichier sont des Server Actions

const prisma = new PrismaClient()

/**
 * Récupère tous les labels de tags uniques de la base de données.
 * @returns Une promesse qui résout en une liste d'objets { label: string }.
 */
export async function getUniqueTagLabels() {
  try {
    const uniqueTagLabels = await prisma.productTag.findMany({
      select: {
        label: true,
      },
      distinct: ['label'],
      orderBy: {
        label: 'asc',
      },
    })

    // Retourne les données brutes
    return { tags: uniqueTagLabels, error: null }
  } catch (error) {
    // Gérer l'erreur et la retourner
    console.error('Erreur lors de la récupération des tags:', error)
    return { tags: [], error: 'Échec de la récupération des tags.' }
  } finally {
    await prisma.$disconnect()
  }
}
