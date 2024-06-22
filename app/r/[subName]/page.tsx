import client from "@/lib/prisma"
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { notFound } from "next/navigation"
import { clerkClient } from '@clerk/nextjs/server'
import Link from 'next/link'
import { IoOpenOutline } from 'react-icons/io5'
import UpvoteForm from '@/components/UpvoteForm'
import DownvoteForm from '@/components/DownvoteForm'
import RemoveUpvoteForm from '@/components/RemoveUpvoteForm'
import RemoveDownvoteForm from '@/components/RemoveDownvoteForm'

async function Post({ post }) {
    const user = await clerkClient.users.getUser(post.userId)
    const { userId } = auth() 

    const isUpvoted = await client.upvote.findFirst({
        where: {
            postId: post.id,
            userId: userId || ''
        }
    })
    const upvotes = await client.upvote.count({
        where: {
            postId: post.id
        }
    })
    const downvotes = await client.downvote.count({
        where: {
            postId: post.id
        }
    })
    const isDownvoted = await client.downvote.findFirst({
        where: {
            postId: post.id,
            userId: userId || ''
        }
    })
    return (
        <div className="m-5 shadow-lg bg-gray-100 p-5">
            <div className='flex justify-between'>
                <Link className="text-xl" href={`/p/${post.id}`}>{post.title}</Link>
                <Link href={`/p/${post.id}`}> <IoOpenOutline /> </Link>
            </div>
            <p className="text-md">{post.content}</p>
            {post.images.length > 0 ? <Image src={post.images[0]} width={400} height={400} alt={post.title}/> : null}
            <div>
                <Link href={`/profile/${user.username}`}>Posted by {user.username}</Link>
            </div>
            <div className="p-2 flex items-center">
                {isUpvoted ? <RemoveUpvoteForm pid={post.id} upvotes={upvotes}/> : <UpvoteForm pid={post.id} upvotes={upvotes}/>}
                {isDownvoted ? <RemoveDownvoteForm pid={post.id} downvotes={downvotes}/> : <DownvoteForm pid={post.id} downvotes={downvotes}/>}
            </div>
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
        <div className='flex'> 
            <div className="basis-4/5">
                <h1 className='text-xl font-medium m-5'>Latest from {params.subName}</h1>
                {posts.map(post => <Post key={post.id} post={post} />)}
            </div>
            <div className="basis-1/5 my-20">
                <Link href={`/r/${params.subName}/new`} className="p-4 text-lg font-medium text-white bg-orange-500">Add post</Link>
            </div>
        </div>
    )
}
