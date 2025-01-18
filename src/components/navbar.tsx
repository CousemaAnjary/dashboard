import Link from 'next/link'
import { Button } from './ui/button'
import { Contact, House, Info, LayoutTemplate, LogIn, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"


export default function Navbar() {
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
        <nav className="flex justify-between items-center relative z-10 bg-white h-14 border mt-4 mx-auto w-full max-w-6xl rounded-full">

            {/* Logo et Menu */}
            <div className="flex items-center ms-5">
                <LayoutTemplate />
                <ul className='flex space-x-1 ms-2'>
                    <li>
                        <Link href="/">
                            <Button variant={'ghost'} className='flex items-center font-spaceGrotesk'>
                                <House  className="w-3 h-3" />
                                <span>Accueil</span>
                            </Button>

                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Button variant={'ghost'} className='flex items-center font-spaceGrotesk'>
                                <Info className="w-3 h-3" />
                                <span>A propos de moi</span>
                            </Button>

                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Button variant={'ghost'} className='flex items-center font-spaceGrotesk'>
                                <Contact className="w-3 h-3" />
                                <span>Contact</span>
                            </Button>
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size={'icon'} variant={'secondary'} className='rounded-full border mr-5'>
                            <User className='text-slate-700' />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-64">
                        <DropdownMenuGroup>
                            {/* <DropdownMenuItem className='font-inter'>
                                Thème
                            </DropdownMenuItem> */}
                            <DropdownMenuItem className='font-inter'>
                                Langue
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='font-inter'>
                            <div className="flex items-center space-x-2">
                                <LogIn className="w-4 h-4" />
                                <span>Se connecter</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>

    )
}