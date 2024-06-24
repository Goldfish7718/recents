"use client"

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup } from '@/components/ui/dropdown-menu'
import { AlertCircle, ChevronDown, RotateCcw, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import countries from '@/data/countries.json'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import NewsCard from '@/components/NewsCard'
import summaries from '@/data/summaries.json'

const DailySummaries = () => {

    const [category, setCategory] = useState("General");
    const [country, setCountry] = useState("in");

  return (
    <section className='mx-2 sm:mx-0'>
        {/* INTRODUCTION TO SUMMARIZER */}
        {/* <div>
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
                    <Button variant='outline'>Generate Summaries <Sparkles className='mx-2' size={18} /></Button>
                </CardFooter>
            </Card>
        </div> */}

        {/* SUMMARIES */}
        <div>
            <div className='flex flex-col'>
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
                                    <DropdownMenuRadioItem value="Technology" key="technology">TechnoLogy</DropdownMenuRadioItem>
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
                        <Input placeholder='Optional Keyword' />
                        <Button variant='destructive'>Regenerate <RotateCcw size={18} className='mx-2' /></Button>
                    </div>
                </div>
            </div>

            <div className='my-4'>
                {summaries.transformedSummaries.map((summary, index) => (
                        <NewsCard {...summary} source={summary.source.name} key={index} />
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default DailySummaries