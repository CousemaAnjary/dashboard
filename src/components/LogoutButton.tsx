"use client"
import { signOut } from "next-auth/react"
// import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
// import { deleteSession } from "../lib/sessions"




export default function LogoutButton() {
    /**
     * ! STATE (état, données) de l'application
     */
    // const router = useRouter()
    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
 

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Button onClick={() => { signOut() }}>
            Logout
        </Button>
    )
}