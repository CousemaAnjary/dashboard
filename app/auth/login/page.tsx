import { cn } from "@/src/lib/utils"
import Navbar from "@/src/components/navbar"
import GridPattern from "@/src/components/ui/grid-pattern"
import LoginForm from "@/src/modules/auth/login/components/LoginForm"



export default function Login() {
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
            <div className="flex flex-col min-h-screen ">
                <GridPattern width={50} height={50} x={-1} y={-1} strokeDasharray={"4 2"} className={cn("absolute inset-0 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]")} />
                {/* En-tête */}
                <header>
                    <Navbar />
                </header>

                {/* Contenu principal */}
                <main className="flex-grow">
                    {/* Section 1 */}
                    <section className="flex justify-center items-center min-h-[84vh]">
                        {/*  container du formulaire de connexion */}
                        <LoginForm />
                    </section>
                </main>

                {/* Pied de page */}
                <footer></footer>
            </div>
        </>
    )
}