import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
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
          return { id: "1", name: "Seller User", role: "seller" }
        }

        // Customer account
        if (credentials?.username === "customer" && credentials.password === "1234") {
          return { id: "2", name: "Customer User", role: "customer" }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
