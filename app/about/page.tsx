import { MazouBreadcrumbs } from '@/components/MazouBreadcrumbs'
import { title } from '@/components/primitives'

export default function AboutPage() {
  return (
    <>
      <MazouBreadcrumbs />
      <div className="mz_container">
        <div className="mz_container-body mz_container-resp h-full">
          <div className="mz_container-bloc">
            <h1 className={title()}>À propos de Mazou</h1>
            <p>
              Bienvenue sur <strong>Mazou</strong>, votre plateforme e-commerce
              100% camerounaise dédiée à la présentation et la vente de produits
              du quotidien.
            </p>
          </div>
          <div className="mz_container-bloc space-y-6 mz_privacy">
            <div>
              <p className="title">Notre mission :</p>
              <p className="content">
                Faciliter l’accès à des produits de qualité au Cameroun, tout en
                vous rapprochant du fournisseur dans un cadre simple,
                transparent et convivial.
              </p>
            </div>
            <div>
              <p className="title">Pourquoi Mazou ? :</p>
              <p className="content">
                <br /> - <strong>Simplicité</strong> : un clic suffit pour
                entrer en contact avec le fournisseur.
                <br /> - <strong>Proximité</strong> : la livraison se fait
                directement à domicile, selon votre position.
                <br /> - <strong>Confiance</strong> : chaque produit présenté
                est accompagné d’un prix clair et d’une description précise.
                <br /> - <strong>Rapidité</strong> : plus besoin d’attendre des
                jours, tout se règle directement avec le fournisseur.
              </p>
            </div>
            <div>
              <p className="title">Notre vision :</p>
              <p className="content">
                Devenir une référence dans l’e-commerce local au Cameroun, en
                offrant une expérience d’achat unique, centrée sur la confiance,
                la rapidité et la transparence.
              </p>
            </div>
            <div>
              <p className="title">Contactez-nous :</p>
              <p className="content">
                Une question ? Une suggestion ?
                <br /> - Envoyez nous un email à <br />
                <b>📧 samtebs07@gmail.com</b>
                <br /> - Laissez nous un message WhatsApp au <br />
                📞{' '}
                <b>
                  <a href="https://wa.me/237696771089">696 77 10 89</a>
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
