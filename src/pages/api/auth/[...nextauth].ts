import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
//import {Providers} from `next-auth/providers`
import { dbConnect} from '@/utils/dbConnect';
import { Admin } from "@/models/Admin";

import GoogleProvider from "next-auth/providers/google"
 const clientId  = process.env.NEXT_GOOGLE_CLIENT_ID 
 const clientSecret = process.env.NEXT_CLIENT_SECRET

 if (!clientId) {
    console.error('clientId is not defined in the environment variables.');
    process.exit(1);
  }
  
  if(!clientSecret) {
      console.error('clientSecret is not defined in the environment variables.');
      process.exit(1);
  }
 
export const authOptions :  any = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: clientId ,
            clientSecret: clientSecret ,
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



