import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      console.log("🔎 Middleware token:", token);


      if (!token) return false; // must be logged in

      if (
        req.nextUrl.pathname.startsWith("/profile") ||
        req.nextUrl.pathname.startsWith("/products/create")
      ) {
        return token.role === "seller";
      }

      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token.role === "admin";
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: ["/profile", "/profile/:path*", "/products/create", "/admin/:path*"],
};

