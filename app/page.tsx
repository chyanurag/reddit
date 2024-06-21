import { SignInButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
    const user = await currentUser()

    if(!user){
        return (
            <div className='text-center'>
                <h1 className="text-3xl my-5">Please login to continue</h1>
                <SignInButton className="p-3 bg-orange-500 text-white text-xl"/>
            </div>
        )
    }

    return (
        <main className='text-center'>
            <h1 className='m-5'>Hello {user?.username}</h1>
            <Link href="/subreddits/new" className='p-3 text-md text-white bg-orange-500'>New Subreddit</Link>
        </main>
    )
}
