import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, SendHorizonal } from "lucide-react"

const page = () => {
  return (
    <div>
      <div className="mt-20">
        {/* TITLE */}
        <section className="text-center">
          <p className="text-4xl">
            Introducing 
            <span className="text-green-500"> Limelight AI</span>
          </p>
          <p className="text-neutral-700">A chatbot to get any news you want.</p>
        </section>

        {/* INPUT EXAMPLES */}
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
      </div>

      {/* INPUT */}
      <div className="flex gap-3 mt-2">
        <Input placeholder="Chat with Limelight" />
        <Button variant='outline'><SendHorizonal size={18} /></Button>
      </div>
    </div>
  )
}

export default page