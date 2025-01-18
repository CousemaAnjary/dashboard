import Link from "next/link";

export default function LoginForm() {
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
                <h1 className="mb-2 text-2xl font-medium font-spaceGrotesk text-black">Se connecter</h1>
                <p className="mb-4 text-md text-black">
                    Connectez-vous à votre compte pour accéder à votre espace personnel
                </p>
                <p className="mb-4 text-sm  font-spaceGrotesk font-medium text-muted-foreground">
                    Vous n&apos;avez pas de compte ? Inscrivez-vous en cliquant <Link href="/auth/register" className="underline text-cyan-700">ici</Link>
                </p>
            </div>
        </>
    )
}