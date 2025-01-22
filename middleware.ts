import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'


// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const url = request.nextUrl.clone()
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    console.log("Token :", token);
    console.log("Pathname :", url.pathname);

    // Redirection pour les routes protégées
    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
        if (!token) {
            // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
            url.pathname = "/auth/login";
            return NextResponse.redirect(url);
        }
        // Si l'utilisateur est déjà authentifié, on continue
        return NextResponse.next();
    }

    // Redirection pour les routes publiques
    if (publicRoutes.some((route) => url.pathname.startsWith(route))) {
        if (token) {
            // Redirige vers /dashboard si l'utilisateur est déjà connecté
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
        // Si l'utilisateur n'est pas connecté, on continue
        return NextResponse.next();
    }

    // Autorise la requête si aucune des conditions ci-dessus ne s'applique
    return NextResponse.next()
}

// Appliquer le middleware sur les routes protégées
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}