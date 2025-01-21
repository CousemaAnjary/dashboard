"use client"
import LogoutButton from "@/src/components/LogoutButton"
import { useSession } from "next-auth/react"

export default function Dashboard() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { data: session } = useSession()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <h1>Dashboard</h1>
            <p>{session?.user.name}</p>
            <LogoutButton />
        </>
    )
}