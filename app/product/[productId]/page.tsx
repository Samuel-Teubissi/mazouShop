// 'use client'

import ImageSlider from '@/components/ImageSlider'
import { Card, CardBody } from '@heroui/card'
import Produits from '../../dataMazou.json'
import WhatsAppButton from '@/components/WhatsappButton'
import { marked } from 'marked'
import { Button } from '@heroui/button'
import Link from 'next/link'
import { formatPrice } from '@/config/utils'
// import { useEffect, useState } from 'react'
import { Prisma, Product } from '@/generated/prisma'
import { prisma } from '@/lib/clientPrisma'
import { notFound } from 'next/navigation'
// import Breadcrumbs from '@mui/material/Breadcrumbs'
// import Typography from '@mui/material/Typography'
// import Link from '@mui/material/Link'

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    images: true
    product_profits: true
    product_tags: true
    product_caracteristics: true
  }
}>

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  // const [product, setProduct] = useState<ProductWithCategory | null>(null)
  const { productId } = await params
  // const searchParams = await props.searchParams

  const product: ProductWithCategory | null = await prisma.product.findUnique({
    where: { id: parseInt(productId) },
    include: {
      images: true,
      product_profits: true,
      product_tags: true,
      product_caracteristics: true,
    },
  })

  // if (!product) return null
  if (!product) {
    notFound()
  }

  const htmlDescription = marked(product?.description)

  const newPrice = Number(product?.new_price)
  const oldPrice = Number(product?.old_price)
  const promo = Math.round(((oldPrice - newPrice) / oldPrice) * 100)

  return (
    <>
      <div className="text-small text-gray-700 py-3 px-6 max-w-6xl mx-auto box-border dark:text-dark-text mt-[80px] lg:mt-auto">
        <Link
          href="/"
          title="Mazou Homepage"
          className="hover:text-brand-primary-400"
        >
          {'<'} Retourner à l'acceuil
        </Link>
      </div>
      {/* <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            {searchParams.categorie}
            </Link>
            <Typography sx={{ color: 'text.primary' }}>Product</Typography>
            </Breadcrumbs> */}
      <div className="mz_container">
        <div className="mz_container-body mz_container-resp">
          <div className="mz_container-bloc p-5 pt-7 uppercase text-xl font-bold">
            {product.title}
          </div>
          <div className="bg-white dark:bg-dark-div dark:text-dark-text md:p-5 space-y-2 flex flex-col lg:flex-row gap-4">
            <div className="w-full md:w-[500] h-[500] flex items-center bg-brand-primary-500/10 mx-auto">
              <ImageSlider contentImages={product.images} />
            </div>
            <div className="container-slider_body grow space-y-4 px-2">
              <div>
                <span className="mz_promotionBand">
                  {product.old_price && 'En promotion !'}
                </span>
              </div>
              <div className="flex flex-col xs:flex-row lg:flex-col xl:flex-row gap-x-4 xl:items-center">
                <span className="text-3xl font-black">
                  {formatPrice(newPrice)} FCFA
                </span>
                <div className="flex gap-2 items-center">
                  <span className="line-through text-lg text-gray-700 dark:text-gray-300 order-2 sm:order-1">
                    {formatPrice(oldPrice)} F
                  </span>
                  <span className="mz_promotionBand order-1 sm:order-2">
                    -{promo}%
                  </span>
                </div>
              </div>
              <div>
                <WhatsAppButton />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Tags du produit</h3>
                <div className="text-gray-700 dark:text-gray-300 flex flex-wrap gap-x-4 gap-y-2 text-small">
                  {product.product_tags.map((tag, i) => (
                    <span key={i} className="underline cursor-default">
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Caractéristiques du Produit</h3>
                <div className="border border-gray-200 dark:border-gray-700 w-full text-small">
                  {product.product_caracteristics.map((c, i) => (
                    <div key={i} className="odd:bg-brand-primary-400/15 p-4">
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mz_container-bloc space-y-4 pt-8">
            <h3>Description du Produit</h3>
            <div
              dangerouslySetInnerHTML={{ __html: htmlDescription }}
              className="pb-10"
            />
          </div>
          <div className="mz_container-bloc mz_description dark:text-dark-text border border-gray-200 dark:border-transparent">
            <h3>Pourquoi choisir notre produit ?</h3>
            <div>
              {product.product_profits.map((tag, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <span>
                    <img src="/images/CheckIcon.svg" alt="Icône de checklist" />
                  </span>
                  <span>{tag.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mz_container-bloc">
            <h3>Avis clients</h3>
            <div className="w-full flex flex-col items-center gap-2">
              <div className="text-brand-primary-500 dark:text-brand-primary-400 flex items-baseline">
                <span>
                  <svg
                    width="40"
                    height="38"
                    viewBox="0 0 52 49"
                    // fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mz_svg"
                  >
                    <path
                      d="M10.3545 48.7469L14.484 30.9464L0.663086 18.9639L18.9011 17.3961L26 0.605103L33.099 17.3961L51.337 18.9639L37.516 30.9464L41.6455 48.7469L26 39.2972L10.3545 48.7469Z"
                      // fill="#841515"
                    />
                  </svg>
                </span>
                <div className="text-4xl">
                  <span className="font-black">{product.product_note}</span>/5
                </div>
              </div>
              <div className="">
                Moyenne sur une base de {product.testimonial} avis
              </div>
              <div>
                <Button
                  variant="bordered"
                  className="dark:text-dark-text dark:hover:bg-white/15 hover:bg-brand-primary-500/5 hidden"
                >
                  Donner votre avis
                </Button>
              </div>
            </div>
          </div>
          <div className="mz_container-bloc hidden">
            <h3>Nous avons aussi</h3>
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}
