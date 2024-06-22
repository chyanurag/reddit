'use client'
import Link from 'next/link'
import { SignOutButton, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { IoIosLogOut } from 'react-icons/io'

export default function Navbar() {
    return (
        <nav className="flex justify-between bg-orange-500 text-xl text-medium p-5 text-white">
            <div>
                <Link href="/" className='mx-5'>Home</Link>
                <Link href="/r" className="mx-5">Subreddits</Link>
            </div>
            <div className="flex items-center">
                <SignedIn>
                    <div className='flex items-center mx-2'>
                        <UserButton />
                    </div>
                    <div className='flex items-center mx-2'>
                        <SignOutButton />
                        <IoIosLogOut size="28"/>
                    </div>
                </SignedIn>
            </div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </nav>
    )
}
