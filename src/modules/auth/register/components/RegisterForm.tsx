import Link from "next/link"
import { useForm } from "react-hook-form"
import { Input } from "@/src/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"


export default function RegisterForm() {
    /**
     * ! STATE (état, données) de l'application
     */
    const form = useForm()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleRegister = () => { }


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="relative p-8 w-full max-w-md">
                <h1 className="mb-2 text-2xl font-medium font-inter text-black">Inscription</h1>
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
                                        name="last_name"
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

                            </div>

                        </div>
                    </form>

                </Form>
            </div>
        </>
    )
}