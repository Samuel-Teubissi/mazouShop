import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

// Helper pour gérer l'upload d'un seul fichier
export async function handleFileUpload(file: File): Promise<string> {
  if (!file) return ''

  // Convertir le fichier en buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Générer un nom unique
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  const filename = `${uniqueSuffix}-${file.name}`

  // Créer le dossier s'il n'existe pas
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  // Construire le chemin complet du fichier
  const filepath = join(uploadDir, filename)

  // Écrire le fichier sur le disque
  const uint8Array = new Uint8Array(bytes)
  await writeFile(filepath, uint8Array)

  // Retourner le chemin accessible depuis le navigateur
  return `/uploads/${filename}`
}
