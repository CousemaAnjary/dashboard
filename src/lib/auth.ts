import bcrypt from "bcrypt"
import { prisma } from './prisma'
import { NextAuthOptions } from "next-auth"
import { loginSchema } from "./validations/auth"
import { PrismaAdapter } from '@auth/prisma-adapter'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),

        // Ajouter un fournisseur d'authentification personnalisé
        Credentials({
            name: "Credentials",

            credentials: {}, // Plus besoin de spécifier les champs ici

            async authorize(credentials) {
                // Valider les informations d'identification
                const validated = loginSchema.parse(credentials);

                // Rechercher l'utilisateur dans la base de données
                const user = await prisma.user.findUnique({
                    where: { email: validated.email },
                })

                if (!user) {
                    throw new Error("Aucun utilisateur trouvé avec cet e-mail.");
                }

                // Vérifier le mot de passe
                const isPasswordValid = await bcrypt.compare(validated.password, user.password || "");

                if (!isPasswordValid) {
                    throw new Error("Mot de passe incorrect.")
                }

                // Retourner l'utilisateur pour créer une session
                return user;
            }
        })
    ],
    adapter: PrismaAdapter(prisma),

    callbacks: {
        async jwt({ token, user }) {
            // Ajouter des informations utilisateur au token JWT
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            // Ajouter l'ID utilisateur à la session
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
}