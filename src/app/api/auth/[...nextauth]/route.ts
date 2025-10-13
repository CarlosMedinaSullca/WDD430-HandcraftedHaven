// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ObjectId } from "mongodb"; // If needed for ID handling; optional

// Export authOptions explicitly (this fixes the import error)
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Seller account
        if (credentials?.username === "seller" && credentials.password === "1234") {
          return { 
            id: "1", 
            name: "Seller User", 
            email: "seller@example.com", // Optional: Add email for completeness
            role: "seller" 
          };
        }

        // Customer account
        if (credentials?.username === "customer" && credentials.password === "1234") {
          return { 
            id: "2", 
            name: "Customer User", 
            email: "customer@example.com", // Optional
            role: "customer" 
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Optional: Point to your sign-in page if customized
  },
};

// Create handler using authOptions (unchanged functionality)
const handler = NextAuth(authOptions);

// Export the handler methods (required for the API route)
export { handler as GET, handler as POST };