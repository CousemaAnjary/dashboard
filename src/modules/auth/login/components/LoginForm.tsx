"use client"
import { z } from "zod"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
// import { useRouter } from "next/navigation"
// import { login } from "../../register/services"
import { Input } from "@/src/components/ui/input"
import { Eye, EyeOff, Loader } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/src/lib/validations/auth"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"



export default function LoginForm() {
    /**
     * ! STATE (état, données) de l'application
     */
    // const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleLogin = async (data: z.infer<typeof loginSchema>) => {
        // Affichage du loader pendant le chargement
        setLoading(true)

        try {
            await signIn("credentials", {
                redirect: true, // Activer la redirection automatique
                callbackUrl: "/dashboard", // URL après connexion
                email: data.email,
                password: data.password,
            })

        } catch (error) {
            console.error("Error logging in with credentials", error)

        } finally {
            // Désactivation du loader
            setLoading(false)
        }
    }


    const handleProviderLogin = async (provider: string) => {
        try {
            // Affichage du loader pendant le chargement
            setLoading(true)

            // Connexion avec le fournisseur
            await signIn(provider, { callbackUrl: "/dashboard" })

        } catch (error) {
            console.error("Error logging in with provider", error)
        } finally {
            // Désactivation du loader
            setLoading(false)
        }
    };


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

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleLogin)}>
                        <div className="grid gap-4">
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

                            <div className="grid">
                                <Button type="submit" className="w-full font-inter" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                                            Veuillez patienter
                                        </>
                                    ) : (
                                        "Connexion"
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
                                    <Button type="button" variant="outline" className="w-full font-inter" onClick={async () => await handleProviderLogin("google")}>
                                        <FcGoogle size={18} /> Google
                                    </Button>
                                </div>
                                <div className="grid gap-2">
                                    <Button type="button" variant="outline" className="w-full font-inter" onClick={async () => await handleProviderLogin("github")}>
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