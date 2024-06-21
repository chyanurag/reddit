import client from '@/lib/prisma'
import JoinForm from '@/components/JoinForm'
import { auth } from '@clerk/nextjs/server'
import LeaveForm from '@/components/LeaveForm'
import Link from 'next/link'

async function Subreddit({ sub }) {
    const { userId } = auth()
    const members = await client.subredditMember.findMany({
        where: {
            subredditId: sub.id
        }
    })

    const isJoined = members.filter(member => member.userId  === userId)
    return (
        <div className='flex justify-between my-5'>
            <Link className='text-xl' href={`/subreddits/${sub.name}`}>{sub.name}</Link>
            <div className='flex items-center justify-center'>
                <h3 className='text-gray mx-5'>{members.length} Members</h3>
                {isJoined.length > 0 ? <LeaveForm sid={sub.id}/> : <JoinForm sid={sub.id} />}
            </div>
        </div>
    )
}

export default async function Subreddits() {
    const subreddits = await client.subreddit.findMany()

    return (
        <div className='w-2/4 mx-auto'>
            <h1 className='my-5 text-2xl'>Subreddits you can join</h1>
            <div>
            {subreddits.map(sub => <Subreddit key={sub.id} sub={sub}/>)}
            </div>
        </div>
    )
}
