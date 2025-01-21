import { z } from "zod"
import { loginSchema, registerSchema } from "@/src/lib/validations/auth"


export async function register(data: z.infer<typeof registerSchema>): Promise<{ success: boolean, message: string }> {
    try {
        // Envoi des données au serveur (API)
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
        })

        // Récupération de la réponse du serveur
        const apiResponse = await response.json()
        return {
            success: apiResponse.success,
            message: apiResponse.message
        }


    } catch (error) {
        console.error(error)
        throw new Error("Une erreur inattendue s'est produite.")
    }
}

export async function login(data: z.infer<typeof loginSchema>): Promise<{ success: boolean, message: string }> {
    try {
        // Envoi des données au serveur (API)
        const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
        })

        // Récupération de la réponse du serveur
        const apiResponse = await response.json()
        return {
            success: apiResponse.success,
            message: apiResponse.message
        }

    } catch (error) {
        console.error(error)
        throw new Error("Une erreur inattendue s'est produite.")
    }
}
