'use client'

import { MazouBreadcrumbs } from '@/components/MazouBreadcrumbs'
import { title } from '@/components/primitives'
import { mzToast } from '@/lib/utils'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Eye, EyeOff } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function BlogPage() {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  // const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // setError('')
    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: formData,
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ user, password }),
      })

      if (res.ok) {
        mzToast('Connexion validée', 'success')
        router.push('/admin/dashboard')
        // redirect('/admin/dashboard')
      } else {
        const data = await res.json()
        // setError(data.error || 'Erreur inconnue')
        mzToast(data.error || 'Erreur inconnue', 'danger')
      }
    } catch {
      // setError('Erreur réseau')
      mzToast('Erreur réseau', 'danger')
    }
  }

  const hideButton = (
    <button
      aria-label="Changer la visibilité du mot de passe"
      className="focus:outline-solid outline-transparent focus:ring-blue-500 rounded-lg p-1 in-focus-visible:ring-0"
      type="button"
      onClick={toggleVisibility}
    >
      {isVisible ? (
        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <Eye className="text-2xl text-default-400 pointer-events-none" />
      )}
    </button>
  )

  return (
    <>
      <MazouBreadcrumbs />
      <div className="mz_container">
        <div className="mz_container-body mz_container-resp h-full">
          <div className="mz_container-bloc">
            <div className="w-full md:w-2/3 lg:w-3/5 mx-auto">
              <h3 className="mz_Heading">Se connecter</h3>
              <form onSubmit={handleLogin} className="space-y-2">
                <Input
                  type="text"
                  isRequired
                  label="Nom d'utilisateur"
                  autoFocus
                  size="lg"
                  name="user"
                />
                <Input
                  endContent={hideButton}
                  label="Mot de Passe"
                  type={isVisible ? 'text' : 'password'}
                  size="lg"
                  name="password"
                  className="appearance-none"
                  isRequired
                />
                <div className="mt-10">
                  <Button type="submit" className="mz_btn-submit" size="lg">
                    Se connecter
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
