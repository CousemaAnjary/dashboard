import 'server-only'

import { cache } from 'react'
import { prisma } from './prisma'
import { decrypt } from './sessions'
import { cookies } from 'next/headers'

// Vérifie si l'utilisateur est connecté en décryptant la session
export const verifySession = cache(async () => {

    // Récupérer le cookie de session
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session')?.value

    if (!sessionToken) {
        return { isAuth: false, userId: null };
    }

    // Décrypter le token pour récupérer la session
    const session = await decrypt(sessionToken)

    if (!session?.userId) {
        return { isAuth: false, userId: null };
    }

    // Retourner les informations de la session
    return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async () => {
    try {
        const session = await verifySession()

        if (!session || !session.userId) {
            return null; // Retourner null si la session est invalide
        }

        // Récupérer les informations utilisateur depuis la base de données
        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return user;

    } catch (error) {
        console.error("Error fetching user", error)
    }
})
