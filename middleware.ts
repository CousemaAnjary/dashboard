import { prisma } from './src/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    // Get the session token from the request
    const sessionToken = request.cookies.get("sessionToken")?.value

    // Vérifier si le sessionToken est valide
    if (sessionToken) {
        const session = await prisma.session.findUnique({
            where: { sessionToken },
        })

        // Si la session est valide et non expirée
        if (session && session.expires > new Date()) {
            return NextResponse.next()
        }
    }


    return NextResponse.redirect(new URL('/auth/login', request.url))
}

// Appliquer le middleware sur les routes protégées
export const config = {
    matcher: [
        "/dashboard",
        "/about/:path*",
    ]
}