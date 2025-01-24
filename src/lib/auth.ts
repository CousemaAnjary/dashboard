// import bcrypt from "bcrypt"
import { prisma } from './prisma'
import { NextAuthOptions } from "next-auth"
// import { loginSchema } from "./validations/auth"
import { PrismaAdapter } from '@auth/prisma-adapter'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {

    // Provider : pour les fournisseurs d'authentification ou les identifiants personnalisés
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        // Ajouter un fournisseur d'authentification personnalisé
        // CredentialsProvider({
        //     credentials: { email: {}, password: {} },

        //     async authorize(credentials) {
        //         // Valider les informations d'identification
        //         const validated = loginSchema.parse(credentials);

        //         // Rechercher l'utilisateur dans la base de données
        //         const user = await prisma.user.findUnique({
        //             where: { email: validated.email },
        //         })

        //         if (!user) {
        //             throw new Error("Aucun utilisateur trouvé avec cet e-mail.");
        //         }

        //         // Vérifier le mot de passe
        //         const isPasswordValid = await bcrypt.compare(validated.password, user.password || "");

        //         if (!isPasswordValid) {
        //             throw new Error("Mot de passe incorrect.")
        //         }

        //         // Retourner l'utilisateur pour créer une session
        //         return user;
        //     }
        // })
    ],

    // // Session : pour la configuration de la session utilisateur
    // session: {
    //     strategy: "jwt",
    // },

    // // Pages : pour la configuration des pages d'authentification
    pages: {
        signIn: "/auth/login",
    },

    // Adapter : pour la connexion à la base de données
    adapter: PrismaAdapter(prisma),

}

