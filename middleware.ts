import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Le nom de votre cookie de session
// REMPLACEZ CECI par le nom réel de votre cookie
const SESSION_COOKIE_NAME = 'admin_token'

export function middleware(req: NextRequest) {
  // 1. Récupérer le cookie de session
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)

  // 2. Cloner l'URL pour les redirections
  const url = req.nextUrl.clone()
  const { pathname } = req.nextUrl

  // 3. Définir les routes
  const isLoginPage = pathname === '/admin/login'
  // Protège toutes les routes sous /admin/ SAUF /admin lui-même
  const isProtectedRoute = pathname.startsWith('/admin/') && !isLoginPage

  // 4. Logique de redirection

  // Cas 1: L'utilisateur n'est PAS authentifié ET essaie d'accéder à une page admin protégée
  // -> Rediriger vers la page de login (/admin)
  if (isProtectedRoute && !sessionCookie) {
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Cas 2: L'utilisateur EST authentifié ET essaie d'accéder à la page de login (/admin)
  // -> Rediriger vers le dashboard (ou une autre page par défaut après login)
  if (isLoginPage && sessionCookie) {
    url.pathname = '/admin/dashboard'
    return NextResponse.redirect(url)
  }

  // Cas 3: L'utilisateur est authentifié et va sur une page protégée (autorisé)
  // Cas 4: L'utilisateur n'est pas authentifié et va sur la page de login (autorisé)
  // -> Continuer la navigation
  return NextResponse.next()
}

// 5. Configuration du Matcher
// Ce middleware ne s'exécutera que pour les routes qui commencent par /admin
export const config = {
  matcher: '/admin/:path*',
}
