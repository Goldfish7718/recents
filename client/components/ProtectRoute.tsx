"use client"

import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface ProtectRouteProps {
    children: React.ReactNode
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {

    const { isLoaded, isSignedIn }  = useUser()
    const { loading, userExists, fetchUserExists } = useAuth()
    const router = useRouter()

    useEffect(() => {
        fetchUserExists()
    }, [])

    if (!isLoaded || loading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <Loader2 size={48} className='animate-spin duration-300'/>
            </div>
        )
    } else if (isLoaded && !isSignedIn) {
        router.push('/')
    } else if (isLoaded && isSignedIn && userExists && !loading) {
        return (
            <>
                {children}
            </>
        )
    } else if (isLoaded && isSignedIn && !userExists && !loading) {
        router.push('/initiate-profile')
    }
}

export default ProtectRoute