// import { prisma } from "@/src/lib/prisma"
// import { NextAuthOptions } from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import GitHubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"


// export const authOptions: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.AUTH_GITHUB_ID || "",
//       clientSecret: process.env.AUTH_GITHUB_SECRET || "",
//     }),
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID || "",
//       clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
//     }),
//   ],
//   callbacks: {
//     session: async ({ session, user }) => {
//       console.log(session, user)
//       if (session.user) {
//         session.user.id = user.id;
//       }
//       return session
//     },
//   },
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.AUTH_SECRET,
// }
