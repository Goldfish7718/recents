"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Clipboard, Loader2, OctagonAlert, RefreshCcw, SendHorizonal, Sparkle } from "lucide-react"
import CustomTooltip from "@/components/CustomTooltip"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TextGenerateEffect } from "@/components/text-generate-effect"
import { LimelightResponse } from "@/types/types"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { socket } from "@/app/globals"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@clerk/nextjs"

const Limelight = () => {

  const [prompts, setPrompts] = useState<string[]>([]);
  const [responses, setResponses] = useState<LimelightResponse[]>([]);
  const [loading, setLoading] = useState('');

  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(0);

  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const bottomRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { user } = useUser()

  const copyToClipBoard = async (copyText: string) => {
    navigator.clipboard.writeText(copyText).then(() => {
      toast({
        title: "Copied to Clipboard!",
        duration: 1000
      })
    })
  }

  const executeSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt);
    getLimelightResponse(suggestedPrompt);
  }

  const getLimelightResponse = async (currentPrompt: string) => {
    try {
      setPrompts([...prompts, currentPrompt])
      
      setPrompt("")

      socket.emit('get_response', { prompt: currentPrompt, clerkId: user?.id })
    } catch (error) {
      console.log(error);

      const errorObject: LimelightResponse = {
        response: '',
        sourceLinks: [],
        sourceNames: [],
        image: '',
        error: true
      }

      setResponses([...responses, errorObject])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && prompt) {
      sendButtonRef.current?.click()
      inputRef.current?.blur()
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [prompts, responses]);

  useEffect(() => {
    socket.on('receive', (data) => {
      setResponses([...responses, data])
      setLoading('')
      setProgress(0)
    })
  }, [prompts, responses])

  useEffect(() => {
    socket.on('loading', (data) => {
      setLoading(data.loadPhrase)
      setProgress(data.progress)
    })
  }, [loading])

  return (
    <div>
      {prompts.length == 0 &&
        <div className="mt-20">
          {/* TITLE */}
          <section className="text-center">
            <p className="text-4xl">
              Introducing&nbsp; 
              <span className="text-green-500"> 
                Limelight AI&nbsp; 
              </span>
              <span className="text-neutral-400 text-lg">
                version 1.5.2
              </span>
            </p>
            <p className="text-neutral-700">A chatbot to get any news you want.</p>
          </section>

          {/* INPUT EXAMPLES */}
          <section className="grid grid-cols-2 grid-rows-2 gap-3 md:w-2/3 lg:w-1/2 mx-auto mt-8">
            <Card className="bg-red-100 hover:bg-red-200 hover:cursor-pointer" onClick={() => executeSuggestedPrompt("Who won the British Grand Prix?")}>
              <CardContent className="pt-4 flex flex-col gap-1">
                <p className="text-sm text-neutral-700">Sports</p>
                <h1 className="text-sm">Who won the British Grand Prix? <ArrowRight size={16} className="mx-1" /></h1>
              </CardContent>
            </Card>
            <Card className="bg-blue-100 hover:bg-blue-200 hover:cursor-pointer" onClick={() => executeSuggestedPrompt("What's the weather in Mumbai?")}>
              <CardContent className="pt-4 flex flex-col gap-1">
                <p className="text-sm text-neutral-700">General</p>
                <h1 className="text-sm">What&apos;s the weather in Mumbai? <ArrowRight size={16} className="mx-1" /></h1>
              </CardContent>
            </Card>
            <Card className="bg-green-100 hover:bg-green-200 hover:cursor-pointer" onClick={() => executeSuggestedPrompt("Who won the Lok Sabha elections?")}>
              <CardContent className="pt-4 flex flex-col gap-1">
                <p className="text-sm text-neutral-700">Politics</p>
                <h1 className="text-sm">Who won the Lok Sabha elections? <ArrowRight size={16} className="mx-1" /></h1>
              </CardContent>
            </Card>
            <Card className="bg-yellow-100 hover:bg-yellow-200 hover:cursor-pointer" onClick={() => executeSuggestedPrompt("When is the G20 summit?")}>
              <CardContent className="pt-4 flex flex-col gap-1">
                <p className="text-sm text-neutral-700">Global</p>
                <h1 className="text-sm">When is the G20 summit? <ArrowRight size={16} className="mx-1" /></h1>
              </CardContent>
            </Card>
          </section>
        </div>
      }


      {/* CHAT INTERFACE */}
      <div className="mb-12">
        {prompts.length > 0 && prompts.map((item, index) => (
            <div key={index}>
              <div className="bg-neutral-100 p-3 ml-auto rounded-md w-2/3 sm:w-1/2 m-2">
                {item}

                <div className="flex mt-2">
                  <CustomTooltip label="Copy">
                    <Button variant="outline" size='sm' className="bg-neutral-100 hover:bg-neutral-200" onClick={() => copyToClipBoard(item)}>
                      <Clipboard size={16} />
                    </Button>
                  </CustomTooltip>
                </div>
              </div>
            
              {responses[index] ?
                <>
                {!responses[index].error ?
                  <div className="bg-neutral-100 p-3 mr-auto rounded-md w-2/3 m-2">
                    <div className="mb-4">
                      <img src={responses[index].image} className='w-full object-cover rounded-md animate-fadeIn' alt="image"/>
                    </div>
                    <TextGenerateEffect words={responses[index].response} />
                  
                    <div className="flex mt-2 gap-2">
                      <CustomTooltip label="Copy">
                      <Button variant="outline" size='sm' className="bg-neutral-100 hover:bg-neutral-200" onClick={() => copyToClipBoard(responses[index].response)}>
                      <Clipboard size={16} />
                      </Button>
                      </CustomTooltip>
                        
                      {/* <CustomTooltip label="Regenerate">
                        <Button variant="outline" size='sm' className="bg-neutral-100 hover:bg-neutral-200">
                        <RefreshCcw size={16} />
                        </Button>
                        </CustomTooltip> */}
                    </div>

                    <Separator className="my-2" />

                    <div>
                      <p className="text-neutral-600 text-sm">Sources:</p>
                      <div className="ml-4">
                        {responses[index].sourceLinks.map((sourceLink, sourceIndex) => (
                          <>
                            <Link className="text-neutral-600 text-sm underline decoration-neutral-600" href={sourceLink} target="_blank">{responses[index].sourceNames[sourceIndex]}</Link>
                            <br />
                          </>
                        ))
                        }
                      </div>
                    </div>
                  </div> :
                  <Alert className="p-3 mr-auto rounded-md w-2/3 m-2" variant='destructive'>
                    <OctagonAlert className="w-4 h-4" />
                    <AlertTitle>Error Generating responses</AlertTitle>
                    <AlertDescription>Please try later</AlertDescription>
                  </Alert>
                }
                </>
                : 
                <div className="bg-neutral-100 p-3 mr-auto rounded-md m-2 flex flex-col w-2/3 gap-1">
                  <div className="flex gap-2">
                    <span>{loading}</span>
                    <Sparkle className="animate-spin duration-1000" />
                  </div>
                  <Progress value={progress} className="" />
                </div>
              }
            </div>
          ))
        }
      </div>

      {/* INPUT */}
      <div className="flex gap-3 fixed bottom-2 right-2 left-2 sm:left-[308px]">
        <Input ref={inputRef} placeholder="Chat with Limelight" onChange={e => setPrompt(e.target.value)} value={prompt} onKeyDown={handleKeyPress} />
        <Button ref={sendButtonRef} variant='outline' onClick={() => getLimelightResponse(prompt)} disabled={!prompt ? true : false}><SendHorizonal size={18} /></Button>
      </div>

      <div ref={bottomRef} className="mb-10"></div>
    </div>
  )
}

export default Limelight