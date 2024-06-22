'use client'
import client from "@/lib/prisma"
import { notFound } from "next/navigation"
import { useFormStatus, useFormState } from 'react-dom'
import { createPost } from '@/lib/action'

const initialState = {
    type: null,
    message: null
}

function CreateButton() {
    const { pending } = useFormStatus()
    return <button className='p-2 text-md bg-orange-500 my-5 text-white' type="submit" aria-disabled={pending}>Create Post</button>
}
export default function NewPost({ params } : {
    params: {
        subName: string
    }
}){
    const [state, dispatch] = useFormState(createPost, initialState)
    return (
        <div>
            <h1 className="text-2xl font-medium my-5 text-center shadow-orange-500">Add a new post</h1>
            <form action={dispatch} className="flex flex-col p-10 shadow-lg w-1/4 mx-auto my-10">
                <h3 className={state?.type === "error" ? "text-red-500" : "text-green-500"}>{state?.message}</h3>
                <input type="hidden" value={params.subName} name="sname"/>
                <label htmlFor="title" className="my-5">Title</label>
                <input type="text" name="title" id="title" placeholder="Enter title" className="p-5 text-lg border-2"/>
                <label htmlFor="title" className="my-5">Body</label>
                <textarea rows="10" cols="10" name="body" id="body" placeholder="Enter body" className="p-5 text-lg border-2"/>
                Add images <input multiple type="file" name="image" className="border-2"/>
                <CreateButton />
            </form>
        </div>
    )
}
