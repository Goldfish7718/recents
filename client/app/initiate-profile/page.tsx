"use client"

import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup } from '@/components/ui/dropdown-menu'
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import countries from '@/data/countries.json'
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

const page = () => {

    const [country, setCountry] = useState("in");

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
                    <div className="flex items-center gap-2">
                        <Checkbox value="business" id="business" />
                        <label htmlFor="business">Business</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox value="technology" id="technology" />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox value="entertainment" id="entertainment" />
                        <label htmlFor="entertainment">Entertainment</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox value="sports" id="sports" />
                        <label htmlFor="sports">Sports</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox value="health" id="health" />
                        <label htmlFor="health">Health</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox value="science" id="science" />
                        <label htmlFor="science">Science</label>
                    </div>
                </div>
            </div>

            <Button className="bg-yellow-500 ml-auto hover:bg-yellow-600">Complete setup <ArrowRight size={18} className="mx-2" /></Button>
        </section>
    </div>
  )
}

export default page