import { Image } from '@heroui/image'
import { cn, formatPrice } from '@/config/utils'
import Produits from '../app/dataMazou.json'
import { Link } from '@heroui/link'
import { mz_button as buttonStyles } from '@/components/primitives'
import { Button } from '@heroui/button'
import {
  EyeIcon,
  ShoppingBagIcon,
  ShoppingCart,
  Trash2Icon,
} from 'lucide-react'
import { useCart } from '@/lib/useCart'
import { mzToast } from '@/lib/utils'
import { CartProduct } from '@/types/useCartType'
import { useMemo } from 'react'
import { useCartStore } from '@/lib/cartStore'

interface Product {
  id: number
  title: string
  new_price: number
  old_price: number
  images: string[]
  // product_category: string
  product_note: number
  testimonial: number
  description: string
  product_profits: string[]
  product_tags: string[]
  product_caracteristics: string[]
}

export default function MazouCard(props: { Item: Product }) {
  const item = props.Item
  // 🚨 On récupère la fonction addProduct du hook
  // const { cart, addCartProduct, removeCartProduct } = useCart()
  // const { cart, addCartProduct, removeCartProduct } = useCartStore(
  //   (state) => ({
  //     enrichedCart: state.enrichedCart,
  //     addCartProduct: state.addCartProduct,
  //     removeCartProduct: state.removeCartProduct,
  //   }),
  // )

  const {
    cart,
    addCartProduct,
    removeCartProduct,
    totalCartItems,
    isLoadingCart,
  } = useCart()

  const isInCart = cart.some((c) => c.cartID === item.id)
  const isAdded = !!isInCart

  const handleAdd = () => {
    if (isInCart) {
      removeCartProduct(item.id)
      mzToast(`Article retiré du panier !`, 'default')
    } else {
      addCartProduct({ cartID: item.id, cartPrice: item.new_price, cartQty: 1 })
      mzToast(`Article ajouté au panier !`, 'default')
    }
  }
  // 1. Déterminer si le produit est déjà dans le panier
  // const itemInCart = useMemo(() => {
  //   // Recherche l'article dans le panier enrichi par son ID
  //   return cart.find((i) => item.id === i.cartID)
  // }, [cart, item.id])

  // console.log('itemInCart', itemInCart)

  // // Détermine si l'article est présent (pour le rendu conditionnel)
  // const isAdded = !!itemInCart
  // // La quantité actuelle (si l'article est dans le panier)
  // // const currentQty = itemInCart ? itemInCart.cartQty : 0

  // const handleAdd = () => {
  //   // 🚨 Appel de la fonction pour mettre à jour le panier (et le cookie)
  //   if (!isAdded) {
  //     const cartProduct = {
  //       cartID: item.id,
  //       cartPrice: item.new_price,
  //       cartQty: 1,
  //     }
  //     addCartProduct(cartProduct, 1)
  //     mzToast(`Article ajouté au panier !`, 'default')
  //   } else {
  //     // Si vous voulez retirer TOUT l'article (comportement d'un toggle simple)
  //     removeCartProduct(item.id)
  //     mzToast(`Article retiré du panier !`, 'default')
  //   }
  // }

  return (
    <div className="w-full border border-transparent mz_trans hover:border-brand-primary-400/50 md:shadow-small rounded-large text-foreground relative dark:bg-dark-div bg-white">
      <div className="absolute flex flex-col top-1/3 -left-2 gap-1 font-bold text-lg z-10">
        <span className="line-through mz_priceBand bg-gray-400/75 text-medium dark:text-black/90">
          <span className="mz_priceBand-tip-secondary"></span>
          {formatPrice(item.old_price)} F
        </span>
        <span className="text-white mz_priceBand bg-brand-primary-400">
          <span className="mz_priceBand-tip-primary"></span>
          {formatPrice(item.new_price)} F
        </span>
      </div>
      <div className="relative overflow-hidden rounded-t-large z-0">
        <Image
          isZoomed
          alt={item.title}
          radius="none"
          className="object-cover w-full h-[250]"
          src={item.images[0]}
          width={418}
          height={250}
        />
      </div>
      <div className="md:items-center flex flex-col px-2 py-2 md:px-3 w-full">
        <div className="py-2 md:py-5 md:px-2 font-bold text-center dark:text-dark-text">
          <Link
            // href={'/product/' + item.id + '?categorie=' + item.product_category}
            href={'/product/' + item.id}
            className="text-inherit"
          >
            <span className="line-clamp-1" title={item.title}>
              {item.title}
            </span>
          </Link>
        </div>
        <div className="flex md:justify-center md:items-center gap-1 w-full">
          <Button
            color="default"
            // className="bg-gray-200/80 hover:bg-brand-primary-500 dark:text-white w-full sm:w-auto flex-1 dark:text-white dark:hover:border-brand-primary-400 dark:bg-dark-btn dark:hover:bg-brand-primary-500/70 opacity-100 hover:opacity-100 text-black hover:text-white"
            className={`${isAdded ? 'bg-gray-200/80' : 'bg-brand-primary-500/20'} hover:bg-brand-primary-500 dark:text-white w-full sm:w-auto flex-1 dark:text-white dark:hover:border-brand-primary-400 dark:bg-dark-btn dark:hover:bg-brand-primary-500/70 opacity-100 hover:opacity-100 text-black hover:text-white`}
            variant="flat"
            radius="sm"
            onPress={handleAdd}
          >
            {isAdded ? <Trash2Icon size={15} /> : <ShoppingBagIcon size={15} />}
            <span className="sm:inline hidden">
              {isAdded ? 'Retirer du panier' : 'Ajouter au panier'}
            </span>
          </Button>
          {/* <Button
            as={Link}
            variant="bordered"
            href={'/product/' + item.id + '?categorie=' + item.product_category}
            className="bg-white/50 mz_dark-btn hover:bg-brand-primary-500/5 dark:text-white"
          >
            <EyeIcon size={15} />
            <span className="sm:inline hidden">Voir les détails</span>
          </Button> */}
        </div>
        {/* <Link
          href={'/product/' + item.id + '?categorie=' + item.product_category}
          className={cn(
            buttonStyles({ hoverText: 'primary' }),
            'text-sm text-gray-500 uppercase',
          )}
        >
          Voir les détails
        </Link> */}
      </div>
    </div>
  )
}
