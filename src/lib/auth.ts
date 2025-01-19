import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth } = NextAuth({
    // Fournisseurs d'authentification
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
});