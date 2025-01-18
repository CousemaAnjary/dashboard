import Navbar from "@/src/components/navbar"


export default function Register() {
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
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* En-tête */}
            <header>
                <Navbar />
            </header>

            {/* Contenu principal */}
            <main className="flex-grow">
                {/* Section 1 */}
                <section className="flex justify-center items-center min-h-[84vh]">
                    {/*  container du formulaire d'inscription */}
                    <div>

                    </div>
                </section>
            </main>

            {/* Pied de page */}
            <footer></footer>
        </div>
    )
}