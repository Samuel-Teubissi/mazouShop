'use client'

import { Button, ButtonProps } from '@heroui/button'
import { Link } from '@heroui/link'
import { ShoppingCart, Trash2Icon } from 'lucide-react'
import clsx from 'clsx'
import { mz_button } from '@/components/primitives'
import Produits from '../app/dataMazou.json'
import Image from 'next/image'
import { cn, formatPrice } from '@/config/utils'
import { useCart } from '@/lib/useCart'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@heroui/modal'
import { MazouModalCart } from './MazouModalCart'

export const Modal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const [cartProducts, setCartProducts] = useState([]);
  // const [loadingCartProducts, setLoadingCartProducts] = useState(true)

  return (
    <>
      <Button
        // as={Link}
        color="default"
        // href="#"
        variant="flat"
        className={clsx(
          mz_button({
            hoverText: 'secondary',
            hoverBkg: true,
            border: true,
          }),
          'min-w-auto mz_dark-btn rounded-lg',
        )}
        startContent={<ShoppingCart className="w-4 h-4" />}
        onPress={() => onOpen()}
      >
        <span className="hidden md:block">Panier</span>
      </Button>
      <MazouModalCart isOpen={isOpen} onClose={onClose} />
    </>
  )
}
