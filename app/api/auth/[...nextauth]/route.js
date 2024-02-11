import { authenticate } from "@/lib/authenticate";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          name: "email",
          label: "email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          name: "password",
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (typeof credentials !== "undefined") {
          const res = await authenticate({
            email: credentials.email,
            password: credentials.password,
          });

          if (typeof res !== "undefined") {
            if (res.error === "invalid_password") {
              throw new Error("Invalid password");
            } else if (res.error === "invalid_user") {
              throw new Error("Invalid user");
            } else {
              return { ...res };
            }
          } else {
            throw new Error("Unknown error");
          }
        } else {
          throw new Error("Missing credentials");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
