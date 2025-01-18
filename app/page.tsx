import { cn } from "@/src/lib/utils"
import Navbar from "@/src/components/navbar"
import GridPattern from "@/src/components/ui/grid-pattern"


export default function Page() {
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
      <GridPattern width={50} height={50} x={-1} y={-1} strokeDasharray={"4 2"} className={cn("absolute inset-0 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]")} />
      {/* En-tête */}
      <header>
        <Navbar />
      </header>

      {/* Contenu principal */}
      <main className="flex-grow">
        <h1>Hello Next.js!</h1>
        <p>Welcome to your first Next.js site.</p>
      </main>

      {/* Pied de page */}
      <footer></footer>
    </div >
  )
}