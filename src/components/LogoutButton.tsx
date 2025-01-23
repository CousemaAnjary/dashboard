"use client"

// import { signOut } from "next-auth/react";
import { Button } from "./ui/button"
// import { deleteSession } from "../lib/sessions"

import { signOut } from "next-auth/react"



export default function LogoutButton() {
    /**
     * ! STATE (état, données) de l'application
     */

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    // const handleGithubLogout = async () => {
    //     try {
    //         await signOut()
    //     } catch (error) {
    //         // Afficher l'erreur dans la console
    //         console.error('Logout failed', error)
    //     }
    // }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Button onClick={() => signOut()}>
            Logout
        </Button>
    )
}