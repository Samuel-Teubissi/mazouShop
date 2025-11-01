import { useEffect, useState } from 'react'
import { useCartStore } from '../lib/cartStore' // Assurez-vous que le chemin est correct

/**
 * Hook pour gérer l'hydratation initiale du store Zustand.
 * Il assure que le chargement du panier (lecture du cookie)
 * ne se fait qu'une seule fois, côté client, après le rendu initial.
 * @returns boolean true si l'hydratation est terminée.
 */
export const useHydrationCart = (): boolean => {
  // État local pour suivre si l'hydratation a eu lieu
  const [hydrated, setHydrated] = useState(false)

  // Récupérer la fonction de chargement du store
  const loadInitialCart = useCartStore((state) => state.loadInitialCart)

  useEffect(() => {
    // Cette fonction s'exécute uniquement côté client après le montage.
    if (!hydrated) {
      loadInitialCart()
      setHydrated(true)
    }
  }, [hydrated, loadInitialCart])

  return hydrated
}
