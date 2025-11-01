import { formatPrice } from '@/config/utils'
// import Link from 'next/link'
import { Link } from '@heroui/link'

export const MazouFooter = () => {
  const mz_Phone = formatPrice(Number(process.env.MAZOU_PHONE))
  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center text-center md:text-left py-3 px-5 lg:px-20 pt-14 pb-28 gap-8">
        <div>
          <Link href="/">
            <img
              src="/MazouAppIcon.svg"
              title="Mazou Homepage"
              alt="Mazou Icon"
              width={200}
              height={200}
            />
          </Link>
          <div>MazouShop - La boutique en un click !</div>
        </div>
        <div className="mz_footer-links grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4">
          <div className="space-y-1 md:col-span-2 lg:col-auto flex flex-col items-center md:items-start gap-y-1">
            <div>Payez facilement avec les services locaux</div>
            <div>
              <img
                src="/images/local_payments.png"
                alt="Logos paiements locaux"
              />
            </div>
            <Link className="flex items-center gap-1">
              <img src="/images/whatsapp-icon.svg" alt="Logo Whatsapp" />
              {mz_Phone}
            </Link>
          </div>
          <div className="flex flex-col items-center md:items-start gap-y-2">
            <div className="text-brand-primary-400 mb-1">Liens Utiles</div>
            <Link href="/">Acceuil</Link>
            {/* <Link onClick={}>Mon panier</Link> */}
            <Link href="/legal/privacy-policy">
              Politique de confidentialité
            </Link>
            <Link href="/legal/refund-policy">Politique de remboursement</Link>
            <Link href="/about">A propos de nous</Link>
          </div>
          <div className="flex flex-col items-center md:items-start gap-y-2">
            <div className="text-brand-primary-400 mb-1">Catégories</div>
            <Link>Sport</Link>
            <Link>Bien-être et santé</Link>
            <Link>Accessoires</Link>
            <Link>électonique</Link>
          </div>
        </div>
      </div>
      <div className="copyright w-full text-center py-3">
        Copyright © {new Date().getFullYear()}
      </div>
    </footer>
  )
}
