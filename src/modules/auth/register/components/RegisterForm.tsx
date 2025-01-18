"use client"
import { z } from "zod"
import Link from "next/link"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useForm } from "react-hook-form"
import { Input } from "@/src/components/ui/input"
import { Eye, EyeOff, Loader } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"

// Définir le schéma de validation avec Zod
const formSchema = z.object({
    lastname: z.string().nonempty("Le nom est obligatoire"),
    firstname: z.string().nonempty("Le prénom est obligatoire"),
    email: z.string().email("L'adresse email est invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    image: z
        // Vérifie que l’entrée est bien un fichier (File).
        .custom<File>((value) => value instanceof File, {
            message: "Le fichier doit être un fichier valide.",
        })

        //Vérifie que le fichier est une image (par exemple, image/png, image/jpeg)
        .refine((file) => file?.type.startsWith("image/"), {
            message: "Le fichier doit être une image.",
        })

        //Vérifie que la taille du fichier est inférieure à 5 Mo
        // .refine((file) => file?.size < 5 * 1024 * 1024, {
        //     message: "Le fichier doit être inférieur à 5 Mo.",
        // }),

        .optional()
})


export default function RegisterForm() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastname: "",
            firstname: "",
            email: "",
            password: "",
        }
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleRegister = (data: z.infer<typeof formSchema>) => {

        // Affichage du loader pendant le chargement
        setLoading(true)

        console.log("Formulaire soumis :", data);
    }


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="relative p-8 w-full max-w-md">
                <h1 className="mb-2 text-2xl font-medium font-spaceGrotesk text-black">Inscription</h1>
                <p className="mb-4 text-sm font-spaceGrotesk text-muted-foreground">
                    Vous avez déjà un compte ? Accédez-y en cliquant <Link href="/auth/login" className="underline text-cyan-700">ici</Link>
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)}>
                        <div className="grid gap-4">

                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-inter">Nom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="ABDILLAH" className="shadow-sm bg-white font-inter" />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-inter">Prénom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Cousema Anjary" className="shadow-sm bg-white font-inter" />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Adresse email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="exemple@gmail.com" className="shadow-sm bg-white font-inter" />
                                            </FormControl>
                                            <FormMessage className="font-inter" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-9 gap-2">
                                <div className="grid gap-2 col-span-8">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-inter">Mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type={showPassword ? "text" : "password"} placeholder="Entrez votre mot de passe" className="shadow-sm bg-white font-inter" />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid mb-1">
                                    <Button type="button" variant="outline" size={"icon"} className="mt-8" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    className="shadow-sm bg-white font-inter text-xs"
                                                    onChange={(e) => { field.onChange(e.target.files ? e.target.files[0] : null) }}
                                                />
                                            </FormControl>
                                            <FormMessage className="font-inter" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid">
                                <Button type="submit" className="w-full font-inter" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                                            Veuillez patienter
                                        </>
                                    ) : (
                                        "Créer un compte"
                                    )}
                                </Button>
                            </div>

                            <div className="relative">
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 font-inter text-muted-foreground">Ou continuer avec</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-2">
                                    <Button type="button" variant="outline" className="w-full font-inter">
                                        <FcGoogle size={18} /> Google
                                    </Button>
                                </div>
                                <div className="grid gap-2">
                                    <Button type="button" variant="outline" className="w-full font-inter">
                                        <FaGithub size={18} /> Github
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </form>

                </Form>
            </div>
        </>
    )
}