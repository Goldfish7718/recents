"use client"

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup } from '@/components/ui/dropdown-menu'
import { AlertCircle, ChevronDown, Loader2, RotateCcw, Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import countries from '@/data/countries.json'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import NewsCard from '@/components/NewsCard'
import { useAuth } from '@/context/AuthContext'
import { Summary } from '@/types/types'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useUser } from '@clerk/nextjs'

const DailySummaries = () => {

    const { user } = useAuth()
    const { toast } = useToast()
    const { user: clerkUser } = useUser()

    const [category, setCategory] = useState("General");
    const [country, setCountry] = useState(user?.country);
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setkeyword] = useState("");

    const fetchSummaries = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news/daily`, {
                category,
                country,
                q: keyword,
                clerkId: clerkUser?.id
            })

            setSummaries(res.data.transformedSummaries)
        } catch (error) {
            console.log(error);
            toast({
                title: 'An Error Occured!',
                description: 'Please try later',
                duration: 5000,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user && user.country) {
            setCountry(user.country);
        } else {
            setCountry("in");
        }
    }, [user]);

  return (
    <section className='mx-2 sm:mx-0'>
        {/* INTRODUCTION TO SUMMARIZER */}
        {summaries.length == 0 &&
            <div>
                <h1 className='font-medium bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>Welcome to Daily Summaries</h1>        
                <Card className='mt-6'>
                    <CardHeader>
                        <CardTitle>
                            What are daily summaries?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Introducing the pinnacle of news consumption efficiency: our AI News Summarizer. Revolutionize your reading habits with concise, insightful summaries generated from five articles at once. Whether catching up on global affairs or diving into niche interests, this innovative tool distills complex information into digestible chunks, saving you time without sacrificing depth. Powered by cutting-edge AI technology, it ensures you stay informed effortlessly. Perfect for professionals, students, and anyone seeking streamlined access to multiple perspectives. Embrace the future of information with our AI News Summarizer – where comprehensive understanding meets unparalleled convenience.
                        </p>

                        <Alert variant='destructive' className='mt-4'>
                            <AlertCircle className='h-6 w-6' />
                            <AlertTitle>
                                Heads Up
                            </AlertTitle>
                            <AlertDescription>
                                Recents may not produce the desired results always or produce results that are potentially offensive. Please proceed on your caution
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter>
                        <Button variant='outline' onClick={fetchSummaries} disabled={loading}>
                            {!loading &&
                                <>
                                    Generate Summaries <Sparkles className='mx-2' size={18} />
                                </>
                            }
                            {loading && <Loader2 size={24} className='animate-spin duration-300' />}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        }

        {/* SUMMARIES */}
        {summaries.length > 1 &&
            <div>
                <div className='flex flex-col sm:m-3'>
                    <Label>Paramters:</Label>
                    <div className='flex flex-col sm:flex-row my-2 gap-2'>
                        <div className='flex gap-2'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className='w-full' variant='outline'>{countries.find(currentCountry => currentCountry.code == country)?.country} <ChevronDown size={18} className='mx-2' /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuRadioGroup value={country} onValueChange={setCountry}>
                                        <ScrollArea className='h-72'>
                                            {countries.map(country => (
                                                <DropdownMenuRadioItem value={country.code} key={country.code}>{country.country}</DropdownMenuRadioItem>
                                                ))
                                            }
                                        </ScrollArea>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className='w-full' variant='outline'>{category} <ChevronDown size={18} className='mx-2' /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
                                        <DropdownMenuRadioItem value="General" key="general">General</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Technology" key="technology">Technology</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Business" key="business">Business</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Entertainment" key="entertainment">Entertainment</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Sports" key="sports">Sports</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Health" key="health">Health</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Science" key="science">Science</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-2 w-full'>
                            <Input placeholder='Optional keyword or phrase' onChange={e => setkeyword(e.target.value)} disabled />
                            <Button variant='destructive' onClick={fetchSummaries} disabled={loading} className='sm:w-1/4 w-full'>
                                {!loading &&
                                    <>
                                        Regenerate <RotateCcw size={18} className='mx-2' />
                                    </>
                                }
                                {loading && <Loader2 size={18} className='animate-spin duration-300' />}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='my-4'>
                    {summaries.map((summary, index) => (
                            <NewsCard {...summary} source={summary.source.name} key={index} />
                        ))
                    }
                </div>
            </div>
        }
    </section>
  )
}

export default DailySummaries