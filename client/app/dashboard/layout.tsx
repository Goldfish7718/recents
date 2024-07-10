"use client"

import ProtectRoute from "@/components/ProtectRoute"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SignOutButton } from "@clerk/nextjs"
import { CircleGauge, Cpu, LogOut, Newspaper } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {

    const router = useRouter()

  return (
    // <ProtectRoute>
    <>
        <aside className="min-h-screen fixed w-[300px] top-[72px] hidden sm:flex flex-col bg-neutral-100">
            <div className="flex flex-col">
                <Button className="w-full py-6 flex justify-start" variant='ghost' onClick={() => router.push('/dashboard/daily')}>Daily Summarizer <Newspaper size={18} className="mx-2" /></Button>
                <Button className="w-full py-6 flex justify-start" variant='ghost' onClick={() => router.push('/dashboard/limelight')}>Limelight <Cpu size={18} className="mx-2" /> <Badge variant="success">Coming Soon</Badge></Button>
                <Button className="w-full py-6 flex justify-start" variant='ghost' onClick={() => router.push('/dashboard')}>Dashboard <CircleGauge size={18} className="mx-2" /></Button>
            </div>
            <div>
                <SignOutButton>
                    <Button className="w-full py-6 flex justify-start" variant='ghost'>Sign out <LogOut size={18} className="mx-2" /></Button>
                </SignOutButton>
            </div>
        </aside>
        <div className="sm:ml-[300px] mt-[72px] p-2">
            {children}
        </div>
    </>
    // </ProtectRoute>
  )
}

export default DashboardLayout