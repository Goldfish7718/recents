"use client"

import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup } from '@/components/ui/dropdown-menu'
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import countries from '@/data/countries.json'
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"

const Profile = () => {

    const { user: clerkUser } = useUser()
    const { user, getUser } = useAuth()
    const { toast } = useToast()
    const router = useRouter()

    const [country, setCountry] = useState("");
    const [interests, setInterests] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const updateInterests = (newInterest: string) => {
        if (interests.includes(newInterest)) {
            setInterests(prevInterests => prevInterests.filter(item => item !== newInterest));
        } else {
            setInterests(prevInterests => [...prevInterests, newInterest]);
        }
    }

    const requestCreateUser = async () => {
        try {
            setLoading(true)
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
                email: clerkUser?.emailAddresses[0].emailAddress,
                clerkId: clerkUser?.id,
                country,
                interests
            })
            
            getUser()
            router.push('/')
        } catch (error) {
            console.log(error);
            toast({
                title: "Sorry! An Error occured!",
                description: "Please try later.",
                duration: 3000,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user)
            setCountry(user?.country)
    }, [user])

    useEffect(() => {
        if (user)
            setInterests(user?.interests as string[])
    }, [user])

  return (
    <div className="flex items-center justify-center h-screen">
        <section className="flex flex-col gap-4 w-fit">
            <div className="flex flex-col gap-2">
                <div>
                    <Label>Select country:</Label><br />
                    <span className="text-sm text-neutral-500">We collect this information to give relevant news for your region</span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='w-fit' variant='outline'>{countries.find(currentCountry => currentCountry.code == country)?.country} <ChevronDown size={18} className='mx-2' /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup onValueChange={setCountry}>
                            <ScrollArea className='h-72'>
                                {countries.map(country => (
                                    <DropdownMenuRadioItem value={country.code} key={country.code}>{country.country}</DropdownMenuRadioItem>
                                ))
                            }
                            </ScrollArea>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <div>
                    <Label>What news are you interested in?</Label><br />
                    <span className="text-sm text-neutral-500">We will personalize your news according to your preferences</span>
                </div>

                <div className="flex flex-col gap-1 text-neutral-700">
                    <div className="flex items-center gap-2" onClick={() => updateInterests("business")}>
                        <Checkbox value="business" id="business" checked={interests.includes("business")} />
                        <label htmlFor="business">Business</label>
                    </div>
                    <div className="flex items-center gap-2" onClick={() => updateInterests("technology")}>
                        <Checkbox value="technology" id="technology" checked={interests.includes("technology")} />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="flex items-center gap-2" onClick={() => updateInterests("entertainment")}>
                        <Checkbox value="entertainment" id="entertainment" checked={interests.includes("entertainment")} />
                        <label htmlFor="entertainment">Entertainment</label>
                    </div>
                    <div className="flex items-center gap-2" onClick={() => updateInterests("sports")}>
                        <Checkbox value="sports" id="sports" checked={interests.includes("sports")} />
                        <label htmlFor="sports">Sports</label>
                    </div>
                    <div className="flex items-center gap-2" onClick={() => updateInterests("health")}>
                        <Checkbox value="health" id="health" checked={interests.includes("health")} />
                        <label htmlFor="health">Health</label>
                    </div>
                    <div className="flex items-center gap-2" onClick={() => updateInterests("science")}>
                        <Checkbox value="science" id="science" checked={interests.includes("science")} />
                        <label htmlFor="science">Science</label>
                    </div>
                </div>
            </div>

            <Button className="bg-yellow-500 ml-auto hover:bg-yellow-600" onClick={requestCreateUser} disabled={loading}>
                {!loading && <>Complete setup <ArrowRight size={18} className="mx-2" /></>}
                {loading && <Loader2 className="animate-spin duration-300" size={18} />}
            </Button>
        </section>
    </div>
  )
}

export default Profile