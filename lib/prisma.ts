// import { PrismaClient } from '@/generated/prisma'
import { PrismaClient } from '@prisma/client' // Importation propre et standard
import { withAccelerate } from '@prisma/extension-accelerate'

// --------------------------------------------------------------------------------
// Documentation sur ce pattern (Singleton + Accelerate) :
// https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/connection-management
// https://prisma.io/docs/orm/prisma-client/setup-and-configuration/accelerate
// --------------------------------------------------------------------------------

// Déclare une variable globale pour stocker le client Prisma.
// En TypeScript, 'globalThis' est le bon type pour l'environnement global.
declare global {
  // eslint-disable-next-line no-var
  var prisma: ReturnType<typeof createPrismaClient> | undefined
}

const createPrismaClient = () => {
  /**
   * Crée une nouvelle instance de PrismaClient et l'étend avec
   * 'withAccelerate()'. Accelerate fournit un pool de connexions global
   * et une mise en cache, ce qui est crucial pour les environnements Serverless
   * comme Vercel.
   */
  return new PrismaClient().$extends(withAccelerate())
}

/**
 * Logique pour le Singleton Pattern.
 *
 * En mode 'development', Next.js utilise le "Hot Reload". Chaque rechargement
 * pourrait créer une nouvelle instance de PrismaClient, épuisant rapidement
 * les connexions à la base de données.
 *
 * Nous stockons donc notre client dans 'globalThis.prisma'.
 * 'globalThis' n'est pas affecté par le Hot Reload.
 *
 * En 'production', nous créons toujours une nouvelle instance, mais
 * 'withAccelerate' gère le pooling de manière efficace.
 */
const prisma = globalThis.prisma ?? createPrismaClient()

// Exporte le client Prisma instancié et étendu.
export default prisma

// Si nous ne sommes pas en production, nous assignons le client à la variable globale.
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
