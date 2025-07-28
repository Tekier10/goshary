import NextAuth, { DefaultSession } from "next-auth"

// Rozšíříme typ pro session objekt
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}
