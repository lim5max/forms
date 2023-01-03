import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { v4 as uuidv4 } from "uuid"; // import prisma from "../../../lib/prismadb";import { getCsrfToken } from "next-auth/react"
import { getCsrfToken } from "next-auth/react";

import prisma from "../../../lib/prismadb";
export const authOptions: NextAuthOptions = {
	// your configs
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const user = await prisma.user.findFirst({
					where: {
						username: credentials.username,
						password: credentials.password,
					},
				});
				console.log(user);
				// If no error and we have user data, return it
				if (user) {
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],

	pages: {
		signIn: "/auth/login",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: async ({ token, user }) => {
			user && (token.user = user);
			token.role = "admin";
			return  Promise.resolve(token);;
		},
		session: async ({ session, token }) => {
			session.user = token.user;
			return Promise.resolve(session);
		},
	},
	
}
export default NextAuth(authOptions);