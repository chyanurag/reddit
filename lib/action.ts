'use server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import client from './prisma'
import { format } from 'path'


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
