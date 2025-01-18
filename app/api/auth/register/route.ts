import bcrypt from "bcrypt"
import { prisma } from "@/src/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { registerSchema } from "@/src/lib/validations/auth"


export async function POST(request: NextRequest) {
    try {
        // Parse et valider les données envoyées
        const body = await request.json()
        const validated = registerSchema.parse(body)

        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email: validated.email } })

        if (existingUser) {

            // Retourner une erreur si l'utilisateur existe déjà
            return NextResponse.json({
                success: false,
                message: "Cet email est déjà utilisé."
            }, { status: 400 })


        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(validated.password, 10)

        // Création de l'utilisateur
        const newUser = await prisma.user.create({
            data: {
                lastname: validated.lastname,
                firstname: validated.firstname,
                email: validated.email,
                password: hashedPassword
            }
        })

        // Retourner la réponse
        return NextResponse.json({
            success: true,
            user: newUser,
            message: "Utilisateur créé avec succès."
        }, { status: 201 })

    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
    }

}