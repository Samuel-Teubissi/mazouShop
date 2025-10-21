'use client'

import { Link } from '@heroui/link'
import { Snippet } from '@heroui/snippet'
import { Code } from '@heroui/code'

import { title, subtitle } from '@/components/primitives'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import Produits from './dataMazou.json'
// import Image from 'next/image'
import { SearchInput } from '@/components/SearchInput'
import { cn, formatPrice } from '@/config/utils'
import { mz_button as buttonStyles } from '@/components/primitives'
import { Image } from '@heroui/image'
import MazouCard from '@/components/MazouCard'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { motion } from 'framer-motion'
import { forwardRef, useEffect, useState } from 'react'
import { TextLoop } from '@/components/motion-primitives/text-loop'
import { PrismaClient } from '@/generated/prisma'
import AllProducts from '@/components/AllProducts'
import type { Prisma } from '@/generated/prisma/client'

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    images: true
    product_profits: true
    product_tags: true
    product_caracteristics: true
  }
}>

export default function Home() {
  const [queryParams, setQueryParams] = useState({
    query: '',
    category: '',
  })
  const { query, category } = queryParams
  const [productsResults, setProductsResults] = useState<ProductWithCategory[]>(
    [],
  )
  // const [filteredResults, setFilteredResults] = useState();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter(
          (product: ProductWithCategory) =>
            query
              ? product.title.toLowerCase().includes(query.toLowerCase())
              : true,

          // && (queryParams.category && product.product_tags.includes(queryParams.category))
        )

        console.log('queryParams', queryParams, filteredProducts)
        setProductsResults(filteredProducts)
      })
  }, [queryParams])

  interface BoxProps {
    children?: React.ReactNode
    className?: string
  }
  const Box = forwardRef<HTMLDivElement, BoxProps>(({ children }, ref) => {
    return <div ref={ref}>{children}</div>
  })
  const MotionBox = motion(Box)
  const mzAnimateTitle = {
    start: { opacity: 0, y: -15 },
    end: { opacity: 1, y: 0 },
  }
  const mzAnimateTitleLoop = {
    initial: {
      y: 20,
      rotateX: 90,
      opacity: 0,
      filter: 'blur(4px)',
    },
    animate: {
      y: 0,
      rotateX: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: {
      y: -20,
      rotateX: -90,
      opacity: 0,
      filter: 'blur(4px)',
    },
  }
  const mzTitleLoop = [
    'en toute simplicité',
    'juste en un clic',
    'sans prise de tête',
  ]

  return (
    <>
      <section className="flex flex-col gap-6 px-4 pb-10 md:pb-10 pt-[120px] lg:pt-[30px] items-center">
        <div className="inline-block max-w-xl text-center justify-center flex">
          <MotionBox
            variants={mzAnimateTitle}
            initial={'start'}
            animate={'end'}
          >
            <span className={title({ size: 'lg' })}>Bienvenue sur&nbsp;</span>
            <span className="bg-gradient-to-br from-[#E44E4E] to-[#831f16] bg-clip-text text-transparent text-5xl lg:text-7xl tracking-tight inline font-black">
              Mazou&nbsp;
            </span>
          </MotionBox>
        </div>
        <div className="flex gap-3 text-center px-4 lg:max-w-4xl tracking-wide">
          <MotionBox
            variants={mzAnimateTitle}
            initial={'start'}
            animate={'end'}
          >
            Découvrez nos articles, choisissez ce qui vous plaît et commandez
            <span className="min-w-[200px] inline-block my-2">
              <span className="text-brand-primary-400 font-bold px-4 py-2 rounded-md border border-dashed border-brand-primary-500">
                <TextLoop
                  className="overflow-y-clip"
                  transition={{
                    type: 'spring',
                    stiffness: 900,
                    damping: 80,
                    mass: 10,
                  }}
                  variants={mzAnimateTitleLoop}
                >
                  {mzTitleLoop.map((mzTL, i) => (
                    <span>{mzTL} !</span>
                  ))}
                </TextLoop>
              </span>
            </span>
            <br /> Une fois validé, vous serez redirigé sur WhatsApp pour
            finaliser votre livraison à domicile.
          </MotionBox>
        </div>
        <div className="mt-3 md:mt-7">
          <SearchInput onQueryChange={setQueryParams} />
        </div>
      </section>

      <div className="mz_container">
        <AllProducts products={productsResults} />
      </div>
    </>
  )
}
