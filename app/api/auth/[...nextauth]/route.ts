import { handlers } from "@/src/lib/auth"

export const { GET, POST } = handlers
export const runtime = "edge" // optional


// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/src/lib/prisma'
// import NextAuth, { NextAuthOptions } from 'next-auth'


// export const authConfig = {
//     providers: [
//         GithubProvider()
//     ],
//     adapter: PrismaAdapter(prisma),
// } satisfies NextAuthOptions;

// export default NextAuth(authConfig);