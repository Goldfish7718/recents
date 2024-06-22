"use client"

import { Button } from "@/components/ui/button";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowUpRightFromSquare, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Home() {
  return (
    <main>
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
                <Button variant='outline'>Sign up to join Waitlist <ArrowUpRightFromSquare className="mx-2" /></Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <Alert className="text-left">
                <Check size={16} />
                <AlertTitle>
                  You have joined the waitlist
                </AlertTitle>
                <AlertDescription>
                  We will send you an update as soon as the MVP ships.
                </AlertDescription>
              </Alert>
            </SignedIn>
          </div>
        </div>
      </section>
    </main>
  );
}
