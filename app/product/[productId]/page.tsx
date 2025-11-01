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
import { useCart } from '@/lib/useCart'
import { mzToast } from '@/lib/utils'
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

  const mz_Phone = Number(process.env.MAZOU_PHONE)
  const defaulBtnText = `Commander sur WhatsApp (${mz_Phone})`

  const htmlDescription = marked(product?.description)

  const newPrice = Number(product?.new_price)
  const oldPrice = Number(product?.old_price)
  let showPromo = false
  let promo = 0
  if (oldPrice) {
    promo = Math.round(((oldPrice - newPrice) / oldPrice) * 100)
    showPromo = true
  }

  // const { cart, addCartProduct, removeCartProduct } = useCart()

  // const handleAdd = () => {
  //   if (isInCart) {
  //     removeCartProduct(product.id)
  //     mzToast('Panier Mazou', `Article retiré !`, 'default')
  //   } else {
  //     addCartProduct({
  //       cartID: product.id,
  //       cartPrice: product.new_price,
  //       cartQty: 1,
  //     })
  //     mzToast('Panier Mazou', `Article ajouté !`, 'default')
  //   }
  // }
  // const isInCart = cart.some((c) => c.cartID === product.id)
  // const isAdded = !!isInCart

  const zapMessage =
    'Bonjour je viens du site Mazou et je suis intéressé par le porduit ' +
    product.title

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
              {showPromo && (
                <div>
                  <span className="mz_promotionBand">
                    {product.old_price && 'En promotion !'}
                  </span>
                </div>
              )}
              <div className="flex flex-col xs:flex-row lg:flex-col xl:flex-row gap-x-4 xl:items-center">
                <span className="text-3xl font-black">
                  {formatPrice(newPrice)} FCFA
                </span>
                {showPromo && (
                  <div className="flex gap-2 items-center">
                    <span className="line-through text-lg text-gray-700 dark:text-gray-300 order-2 sm:order-1">
                      {formatPrice(oldPrice)} F
                    </span>
                    <span className="mz_promotionBand order-1 sm:order-2">
                      -{promo}%
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <WhatsAppButton
                    message={zapMessage}
                    number={mz_Phone}
                    btnText={defaulBtnText}
                  />
                </div>
                {/* <div>
                  <Button
                    color="default"
                    // className="bg-gray-200/80 hover:bg-brand-primary-500 dark:text-white w-full sm:w-auto flex-1 dark:text-white dark:hover:border-brand-primary-400 dark:bg-dark-btn dark:hover:bg-brand-primary-500/70 opacity-100 hover:opacity-100 text-black hover:text-white"
                    className={`${isAdded ? 'bg-gray-200/80 dark:bg-dark-btn' : 'bg-brand-primary-500/20 dark:bg-dark-div2'} hover:bg-brand-primary-500 dark:text-white w-full sm:w-auto flex-1 dark:text-white dark:hover:border-brand-primary-400 dark:hover:bg-brand-primary-500/70 opacity-100 hover:opacity-100 text-black hover:text-white`}
                    variant="flat"
                    radius="sm"
                    onPress={handleAdd}
                  >
                    {isAdded ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#B7B7B7"
                      >
                        <path d="M360-640v-80h240v80H360ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#B7B7B7"
                      >
                        <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
                      </svg>
                    )}
                    <span className="sm:inline hidden">
                      {isAdded ? 'Retirer du panier' : 'Ajouter au panier'}
                    </span>
                  </Button>
                </div> */}
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
