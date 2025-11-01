// types.ts
import type { Prisma } from '@/generated/prisma/client'

/**
 * Interface pour un Produit dans le panier.
 * Inclut l'ID et les informations affichables (nom, prix).
 */
export interface CartProduct {
  cartID: string | number
  cartPrice: number
  // Ajoutez ici toutes les propriétés nécessaires (image, options, etc.)
}

/**
 * Interface pour une Ligne du panier.
 * Combinaison d'un produit et de la quantité.
 */
export interface CartItem extends CartProduct {
  cartQty: number
}

/**
 * Type pour le contenu brut du panier (un tableau de CartItem).
 */
export type CartContent = CartItem[]

/**
 * Interface pour le Hook de gestion du panier.
 */ // Interfaces pour les données complexes (relations)
export interface ProductTag {
  label: string
}

// Interface pour la ligne de panier enrichie (combinaison de CartItem et des données de Prisma)
export interface EnrichedCartItem extends CartItem {
  // Champs simples
  id: number
  title: string
  new_price: number
  // Relations (basées sur votre sélection Prisma)
  images: { url: string }[]
  product_tags: ProductTag[]
}

export interface CartManagerHook {
  // Remplacer 'cart' par 'enrichedCart' pour l'affichage
  enrichedCart: EnrichedCartItem[]
  isLoadingCart: boolean // Ajout d'un état de chargement
  cart: CartContent
  totalCartItems: number
  addCartProduct: (product: CartProduct, quantity?: number) => void
  removeCartProduct: (productId: string | number, quantity?: number) => void
  clearCart: () => void
  // Vous pouvez ajouter getCartTotal, updateQuantity, etc.
}

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    images: true
    product_profits: true
    product_tags: true
    product_caracteristics: true
  }
}>
interface Products {
  products: ProductWithCategory[]
}
