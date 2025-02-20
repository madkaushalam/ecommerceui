import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await connectDB();
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        console.log("User not found or password mismatch");
                        return null;
                    }
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid) {
                        console.log("User not found or password mismatch");
                        return null;
                    }
                    console.log("User found:", { id: user._id.toString(), email: user.email, name: user.name });

                    return { id: user._id.toString(), name: user.name, email: user.email };

                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        session({ session, token }) {
                session.user.id = token.id;
            return session;
        }
    },
    // session: {
    //     strategy: 'jwt',
    // },
    secret: process.env.NEXTAUTH_SECRET

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


