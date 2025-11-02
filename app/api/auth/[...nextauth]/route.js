import {CD} from "@db/database";
import User from "@models/user";

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const dynamic = 'force-dynamic'
const handler=NextAuth({
  
  providers:[
    GoogleProvider({
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks:{
    
    async session({session}){
      const nU=await User.findOne({email:session.user.email})
      session.user.id=nU._id.toString()
      return session
    },

    async signIn({profile}){
      try {
        await CD()
        const uE=await User.findOne({email:profile.email})
        if (!uE){
          await User.create({
            username:profile.name.replace(" ","").toLowerCase(),
            email:profile.email,
            image:profile.picture         
          })
          console.log("Made")
        }
        return true
      } catch (error) {
        console.log(error);return false
      }
    }

    
  }

})

export {handler as GET,handler as POST}
