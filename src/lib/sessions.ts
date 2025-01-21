import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { prisma } from './prisma'


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

// Définir le type pour le payload de session
type SessionPayload = {
    userId: string; // Identifiant de l'utilisateur
    expiresAt: Date; // Timestamp de l'expiration (secondes Unix)
}


export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string) {
    const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
    })
    // Retourner le payload (contient les données de session)
    return payload
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const sessionToken = await encrypt({ userId, expiresAt })

    // Sauvegarder la session en base de données
    await prisma.session.create({
        data: {
            userId,
            sessionToken,
            expires: expiresAt,
        },
    })

    // Définir le cookie de session
    const cookieStore = await cookies()
    cookieStore.set('session', sessionToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

