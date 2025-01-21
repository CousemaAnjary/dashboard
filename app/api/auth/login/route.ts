"use server"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { prisma } from "@/src/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { loginSchema } from "@/src/lib/validations/auth"


export async function POST(request: NextRequest) {
    try {
        // Récupérer les données et valider les données envoyées
        const body = await request.json()
        const validated = loginSchema.parse(body)

        // Chercher l'utilisateur dans la base de 
        const user = await prisma.user.findUnique({
            where: { email: validated.email },
        })

        // Vérifier si l'utilisateur existe
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Email ou mot de passe incorrect." },
                { status: 401 }
            )
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(validated.password, user.password || "");

        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: "Email ou mot de passe incorrect." },
                { status: 401 }
            )
        }

        // Générer un token de session unique
        const sessionToken = uuidv4()

        // Définir une date d'expiration pour la session
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours

        // Créer une session pour l'utilisateur
        await prisma.session.create({
            data: {
                userId: user.id,
                sessionToken,
                expires,
            },
        })

    } catch (error) {
        console.error(error)
    }
}