"use client"

import { Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";

interface NewsCardProps {
    title: string;
    summary: string;
    source: string;
    publishedAt: string;
    url: string;
}

const NewsCard = ({ title, summary, source, publishedAt, url }: NewsCardProps) => {

    const router = useRouter()

  return (
    <Card className="my-3 sm:m-3 rounded-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-t-lg">
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
            <p className="text-neutral-700">{summary}</p>
        </CardContent>
        <Separator />
        <CardFooter className="mt-4 flex flex-col items-start gap-2 text-neutral-600">
            <h3 className="text-sm flex items-center font-light hover:underline hover:cursor-pointer" onClick={() => window.open(url, '_blank')}>
                Source: {source} <LinkIcon size={14} className="mx-2" />
            </h3>
            <h3 className="text-sm font-light">
                Published at: {publishedAt}
            </h3>
        </CardFooter>
    </Card>
  )
}

export default NewsCard