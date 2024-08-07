"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs";
import axios from 'axios';
import { UserType } from "@/types/types";

interface AuthProviderProps {
    children: React.ReactNode
}

interface AuthContextType {
    user: UserType | null;
    getUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)
export const useAuth = (): AuthContextType => {return useContext(AuthContext) as AuthContextType}

function AuthProvider ({ children }: AuthProviderProps) {

    const { user: clerkUser, isLoaded, isSignedIn } = useUser()

    const [user, setUser] = useState<UserType | null>(null);

    const getUser = async () => {
        try { 
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get/${clerkUser?.id}`)
            setUser(res.data.user)
        } catch (error) {
            console.log(error)            
        }
    }

    useEffect(() => {
        if (isLoaded && isSignedIn)
            getUser()
    }, [isLoaded, isSignedIn])

    const value = {
        user,
        getUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider