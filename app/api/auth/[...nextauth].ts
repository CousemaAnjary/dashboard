import NextAuth from "next-auth"
import { prisma } from "@/src/lib/prisma"
import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import bcrypt from "bcrypt";

export const authConfig = {
    providers: [],
    adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;


export default NextAuth(authConfig);
