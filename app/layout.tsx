import '@/styles/globals.css'
import '@/styles/index.css'
import { Metadata, Viewport } from 'next'
// import { Link } from '@heroui/link'
import clsx from 'clsx'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar'
import { Modal } from '@/components/componentModal'
import Image from 'next/image'
import { MazouFooter } from '@/components/MazouFooter'
import { ButtonDarkMode } from '@/components/ButtonDarkMode'
import { CartProvider } from '@/lib/useCart'
import Link from 'next/link'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 🚨 Déclenche l'appel à loadInitialCart() au montage
  return (
    <html suppressHydrationWarning lang="fr">
      <head />
      <body
        className={clsx('min-h-screen text-foreground font-sans antialiased')}
      >
        <CartProvider>
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
            <div className="relative flex flex-col min-h-screen">
              <header className="bg-white dark:bg-dark-div backdrop-blur-xs text-brand-primary-400 fixed py-5 w-full z-50">
                <div className="flex items-center justify-between max-w-6xl px-3 md:px-6 mx-auto">
                  <div className="flex items-center">
                    <Link href="/">
                      <Image
                        src="/MazouAppIcon.svg"
                        // className="h-20"
                        title="Mazou Homepage"
                        alt="Mazou Icon"
                        width={200}
                        height={200}
                      />
                    </Link>
                    {/* <span className="mr-4">LOGO</span>
                    <p className="font-bold hidden md:block">Mazou Shop</p> */}
                  </div>
                  <div className="flex gap-1 items-center">
                    <ButtonDarkMode />
                    <Modal />
                  </div>
                </div>
              </header>
              <main className="lg:pt-28 flex-1">{children}</main>
              <MazouFooter />
            </div>
          </Providers>
        </CartProvider>
      </body>
    </html>
  )
}
