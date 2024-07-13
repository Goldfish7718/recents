"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Clipboard, RefreshCcw, SendHorizonal } from "lucide-react"
import chat from '@/data/chat.json'
import CustomTooltip from "@/components/CustomTooltip"
import { useState } from "react"
import { ChatSchema } from "@/types/types"
import axios from "axios"

const Limelight = () => {

  const [currentChat, setCurrentChat] = useState<ChatSchema[]>([]);
  const [prompt, setPrompt] = useState("");

  const getLimelightResponse = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news/limelight`, {
        prompt
      })

      const chatItem = {
        prompt,
        response: res.data.response,
        id: currentChat.length + 1
      }

      setCurrentChat([...currentChat, chatItem])
      console.log(res.data.response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* <div className="mt-20">
        TITLE
        <section className="text-center">
          <p className="text-4xl">
            Introducing 
            <span className="text-green-500"> Limelight AI</span>
          </p>
          <p className="text-neutral-700">A chatbot to get any news you want.</p>
        </section>

        INPUT EXAMPLES
        <section className="grid grid-cols-2 grid-rows-2 gap-3 md:w-2/3 lg:w-1/2 mx-auto mt-8">
          <Card className="bg-red-100 hover:bg-red-200 hover:cursor-pointer">
            <CardContent className="pt-4 flex flex-col gap-1">
              <p className="text-sm text-neutral-700">Sports</p>
              <h1 className="text-sm">Who won the British Grand Prix? <ArrowRight size={16} className="mx-1" /></h1>
            </CardContent>
          </Card>
          <Card className="bg-blue-100 hover:bg-blue-200 hover:cursor-pointer">
            <CardContent className="pt-4 flex flex-col gap-1">
              <p className="text-sm text-neutral-700">General</p>
              <h1 className="text-sm">What's the weather in Mumbai? <ArrowRight size={16} className="mx-1" /></h1>
            </CardContent>
          </Card>
          <Card className="bg-green-100 hover:bg-green-200 hover:cursor-pointer">
            <CardContent className="pt-4 flex flex-col gap-1">
              <p className="text-sm text-neutral-700">Politics</p>
              <h1 className="text-sm">Who won the Lok Sabha elections? <ArrowRight size={16} className="mx-1" /></h1>
            </CardContent>
          </Card>
          <Card className="bg-yellow-100 hover:bg-yellow-200 hover:cursor-pointer">
            <CardContent className="pt-4 flex flex-col gap-1">
              <p className="text-sm text-neutral-700">Global</p>
              <h1 className="text-sm">When is the G20 summit? <ArrowRight size={16} className="mx-1" /></h1>
            </CardContent>
          </Card>
        </section>
      </div> */}


      {/* CHAT INTERFACE */}
      <div className="mb-12">
        {currentChat.map(item => (
            <>
              <div className="bg-neutral-100 p-3 ml-auto rounded-md w-1/2 m-2">
                {item.prompt}

                <div className="flex mt-2">
                  <CustomTooltip label="Copy">
                    <Button variant="outline" size='sm' className="bg-neutral-100 hover:bg-neutral-200">
                      <Clipboard size={16} />
                    </Button>
                  </CustomTooltip>
                </div>
              </div>

              <div className="bg-neutral-100 p-3 mr-auto rounded-md w-2/3 m-2">
                {item.response}

                <div className="flex mt-2 gap-2">
                  <CustomTooltip label="Copy">
                    <Button variant="outline" size='sm' className="bg-neutral-100 hover:bg-neutral-200">
                      <Clipboard size={16} />
                    </Button>
                  </CustomTooltip>
                  
                  <CustomTooltip label="Regenerate">
                    <Button variant="outline" size='sm' className="bg-neutral-100 hover:bg-neutral-200">
                      <RefreshCcw size={16} />
                    </Button>
                  </CustomTooltip>
                </div>
              </div>
            </>
          ))
        }
      </div>

      {/* INPUT */}
      <div className="flex gap-3 fixed bottom-2 right-2 left-2 sm:left-[308px]">
        <Input placeholder="Chat with Limelight" onChange={e => setPrompt(e.target.value)} />
        <Button variant='outline' onClick={getLimelightResponse}><SendHorizonal size={18} /></Button>
      </div>
    </div>
  )
}

export default Limelight