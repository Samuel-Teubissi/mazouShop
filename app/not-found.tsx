'use client'

import Link from 'next/link'
import { Home, TriangleAlertIcon } from 'lucide-react'
import { Button } from '@heroui/button'

export default function NotFound() {
  return (
    <div className="mz_container-body px-3 mb-8">
      <div className="min-h-75 w-full flex flex-col justify-center items-center bg-gray-200/40 dark:bg-dark-div gap-2">
        <TriangleAlertIcon strokeWidth={1.5} width={100} height={100} />
        <h1 className="text-4xl font-bold mb-2">Page introuvable</h1>
        <p className="text-gray-500 mb-6">Il semble que tu sois perdu...</p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
