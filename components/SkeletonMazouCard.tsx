import { Image } from '@heroui/image'
import { cn, formatPrice } from '@/config/utils'
import Produits from '../app/dataMazou.json'
import { Link } from '@heroui/link'
import { mz_button as buttonStyles } from '@/components/primitives'
import { Button } from '@heroui/button'
import { EyeIcon, ShoppingBagIcon, ShoppingCart } from 'lucide-react'

export default function SkeletonMazouCard() {
  return (
    <div className="w-full border border-transparent mz_trans hover:border-brand-primary-400/50 md:shadow-small rounded-large text-foreground relative dark:bg-dark-div bg-white">
      <div className="absolute flex flex-col top-1/3 -left-2 gap-1 font-bold text-lg z-10">
        <div className="mz_priceBand bg-gray-400/75 animate-pulse">
          <div className="mz_priceBand-tip-secondary h-6 w-12"></div>
        </div>
        <div className="text-white mz_priceBand bg-brand-primary-400 animate-pulse">
          <div className="mz_priceBand-tip-primary h-6 w-12"></div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-t-large z-0">
        <div
          style={{ width: 418, height: 250 }}
          className="bg-gray-200 animate-pulse"
        ></div>
      </div>
      <div className="md:items-center flex flex-col px-2 py-2 md:px-3 w-full">
        <div className="py-2 md:py-5 md:px-2 font-bold w-full animate-pulse">
          <div className="bg-gray-200 animate-pulse h-6 w-full"></div>
        </div>
        <div className="flex md:justify-center md:items-center gap-1 w-full">
          <Button
            color="default"
            className="bg-brand-primary-500/35 w-full sm:w-auto flex-1 h-10 animate-pulse"
            variant="flat"
            radius="sm"
          ></Button>
        </div>
      </div>
    </div>
  )
}
