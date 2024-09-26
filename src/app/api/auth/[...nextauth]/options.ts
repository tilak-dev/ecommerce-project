import dbConnect from "@/configs/dbconnect";
import { passwordCompare } from "@/helper/passwordHasher";
import UserModel from "@/models/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<any> {
        await dbConnect();
        try {
          if (!credentials) {
            console.log("error in authent");
            return;
          }
          const user = await UserModel.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }
          //conparing the password
          const valid = await passwordCompare(
            credentials.password,
            user.password
          );

          //validation
          if (!valid) {
            throw new Error("Invalid password");
          }
          // If user is found, return it
          if (valid) {
            return user;
          }
        } catch (error: any) {
          console.log("Error in login", error);
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isAdmin = user.isAdmin;
        token.email = user?.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
