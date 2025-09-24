import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "../../../../lib/db";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) {
                    throw new Error("No user found");
                }

                const isValid = await compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                // ✅ return role along with user details
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role, // 👈 added role
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role; // 👈 include role in token
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string; // 👈 add role to session
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST };
