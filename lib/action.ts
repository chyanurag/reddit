'use server'
import { auth } from '@clerk/nextjs/server'
import fs from 'node:fs/promises'
import path from 'node:path'
import { revalidatePath } from 'next/cache'
import client from './prisma'

const ALLOWED_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp']

export async function createSubreddit(prevState: any, formData: FormData) {
    const { userId } = auth()
    if(!userId){
        return {
            type: 'error',
            message: 'You need to sign in to continue'
        }
    }
    const sname = formData.get('sname')
    if(!sname || sname === "") {
        return {
            type: "error",
            message: "Please provide a subreddit name"
        }
    }
    const subreddit = await client.subreddit.findFirst({
        where: {
            name: sname as string
        }
    })
    if(subreddit){
        return {
            type: 'error',
            message: 'Subreddit already exists'
        }
    }
    try{
        await client.subreddit.create({
            data: {
                name: sname as string,
                owner: userId

            }
        })
        return {
            type: 'success',
            message: 'Subreddit created succesfully'
        }
    } catch (e) {
        console.error(e)
        return {
            type: 'error',
            message: 'Something went wrong'
        }
    }
}

export async function joinSubreddit(prevState: any, formData: FormData){
    const { userId } = auth()
    if(!userId){
        return {
            type: 'error',
            message: 'You need to log in'
        }
    }
    try {
        await client.subredditMember.create({
            data: {
                userId,
                subredditId: formData.get('sid') as string
            }
        })
        revalidatePath('/')
        return {
            type: 'success',
            message: 'Joined succesfully'
        }
    } catch (e) {
        console.error(e)
        return {
            type: 'error',
            message: 'Something went wrong'
        }
    }
}

export async function leaveSubreddit(prevState: any, formData : FormData){
    const { userId } = auth()
    if(!userId){
        return {
            type: 'error',
            message: 'You need to log in'
        }
    }
    try {
        const sid = formData.get('sid') as string
        const subReddit = await client.subreddit.findFirst({
            where: {
                owner: userId
            }
        })
        if(subReddit?.id === sid) {
            return {
                type: "error",
                message: 'You are the owner, delete the subreddit manually'
            }
        }
        await client.subredditMember.delete({
            where: {
                memberId: {
                    subredditId: sid,
                    userId: userId
                }
            }
        })
        revalidatePath('/')
        return {
            type: 'success',
            message: 'Left succesfully'
        }
    } catch (e) {
        console.error(e)
        return {
            type: 'error',
            message: 'Something went wrong'
        }
    }
}

export async function createPost(prevState: any, formData: FormData) {
    const { userId } = auth();
    if(!userId){
        return {
            type: 'error',
            message: 'You need to login to continue'
        }
    }
    const sname = formData.get('sname') as string
    const sub = await client.subreddit.findFirst({
        where: {
            name: sname
        }
    })
    if(!sub){
        return {
            type: 'error',
            message: 'No such subreddit'
        }
    }
    const sid = sub.id
    const title = formData.get('title') as string
    const body = formData.get('body') as string
    const file = formData.get('image') as File
    try {
        const newPost = await client.post.create({
            data: {
                title,
                content: body,
                userId,
                subredditId: sid,
            }
        })
        if(file){
            const array = await file.arrayBuffer()
            const buffer = new Uint8Array(array);
            try{
                const extension = path.extname(file.name.toLowerCase())
                if(!ALLOWED_EXTENSIONS.includes(extension)){
                    return {
                        type: 'error',
                        message: 'Only image files supported'
                    }
                }
                await fs.writeFile(`./public/uploads/${file.name}`, buffer)
                const imageUrl = `/uploads/${file.name}`
                await client.post.update({
                    where: {
                        id: newPost.id
                    },
                    data: {
                        images: [imageUrl]
                    }
                })
                return {
                    type: 'succces',
                    message: 'Post added successfully'
                }
            } catch (e) {
                console.error(e)
                return {
                    type: 'error',
                    message: 'Error uploading file'
                }
            }
        }
        revalidatePath('/')
        return {
            type: 'success',
            message: 'Post added successfully'
        }
    } catch (e) {
        console.error(e)
        return {
            type: 'error',
            messag: 'Something went wrong'
        }
    }
}

export async function deletePost(pid) {
    const { userId } = auth()
    if(!userId) {
        return {
            type: 'error',
            message: 'You need to login to continue'
        }
    }
    const post = client.post.findFirst({
        where: {
            id: pid
        }
    })
    if(!post){
        return {
            type: 'error',
            message: 'No such post'
        }
    }
    if(post.userId !== userId) {
        return {
            type: 'error',
            message: 'Wrong user'
        }
    }
    try {
        await client.post.delete({
            where: {
                id: pid
            }
        })
        revalidatePath('/')
        return {
            type: 'success',
            message: 'Post deleted successfully'
        }
    } catch (e) {
        console.error(e)
        revalidatePath('/')
        return {
            type: 'error',
            message: 'Something went wrong'
        }
    }
}

export async function  upvotePost(prevState: any, formData: FormData){
    const { userId } = auth()
    if(!userId){
        return {
            type: 'error',
            message: 'You need to login to continue'
        }
    }
    const post_id = formData.get('pid') as string
    const post = await client.post.findFirst({
        where: {
            id: post_id
        }
    })
    if (!post){
        return {
            type: 'error',
            message: 'Post not found'
        }
    }
    try {
        try{
        await client.downvote.delete({
            where: {
                downVoteId: {
                    postId: post_id,
                    userId
                }
            }
        })
        } catch {}
        await client.upvote.create({
            data: {
                postId: post_id,
                userId
            }
        })
        revalidatePath('/')
        return {
            type: 'success',
            message: 'Upvoted successfully'
        }
    } catch (e) {
            console.error(e)
            return {
                type: 'error',
                message: 'Something went wrong'
            }
        }
}

export async function  downvotePost(prevState: any, formData: FormData){
    const { userId } = auth()
    if(!userId){
        return {
            type: 'error',
            message: 'You need to login to continue'
        }
    }
    const post_id = formData.get('pid') as string
    const post = await client.post.findFirst({
        where: {
            id: post_id
        }
    })
    if (!post){
        return {
            type: 'error',
            message: 'Post not found'
        }
    }
    try {
        try{
            await client.upvote.delete({
                where: {
                    upvoteId: {
                        postId: post_id,
                        userId
                    }
                }
            })
        } catch {}
        await client.downvote.create({
            data: {
                postId: post_id,
                userId
            }
        })
        revalidatePath('/')
        return {
            type: 'success',
            message: 'Upvoted successfully'
        }
    } catch (e) {
            console.error(e)
            return {
                type: 'error',
                message: 'Something went wrong'
            }
        }
}

export async function removeUpvote(prevState: any, formData: FormData){
    const { userId } = auth()
    if(!userId){
        return {
            type: 'error',
            message: 'You need to be logged in'
        }
    }
    const postId = formData.get('pid') as string
    try{
        await client.upvote.delete({
            where: {
                upvoteId: {
                    userId,
                    postId
                }
            }
        })
    } catch {}
    revalidatePath('/')
    return {
        type: 'success'
    }
}

export async function removeDownvote(prevState: any, formData: FormData) {
    const { userId } = auth()
    if(!userId){
        return {
            type: 'error',
            message: 'You need to be logged in'
        }
    }
    const postId = formData.get('pid') as string
    try{
        await client.downvote.delete({
            where: {
                downVoteId: {
                    userId,
                    postId
                }
            }
        })
    } catch {}
    revalidatePath('/')
    return {
        type: 'success'
    }
}
