import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
//import {Providers} from `next-auth/providers`
import { dbConnect} from '@/utils/dbConnect';
import { Admin } from "@/models/Admin";

import GoogleProvider from "next-auth/providers/google"
 //MONGODB_URL : string = 'mongodb+srv://sujithyadav998:9393038264@cluster2.abpwdpy.mongodb.net/s';
// NEXT_GOOGLE_CLIENTID = 383202975324-8hfh5l23dtf09cmr3ii08ouai5l5ki19.apps.googleusercontent.com
// NEXT_CLIENT_SECRET = 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
// NEXT_AUTH_SECRET = 6XccVdlailBhZ6WSLHugBTVw+01VlXevKeOmiaLZ+Ig=
// NEXT_AUTH_URL = 'http://localhost:3000'

export const authOptions :  NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID  ,
            clientSecret: process.env.NEXT_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await dbConnect()
                if (!credentials) {
                    return null;
                }
                const username = credentials.username;
                const password = credentials.password;
                // Add logic here to look up the user from the credentials supplied
                const admin = await Admin.findOne({ username });

                if (!admin) {
                    const obj = { username: username, password: password };
                    const newAdmin = new Admin(obj);
                    let adminDb = await newAdmin.save();
                    console.log(adminDb);
                    return {
                        id: adminDb._id,
                        email: adminDb.username,
                    }
                } else {
                    //TODO:: Make this safer, encrypt passwords
                    if (admin.password !== password) {
                        return null
                    }
                    // User is authenticated
                    return {
                        id: admin._id,
                        email: admin.username,
                    }
                }
            }
        }),
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        encryption: true
    },
}

export default NextAuth(authOptions)



