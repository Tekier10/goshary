import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, // Předpokládám, že toto chcete zachovat
    }),
    CredentialsProvider({
      name: 'Přihlášení',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Heslo', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (passwordMatches) {
          // --- PŘIDANÁ KONTROLA NA OVĚŘENÍ E-MAILU ---
          if (!user.emailVerified) {
            throw new Error("Váš e-mail není ověřený. Zkontrolujte prosím svou schránku.");
          }
          
          const { passwordHash, ...userWithoutHash } = user;
          return userWithoutHash;
        }
        
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: '/prihlasit',
  },
};

export default NextAuth(authOptions);