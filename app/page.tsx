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
import { PrismaClient } from '@/generated/prisma'
import AllProducts from '@/components/AllProducts'
import type { Prisma } from '@/generated/prisma/client'
import { useRouter } from 'next/navigation'
import SkeletonMazouList from '@/components/SkeletonMazouList'
import { HomeBigTitle } from '@/components/mazouComponent'

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    images: true
    product_profits: true
    product_tags: true
    product_caracteristics: true
  }
}>

export default function Home() {
  const router = useRouter()
  const [queryParams, setQueryParams] = useState({
    query: '',
    category: '',
  })
  const [productsResults, setProductsResults] = useState<ProductWithCategory[]>(
    [],
  )
  const [loadingProducts, setLoadingProducts] = useState(true)
  // const [filteredResults, setFilteredResults] = useState();

  const { query, category } = queryParams
  useEffect(() => {
    console.log('queryParams', queryParams)

    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category) params.set('categ', category)
    // router.replace(`?${params.toString()}`, { scroll: false })
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        // const filteredProducts = data.filter(
        //   (product: ProductWithCategory) =>
        //     query
        //       ? product.title.toLowerCase().includes(query.toLowerCase())
        //       : true,
        //   // && (queryParams.category && product.product_tags.includes(queryParams.category))
        // )
        // console.log('queryParams', queryParams, filteredProducts)
        setProductsResults(data)
      })
      .finally(() => setLoadingProducts(false))
  }, [query, category])

  return (
    <>
      <section className="flex flex-col gap-6 px-4 pb-10 md:pb-10 pt-[120px] lg:pt-[30px] items-center">
        <HomeBigTitle />
        <div className="mt-3 md:mt-7">
          <SearchInput onQueryChange={setQueryParams} />
        </div>
      </section>

      <div className="mz_container">
        {loadingProducts && <SkeletonMazouList />}
        <AllProducts products={productsResults} />
      </div>
    </>
  )
}
