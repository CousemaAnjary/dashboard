"use client"

// import { signOut } from "next-auth/react";
import { Button } from "./ui/button"
import { deleteSession } from "../lib/sessions"
import { useRouter } from "next/navigation"



export default function LogoutButton() {
    /**
     * ! STATE (état, données) de l'application
     */
    const router = useRouter()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleGithubLogout = async () => {
        try {
            await deleteSession()
            router.push('/auth/login')
        } catch (error) {
            // Afficher l'erreur dans la console
            console.error('Logout failed', error)
        }
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Button onClick={handleGithubLogout}>
            Logout
        </Button>
    )
}