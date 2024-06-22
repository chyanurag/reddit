import client from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function PostPage({ params } : {
    params: {
        postId: string
    }
}) {
    const post = await client.post.findFirst({
        where: {
            id: params.postId
        }
    })
    if(!post){
        notFound()
    }

    return (
        <div>
            <h1>Viewing post {params.postId}</h1>
            {post.images ? <Image src={post.images[0]} width={400} height={400} alt={post.title}/> : null}
        </div>
    )
}
