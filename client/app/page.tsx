"use client"

import { Button } from "@/components/ui/button";
import { SignUpButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRight, ArrowUpRightFromSquare, Loader2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter()
  const { isSignedIn, user } = useUser()
  
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get/${user?.id}`)
      
      if (!res.data.user) {
        router.push('/profile')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSignedIn) {  
      fetchUser()
    }
  }, [isSignedIn])

  return (
    <main>
      {!loading ?
        <section className="h-screen flex justify-center items-center">
          <div className="flex flex-col text-center">
            <h1 className="underline md:text-6xl text-4xl decoration-yellow-400 decoration-8 text-[#242424] mt-6">Recents.</h1>
            <div className="my-6 md:my-10 mx-2 md:mx-0">
              <h3 className="text-neutral-600 text-lg md:text-2xl">
                Your daily news. Summarized with Generative-AI
              </h3>
              <p className="text-neutral-400 text-sm md:text-lg mt-4">Get AI Generated news summaries at your demand.<br /> Catch up to daily affairs with Natural Language Prompts & more!</p>
            </div>

            <div className="mx-2">
              <SignedOut>
                <SignUpButton>
                  <Button className="bg-yellow-500 hover:bg-yellow-600">Sign up <ArrowUpRightFromSquare size={18} className="mx-2" /></Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 w-1/2" onClick={() => router.push('/dashboard')}>Go to Dashboard <ArrowRight size={18} className="mx-2" /></Button>
                  <Button onClick={() => router.push('/profile')} variant="outline" className="border-yellow-500 text-yellow-500 hover:text-yellow-600 hover:border-yellow-600 hover:bg-yellow-50 w-1/2">Profile <User size={18} className="mx-2" /></Button>
                </div>
              </SignedIn>
            </div>
          </div>
        </section>
        :
        <div className='h-screen flex justify-center items-center'>
          <Loader2 size={48} className='animate-spin duration-300'/>
        </div>
      }
    </main>
  );
}
