import Link from "next/link";

export default function RegisterForm() {
    /**
     * ! STATE (état, données) de l'application
     */


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="relative p-8 w-full max-w-md">
                <h1 className="mb-2 text-2xl font-medium font-inter text-black">Inscription</h1>
                <p className="mb-4 text-sm font-spaceGrotesk text-muted-foreground">
                    Vous avez déjà un compte ? Accédez-y en cliquant <Link href="/auth/login" className="underline text-cyan-700">ici</Link>
                </p>
            </div>
        </>
    )
}