import NextAuth from "next-auth";
import { authOptions } from "@/src/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


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