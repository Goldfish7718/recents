"use client"

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProtectRouteProps {
    children: React.ReactNode
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {

    const { isLoaded, isSignedIn }  = useUser()
    const router = useRouter()

    if (!isLoaded) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <Loader2 size={48} className='animate-spin duration-300'/>
            </div>
        )
    } else if (isLoaded && !isSignedIn) {
        router.push('/')
    } else if (isLoaded && isSignedIn) {
        return (
            <>
                {children}
            </>
        )
    }
}

export default ProtectRoute