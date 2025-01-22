import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'


// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/auth/login', '/auth/register', '/']


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    
    const url = request.nextUrl.clone()
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    // Si la route est protégée et que l'utilisateur n'est pas authentifié
    if (protectedRoutes.some((route) => url.pathname.startsWith(route)) && !token) {
        // Redirige vers la page de connexion
        url.pathname = "/auth/login"
        return NextResponse.redirect(url)
    }

    // Si l'utilisateur authentifié essaie d'accéder à une route publique, redirige vers le tableau de bord
    if (publicRoutes.some((route) => url.pathname.startsWith(route)) && token) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url)
    }

    // Autorise la requête si aucune des conditions ci-dessus ne s'applique
    return NextResponse.next()
}

// Appliquer le middleware sur les routes protégées
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}