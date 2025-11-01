import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartProduct, CartContent, EnrichedCartItem } from '@/types/useCartType'

const PRODUCT_API_ENDPOINT = '/api/cart'

interface CartState {
  cart: CartContent
  enrichedCart: EnrichedCartItem[]
  isLoadingCart: boolean
  totalCartItems: number

  fetchEnrichedData: (currentCart: CartContent) => Promise<void>
  addCartProduct: (product: CartProduct, quantity?: number) => void
  removeCartProduct: (productId: string | number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      enrichedCart: [],
      isLoadingCart: false,
      totalCartItems: 0,

      fetchEnrichedData: async (currentCart) => {
        if (currentCart.length === 0) {
          set({ enrichedCart: [], isLoadingCart: false })
          return
        }

        set({ isLoadingCart: true })
        try {
          const ids = currentCart.map((item) => item.cartID)
          const response = await fetch(PRODUCT_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids }),
          })

          if (!response.ok) throw new Error('Fetch error')

          const details: EnrichedCartItem[] = await response.json()

          const merged = currentCart
            .map((cartItem) => {
              const d = details.find((p) => p.id === cartItem.cartID)
              return d ? { ...cartItem, ...d } : null
            })
            .filter((i): i is EnrichedCartItem => !!i)

          set({ enrichedCart: merged })
        } catch (err) {
          console.error(err)
          set({ enrichedCart: [] })
        } finally {
          set({ isLoadingCart: false })
        }
      },

      addCartProduct: (product, quantity = 1) => {
        const { cart } = get()
        const existingIndex = cart.findIndex((i) => i.cartID === product.cartID)

        const newCart =
          existingIndex > -1
            ? cart.map((i, idx) =>
                idx === existingIndex
                  ? { ...i, cartQty: i.cartQty + quantity }
                  : i,
              )
            : [...cart, { ...product, cartQty: quantity }]

        const total = newCart.reduce((sum, i) => sum + i.cartQty, 0)

        set({ cart: newCart, totalCartItems: total })
      },

      removeCartProduct: (id) => {
        const newCart = get().cart.filter((i) => i.cartID !== id)
        const total = newCart.reduce((sum, i) => sum + i.cartQty, 0)
        set({ cart: newCart, totalCartItems: total })
      },

      clearCart: () => set({ cart: [], enrichedCart: [], totalCartItems: 0 }),
    }),
    { name: 'cart-storage' }, // 👈 Zustand persist fera le reste
  ),
)
