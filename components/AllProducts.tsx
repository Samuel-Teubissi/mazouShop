import MazouCard from './MazouCard'
import type { Prisma } from '@/generated/prisma/client'

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    images: true
    product_profits: true
    product_tags: true
    product_caracteristics: true
  }
}>
interface Products {
  products: ProductWithCategory[]
}

export default function AllProducts({ products }: Products) {
  //   const [products, setProducts] = useState<ProductWithCategory[]>([]);

  // useEffect(() => {
  //   fetch('/api/products')
  //     .then((res) => res.json())
  //     .then((data: ProductWithCategory[]) => setProducts(data))
  // }, []);

  console.log('products', products)
  let formattedProducts = []

  formattedProducts = products.map((p) => ({
    // id: p.id,
    // title: p.title,
    // new_price: p.new_price,
    // description: p.description,
    ...p,
    old_price: p.old_price as number,
    product_note: p.product_note as number,
    testimonial: p.testimonial as number,
    images: p.images.map((i) => i.url),
    product_profits: p.product_profits.map((p) => p.label),
    product_tags: p.product_tags.map((t) => t.label),
    product_caracteristics: p.product_caracteristics.map((c) => c.label),
  }))

  if (formattedProducts.length === 0)
    return (
      <div className="mz_container-body px-3">
        <div className="h-75 w-full flex justify-center items-center bg-gray-200/40 gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="m192.76 62.72l18.2-20a4 4 0 0 0-5.96-5.41l-18.2 20a92 92 0 0 0-123.6 136l-18.2 20a4 4 0 1 0 6 5.38l18.2-20A92 92 0 0 0 192.76 62.72M44 128a84 84 0 0 1 137.46-64.75L68.63 187.36A83.72 83.72 0 0 1 44 128m84 84a83.64 83.64 0 0 1-53.46-19.25L187.37 68.64A84 84 0 0 1 128 212"
              />
            </svg>
          </div>
          <div>Aucun produit à afficher</div>
        </div>
      </div>
    )

  return (
    <div className="mz_container-body px-3">
      {/* <div className="mz_Heading text-2xl md:text-3xl">SPORT</div> */}
      <div className="w-full gap-x-1 gap-y-3 md:gap-3 items-center grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* {[...Array(4)].map((_, i) => ( */}
        {/* <div key={i}> */}
        {formattedProducts.map((formattedProduct, index) => (
          <MazouCard Item={formattedProduct} key={index} />
        ))}
        {/* </div> */}
        {/* ))} */}
      </div>
    </div>
  )
}
