import Link from 'next/link'
import { Button } from './ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "./ui/select"
import { Contact, House, Info, LayoutTemplate, LogIn, Monitor, MoonStar, Sun, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"


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
                                <House className="w-3 h-3" />
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

                    <DropdownMenuContent className="w-72 mt-2">
                        <DropdownMenuGroup className='space-y-3 p-2'>
                            {/* Theme Section */}
                            <div className="flex justify-between items-center">
                                <span className='font-spaceGrotesk text-sm'>Thème</span>
                                <div className="flex items-center border p-1 rounded-full space-x-2">
                                    <Sun className=" cursor-pointer p-1 border rounded-full" />
                                    <Monitor className="w-4 h-4 cursor-pointer" />
                                    <MoonStar className="w-4 h-4 cursor-pointer" />
                                </div>
                            </div>

                            {/* Language Section */}
                            <div className="flex justify-between items-center">
                                <span className='font-spaceGrotesk text-sm'>Langue</span>
                                <Select defaultValue="fr">
                                    <SelectTrigger className="w-[130px] h-7 font-spaceGrotesk">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className='font-spaceGrotesk'>
                                            <SelectItem value="fr">🇫🇷 Français</SelectItem>
                                            <SelectItem value="en">🇬🇧 English</SelectItem>
                                            <SelectItem value="es">🇲🇬 Malagasy</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        {/* Login Section */}
                        <Link href="/auth/login">
                            <DropdownMenuItem className="font-spaceGrotesk font-medium">
                                <div className="flex items-center space-x-2">
                                    <LogIn className="w-4 h-4" />
                                    <span>Se connecter</span>
                                </div>
                                <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>

    )
}