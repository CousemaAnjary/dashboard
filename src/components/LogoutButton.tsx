"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button"
import { deleteSession } from "../lib/sessions";



export default function LogoutButton() {
    /**
     * ! STATE (état, données) de l'application
     */


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleGithubLogout = async () => {
        await deleteSession();
        await signOut();
    };

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Button onClick={handleGithubLogout}>
            Logout
        </Button>
    )
}