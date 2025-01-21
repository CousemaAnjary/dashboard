"use client"
import { cn } from "@/src/lib/utils"
import Navbar from "@/src/components/navbar"
import GridPattern from "@/src/components/ui/grid-pattern"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/src/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import LogoutButton from "@/src/components/LogoutButton"
import { useSession } from "next-auth/react"


export default function Page() {
  /**
   * ! STATE (état, données) de l'application
   */
  // 

  const { data: session } = useSession()

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

        <div>
          <p> {session?.user?.name}</p>
          <p>Id : {session?.user?.id}</p>
          <Avatar>
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <LogoutButton />
        </div>

      </main>

      {/* Pied de page */}
      <footer></footer>
    </div >
  )
}