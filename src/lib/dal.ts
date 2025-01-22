import 'server-only'

import { cache } from 'react'
import { prisma } from './prisma'
import { decrypt } from './sessions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Vérifie si l'utilisateur est connecté en décryptant la session
export const verifySession = cache(async () => {

    // Récupérer le cookie de session
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session')?.value

    if (!sessionToken) {
        redirect('/auth/login') // Rediriger si aucun token de session n'est trouvé
    }

    // Décrypter le token pour récupérer la session
    const session = await decrypt(sessionToken)

    if (!session?.userId) {
        redirect('/auth/login') // Rediriger si la session est invalide ou expirée
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
