import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] })
import Link from 'next/link';
import {useSession} from "next-auth/react"
import { useRouter } from 'next/router';


export default function Home() {
  const session = useSession();
  const isLoggedIn = session.data ? true : false;
  const router = useRouter();


  if(isLoggedIn)
  {
    router.push('NoteForm');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <title>Recap Rover - Occasion Reminder App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
   
    
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to RecapRover</h1>
      <p className="text-lg mb-8">Never forget important things again!</p>
      {/* Add more content or components here */}
    </main>

    <footer className="w-full h-24 flex items-center justify-center border-t">
      <p className="text-center">
        RecapRover - &copy; {new Date().getFullYear()}
      </p>
    </footer>
  </div>
  )
}
