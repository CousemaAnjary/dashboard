import bcrypt from "bcrypt"
// import { resolve } from "path"
// import { writeFile } from "fs/promises"
import { prisma } from "@/src/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { registerSchema } from "@/src/lib/validations/auth"


export async function POST(request: NextRequest) {
    try {
        // Récupérer les données et valider les données envoyées
        const body = await request.json()
        const validated = registerSchema.parse(body)

        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email: validated.email } })

        // Retourner une erreur si l'utilisateur existe déjà
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "Cet email est déjà utilisé."
            }, { status: 400 })
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(validated.password, 10)

        // let imageUrl = null

        // // Upload de l'image (si elle existe)
        // const imageFile = body.get("image") as File | null

        // if (imageFile) {
        //     const imageBuffer = Buffer.from(await imageFile.arrayBuffer())

        //     // Générer un nom de fichier unique
        //     const fileName = `${Date.now()}-${imageFile.name}`

        //     // Définir le chemin complet pour enregistrer l'image
        //     const filePath = resolve(`./public/uploads/${fileName}`)

        //     // Enregistrer l'image localement
        //     await writeFile(filePath, imageBuffer)

        //     // Définir l'URL publique
        //     imageUrl = `/uploads/${fileName}`
        // }

        // Création de l'utilisateur
        const newUser = await prisma.user.create({
            data: {
                lastname: validated.lastname,
                firstname: validated.firstname,
                email: validated.email,
                password: hashedPassword,
                // image: imageUrl,
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