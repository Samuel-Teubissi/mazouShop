'use client'

import { SearchInput } from '@/components/SearchInput'
import { forwardRef, Suspense, useEffect, useState } from 'react'
import AllProducts from '@/components/AllProducts'
// import type { Prisma } from '@/generated/prisma/client'
import { Prisma } from '@prisma/client'
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
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category) params.set('categ', category)
    // router.replace(`?${params.toString()}`, { scroll: false })
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProductsResults(data)
      })
      .finally(() => setLoadingProducts(false))
  }, [query, category])

  return (
    <>
      <section className="flex flex-col gap-6 px-4 pb-10 md:pb-10 pt-[120px] lg:pt-[30px] items-center">
        <HomeBigTitle />
        <div className="mt-3 md:mt-7">
          <Suspense fallback={null}>
            <SearchInput onQueryChange={setQueryParams} />
          </Suspense>
        </div>
      </section>

      <div className="mz_container">
        {loadingProducts ? (
          <SkeletonMazouList />
        ) : (
          <AllProducts products={productsResults} />
        )}
      </div>
    </>
  )
}
