'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react'
import Cookies from 'js-cookie'

// ----------------------
// 🔹 Types
// ----------------------

export interface CartProduct {
  cartID: number
  cartQty: number
  cartPrice: number
}

// export interface EnrichedCartItem extends CartProduct {
//   name: string
//   images?: string[]
//   product_tags?: string[]
//   //   [key: string]: any
// }
export interface ProductTag {
  label: string
}
interface EnrichedCartItem extends CartProduct {
  // Champs simples
  id: number
  title: string
  new_price: number
  // Relations (basées sur votre sélection Prisma)
  images: { url: string }[]
  product_tags: ProductTag[]
}

interface CartContextType {
  cart: CartProduct[]
  enrichedCart: EnrichedCartItem[]
  isLoadingCart: boolean
  totalCartItems: number
  addCartProduct: (product: CartProduct, quantity?: number) => void
  removeCartProduct: (id: string | number) => void
  clearCart: () => void
  fetchEnrichedData: (cart: CartProduct[]) => Promise<void>
}

// ----------------------
// 🔹 Constantes
// ----------------------

const COOKIE_NAME = 'userCart'
const COOKIE_OPTIONS = {
  expires: 7,
  sameSite: 'Lax' as const,
  path: '/',
}
const PRODUCT_API_ENDPOINT = '/api/cart'

// ----------------------
// 🔹 Création du Contexte
// ----------------------

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([])
  const [enrichedCart, setEnrichedCart] = useState<EnrichedCartItem[]>([])
  const [isLoadingCart, setIsLoadingCart] = useState(true)
  const [lastFetchedCart, setLastFetchedCart] = useState<CartProduct[]>([])

  const saveCartToCookie = (cart: CartProduct[]): void => {
    Cookies.set(COOKIE_NAME, JSON.stringify(cart), COOKIE_OPTIONS)
  }
  const updateCart = useCallback((newCart: CartProduct[]) => {
    saveCartToCookie(newCart)
    // const parsed = JSON.parse(COOKIE_NAME) as CartProduct[]
    // setCart(newCart)

    // fetchEnrichedData(newCart)
  }, [])
  // ----------------------
  // 🔸 Charger depuis les cookies
  // ----------------------
  useEffect(() => {
    const savedCart = Cookies.get(COOKIE_NAME)
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart) as CartProduct[]
        setCart(parsed)
        fetchEnrichedData(parsed) // 🟩 charger les détails produits dès le départ
      } catch (err) {
        console.error('Erreur lors du parsing du cookie:', err)
        Cookies.remove(COOKIE_NAME)
      }
    }
    setIsLoadingCart(false)
  }, [])

  // ----------------------
  // 🔸 Sauvegarde automatique dans les cookies
  // ----------------------

  // useEffect(() => {
  //   if (!isLoadingCart) {
  //     Cookies.set(COOKIE_NAME, JSON.stringify(cart), )
  //   }
  // }, [cart, isLoadingCart])

  // ----------------------
  // 🔸 Récupération des données enrichies
  // ----------------------
  const fetchEnrichedData = useCallback(
    async (currentCart: CartProduct[]) => {
      const cartToFetch = currentCart || cart
      // 🔹 Vérifier si le panier a changé depuis le dernier fetch
      const isSameAsLast =
        JSON.stringify(cartToFetch) === JSON.stringify(lastFetchedCart)
      if (isSameAsLast) return // pas besoin de refetch

      if (cartToFetch.length === 0) {
        setEnrichedCart([])
        setLastFetchedCart([])
        return
      }

      setIsLoadingCart(true)
      try {
        const productIds = cartToFetch.map((item) => item.cartID)
        const response = await fetch(PRODUCT_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: productIds }),
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits')
        }

        const productDetails: EnrichedCartItem[] = await response.json()

        // 1. Identifier les IDs qui ont été trouvés dans la DB
        const foundIds = new Set(productDetails.map((p) => p.id))

        // 2. Nettoyer le panier (retirer les produits orphelins)
        const cleanedCart = cartToFetch.filter((item) =>
          foundIds.has(item.cartID),
        )
        // console.log(
        //   'productDetails',
        //   productDetails,
        //   'cartToFetch',
        //   cartToFetch,
        //   'foundIds',
        //   foundIds,
        //   'cleanedCart',
        //   cleanedCart,
        // )

        // 3. Mettre à jour l'état si un nettoyage a eu lieu
        if (cleanedCart.length !== cartToFetch.length) {
          // updateCart(cleanedCart) // Met à jour l'état 'cart' et le cookie
          saveCartToCookie(cleanedCart)
        }

        setEnrichedCart(productDetails)
        setLastFetchedCart(cartToFetch)

        // 🔹 mémoriser le panier fetché
        // // Fusionner le panier local avec les détails
        // const enriched = currentCart
        //   .map((cartItem) => {
        //     const details = productDetails.find(
        //       (p) => p.cartID === cartItem.cartID,
        //     )
        //     console.log(
        //       'productDetails',
        //       productDetails,
        //       'details',
        //       details,
        //       'cartItem',
        //       cartItem,
        //     )
        //     if (details) {
        //       return { ...cartItem, ...details }
        //     }
        //     return null
        //   })
        //   .filter((item): item is EnrichedCartItem => item !== null)

        // setEnrichedCart(enriched)
      } catch (err) {
        console.error('Erreur de fillCart:', err)
        setEnrichedCart([])
      } finally {
        setIsLoadingCart(false)
      }
    },
    [cart, lastFetchedCart],
  )

  // ----------------------
  // 🔸 Fonctions principales
  // ----------------------
  const addCartProduct = (product: CartProduct, quantity = 1) => {
    setCart((prev) => {
      const newCart = [...prev]
      const existingIndex = newCart.findIndex(
        (item) => item.cartID === product.cartID,
      )

      if (existingIndex > -1) {
        newCart[existingIndex].cartQty += quantity
      } else {
        newCart.push({ ...product, cartQty: quantity })
      }

      saveCartToCookie(newCart)
      fetchEnrichedData(newCart)
      return newCart
    })
  }

  const removeCartProduct = (id: string | number) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.cartID !== id)
      //   fetchEnrichedData(newCart)
      saveCartToCookie(newCart)
      return newCart
    })
  }

  const clearCart = () => {
    Cookies.remove(COOKIE_NAME)
    setCart([])
    setEnrichedCart([])
  }

  // ----------------------
  // 🔸 Total d’articles
  // ----------------------
  const totalCartItems = enrichedCart.reduce(
    (sum, item) => sum + item.new_price,
    0,
  )

  // ----------------------
  // 🔸 Valeur du contexte
  // ----------------------
  const value: CartContextType = {
    cart,
    enrichedCart,
    isLoadingCart,
    totalCartItems,
    addCartProduct,
    removeCartProduct,
    clearCart,
    fetchEnrichedData,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ----------------------
// 🔹 Hook personnalisé
// ----------------------
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider")
  }
  return context
}
