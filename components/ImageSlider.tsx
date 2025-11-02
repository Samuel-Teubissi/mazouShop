'use client' // obligatoire avec Next.js App Router

import { Image } from '@heroui/image'
import NextImage from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Produits from '../app/dataMazou.json'
import { cn } from '@/config/utils'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
// import { ProductImage } from '../generated/prisma/client'
import { ProductImage } from '@prisma/client'

type ArrowProps = {
  onClick: () => void
  label: string
  arrow: 'left' | 'right'
}
type ProductImagesProps = {
  contentImages: ProductImage[]
}

function ButtonSlider({ onClick, label, arrow }: ArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={cn(
        'mz_btn mz_trans absolute top-1/2 -translate-y-1/2 p-2 rounded-full z-10',
        arrow === 'left' ? 'left-1' : 'right-1',
      )}
    >
      {arrow === 'left' ? <ChevronsLeft /> : <ChevronsRight />}
    </button>
  )
}
export default function ImageSlider({ contentImages }: ProductImagesProps) {
  return (
    <Carousel
      className="bg-gray-300 max-w-[500px]"
      showThumbs={false}
      autoPlay
      infiniteLoop
      emulateTouch
      useKeyboardArrows
      autoFocus={false}
      renderArrowPrev={
        (onClickHandler, hasPrev, label) => (
          // hasPrev && (
          <ButtonSlider onClick={onClickHandler} label={label} arrow="left" />
        )
        // )
      }
      renderArrowNext={
        (onClickHandler, hasNext, label) => (
          // hasNext && (
          <ButtonSlider onClick={onClickHandler} label={label} arrow="right" />
        )
        // )
      }
    >
      {/* {[...Array(3)].map((_, i) => ( */}
      {contentImages.map((item, i) => (
        <div key={i} className="flex justify-center">
          <Image
            isZoomed
            as={NextImage}
            alt={'slider ' + (i + 1)}
            src={item.url}
            width={500}
            height={500}
            radius="none"
            loading="lazy"
            className="object-cover w-[500] h-[500]"
          />
        </div>
      ))}
    </Carousel>
  )
}
