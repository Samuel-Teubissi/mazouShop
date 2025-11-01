'use client'

import { formatPrice } from '@/config/utils'
import { useCartStore } from '@/lib/cartStore'
import { useCart } from '@/lib/useCart'
import { CartManagerHook } from '@/types/useCartType'
import { Button } from '@heroui/button'
import {
  Modal as HeroUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { Spinner } from '@heroui/spinner'

export const MazouModalCart = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean | undefined
  onClose: () => void
}) => {
  //   const {
  //     enrichedCart,
  //     isLoadingCart,
  //     removeCartProduct,
  //     totalCartItems,
  //     clearCart,
  //   } = useCartStore(
  //     useShallow((state: CartManagerHook) => ({
  //       enrichedCart: state.enrichedCart,
  //       isLoadingCart: state.isLoadingCart,
  //       removeCartProduct: state.removeCartProduct,
  //       totalCartItems: state.totalCartItems,
  //       clearCart: state.clearCart,
  //     })),
  //   )
  //   const enrichedCart = useCartStore((state) => state.enrichedCart)
  //   const isLoadingCart = useCartStore((state) => state.isLoadingCart)
  //   // const removeCartProduct = useCartStore((state) => state.removeCartProduct)
  //   const totalCartItems = useCartStore((state) => state.totalCartItems)
  // const clearCart = useCartStore((state) => state.clearCart)

  //   const { onClose } = useDisclosure()

  const {
    enrichedCart,
    fetchEnrichedData,
    totalCartItems,
    isLoadingCart,
    cart,
    removeCartProduct,
  } = useCart()

  useEffect(() => {
    if (isOpen) {
      fetchEnrichedData(cart) // 🔁 refetch les données du panier
    }
  }, [isOpen, fetchEnrichedData])

  return (
    <HeroUIModal
      isOpen={isOpen}
      size="4xl"
      onClose={onClose}
      scrollBehavior="inside"
      className="dark:bg-dark-div"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 mz_Heading px-0 ml-4 dark:bg-dark-div">
              Votre Panier {cart.length > 0 && `(${cart.length} article(s))`}
            </ModalHeader>
            <ModalBody>
              {isLoadingCart ? (
                <div className="w-full h-32 flex justify-center items-center">
                  <Spinner variant="gradient" color="danger" />
                </div>
              ) : totalCartItems === 0 ? (
                <div className="w-full h-32 flex justify-center items-center">
                  Votre panier est vide.
                </div>
              ) : (
                <div className="mz_cart space-y-2 h-auto">
                  {enrichedCart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-2 py-3 border-b-2 border-gray-300 dark:border-gray-700 last:border-transparent dark:last:border-transparent"
                    >
                      <div className="hidden md:flex items-center px-2 font-bold">
                        {item.id}
                      </div>
                      <div className="min-h-[100px] w-auto flex justify-center basis-40 rounded-md overflow-hidden">
                        {/* <img
                      src={item.img[item]}
                      alt={item.title}
                      width={158}
                      height={158}
                    /> */}
                        {item.images && item.images.length > 0 && (
                          <Image
                            alt={item.title}
                            src={item.images[0].url}
                            width={158}
                            height={158}
                            className="aspect-square"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-between gap-1 flex-1">
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-lg">{item.title}</div>
                          <div className="text-small text-gray-700 dark:text-gray-400 flex gap-2 flex-wrap line-clamp-2">
                            {item.product_tags.map((tag) => (
                              <span
                                key={tag.label}
                                className="underline cursor-default min-w-fit"
                              >
                                {tag.label}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl sm:text-3xl font-bold text-brand-primary-500 dark:text-brand-primary-400 min-w-fit">
                            {formatPrice(item.new_price)} F
                          </span>
                          <div className="flex items-center gap-1 min-w-fit text-gray-700 hover:text-brand-primary-400 dark:text-gray-400 dark:hover:text-brand-primary-400">
                            <Trash2Icon />
                            <button
                              onClick={() => removeCartProduct(item.id)}
                              className="hidden sm:inline-block appearance-none"
                            >
                              Retirer du panier
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ModalBody>
            <ModalFooter className="gap-10 border-t border-gray-300 dark:border-gray-700">
              <div className="border-b-2 border-brand-primary-500 flex items-center px-4 gap-2">
                <span>TOTAL:</span>
                <span className="text-2xl font-bold  min-w-fit">
                  {totalCartItems} F
                </span>
              </div>
              <Button
                className="mz_btn-submit"
                onPress={onClose}
                isDisabled={totalCartItems === 0}
              >
                Commander
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </HeroUIModal>
  )
}
