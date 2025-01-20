import { cn } from "@/src/lib/utils"
import Navbar from "@/src/components/navbar"
import GridPattern from "@/src/components/ui/grid-pattern"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"


export default async function Page() {
  /**
   * ! STATE (état, données) de l'application
   */
  const session = await getServerSession(authOptions)

  /**
   * ! COMPORTEMENT (méthodes, fonctions) de l'application
   */

  /**
   * ! AFFICHAGE (render) de l'application
   */
  return (
    <div className="flex flex-col min-h-screen">
      <GridPattern width={50} height={50} x={-1} y={-1} strokeDasharray={"4 2"} className={cn("absolute inset-0 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]")} />
      {/* En-tête */}
      <header>
        <Navbar />
      </header>

      {/* Contenu principal */}
      <main className="flex-grow">
        <pre>{JSON.stringify(session, null, 2)}</pre>

        {session?.user?.name}
      </main>

      {/* Pied de page */}
      <footer></footer>
    </div >
  )
}