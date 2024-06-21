import client from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from 'next/link'

async function Post({ post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    )
}

export default async function Subreddit({ params } : {
    params: {
        subName: string
    }
}) {
    const subreddit = await client.subreddit.findFirst({
        where: {
            name: params.subName
        }
    })

    if(!subreddit){
        notFound()
    }

    const posts = await client.post.findMany({
        where: {
            subredditId: subreddit.id
        }
    })


    return (
        <div className='flex items-center'> 
            <div className="basis-4/5">
                <h1 className='text-xl font-medium m-5'>Latest from {params.subName}</h1>
                {posts.map(post => <Post post={post} />)}
            </div>
            <div className="">
                <Link href={`/subreddits/${params.subName}/new`} className="p-4 text-lg font-medium text-white bg-orange-500">Add post</Link>
            </div>
        </div>
    )
}
