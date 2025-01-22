import { getUser } from "@/src/lib/dal"
import LogoutButton from "@/src/components/LogoutButton"

// import { useSession } from "next-auth/react"

export default async function Dashboard() {
    /**
     * ! STATE (état, données) de l'application
     */
    const user = await getUser();

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <h1>Dashboard</h1>
            <h1>Bienvenue, {user?.name} !</h1>
            <p>voici votre email: {user?.email}</p>
            <LogoutButton />
        </>
    )
}