import bcrypt from "bcrypt"
import { prisma } from './prisma'
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
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
        CredentialsProvider({
            name: "Credentials",

            credentials: {}, // Plus besoin de spécifier les champs ici

            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string }

                // Rechercher l'utilisateur dans la base de données
                const user = await prisma.user.findUnique({
                    where: { email },
                })

                if (!user) {
                    throw new Error("Aucun utilisateur trouvé avec cet e-mail.");
                }

                // Vérifier le mot de passe
                const isValidPassword = await bcrypt.compare(password, user.password || "")

                if (!isValidPassword) {
                    throw new Error("Mot de passe incorrect.")
                }

                // Retourner l'utilisateur pour créer une session
                return user;
            }
        })
    ],

    callbacks: {
        async session({ session, token }) {
            // Ajouter l'ID utilisateur à la session
            session.user.id = token.id as string;
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Ajouter l'ID utilisateur au token JWT
            }
            return token;
        },
    },

    adapter: PrismaAdapter(prisma)
}