"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpRightFromSquare, CircleGauge, LogIn, LogOut, Menu, PenLine, Plus, Search, Settings, StickyNote, User, UserPlus, Zap } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SignOutButton, SignedIn, SignedOut, useUser, SignInButton, SignUpButton } from "@clerk/clerk-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
  

const Navbar = () => {

    const { user } = useUser()
    const router = useRouter()

  return (
    <nav className="p-4 w-full flex justify-between items-center z-10 dark:bg-[#0c0a09] bg-white fixed top-0">
        <h3 className="text-3xl hover:cursor-pointer font-bold underline decoration-yellow-400 decoration-4 text-[#242424]">Recents.</h3>

        {/* MOBILE NAVIGATION - [RIGHT SHEET] */}
        <Sheet>
            <SheetTrigger className="sm:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <SheetTitle>
                    <span className="font-bold underline decoration-yellow-400 decoration-4 text-2xl">
                        Recents.
                    </span>
                </SheetTitle>
                <div className="my-6 flex flex-col justify-center gap-3">
                    <SignedOut>
                        <SheetClose asChild>
                            <Button variant="outline">Sign In <LogIn size={18} className="mx-1" /></Button>
                        </SheetClose>

                        <SheetClose asChild>
                            <Button variant="outline">Sign up <User size={18} className="mx-1" /></Button>
                        </SheetClose>
                    </SignedOut>
                    <SignedIn>
                        <SheetClose asChild>
                            <Button variant='outline'>{user?.fullName} <User size={18} className="mx-1" /></Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button variant='outline'>Settings<Settings size={18} className="mx-1" /></Button>
                        </SheetClose>

                        <SignOutButton>
                            <SheetClose asChild>
                                <Button variant='outline'>Log Out<LogOut size={18} className="mx-1" /></Button>
                            </SheetClose>
                        </SignOutButton>
                    </SignedIn>
                </div>
            </SheetContent>
        </Sheet>

        {/* DESKTOP NAVIGATION */}
        <div className="sm:flex gap-2 hidden"> 
            <SignedOut>
                <SignInButton>
                    <Button variant='outline'>Sign In <LogIn size={18} className="mx-1" /></Button>
                </SignInButton>
                <SignUpButton>
                    <Button variant='outline'>Sign Up <User size={18} className="mx-1" /></Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                {/* <Button variant='outline' onClick={() => router.push('/dashboard')}>Dashboard <CircleGauge size={18} className="mx-1" /></Button> */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline'>
                            {user?.fullName} <User size={18} className="mx-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <SignOutButton>
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log Out</span>
                            </DropdownMenuItem>
                        </SignOutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar