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

  const formattedProducts = products.map((p) => ({
    id: p.id,
    title: p.title,
    new_price: p.new_price,
    old_price: p.new_price,
    images: p.images.map((i) => i.url),
    product_note: p.product_note as number,
    testimonial: p.testimonial as number,
    description: p.description,
    product_profits: p.product_profits.map((p) => p.label),
    product_tags: p.product_tags.map((t) => t.label),
    product_caracteristics: p.product_caracteristics.map((c) => c.label),
  }))

  return (
    <div className="mz_container-body px-3">
      <div className="mz_Heading text-2xl md:text-3xl">SPORT</div>
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
