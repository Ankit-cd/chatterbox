import bcrypt from  'bcrypt';
import NextAuth, {AuthOptions} from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/app/libs/prismadb';


export const authOptions:AuthOptions ={
    adapter:PrismaAdapter(prisma),
    providers:[
        Github({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string,
        }),
         Google({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),

    ]
}