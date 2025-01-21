import { cookies } from 'next/headers'
import { decrypt } from './src/lib/sessions'
import { NextResponse, NextRequest } from 'next/server'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/auth/login', '/auth/register', '/']


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    // 2. Check if the current route is protected or public
    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // 3. Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value
    const session = cookie ? await decrypt(cookie) : null

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }

    // 5. Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        session?.userId &&
        !request.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    return NextResponse.next()
}

// Appliquer le middleware sur les routes protégées
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}