'use client'
import { useFormState, useFormStatus } from "react-dom"
import { upvotePost } from "@/lib/action"
import { BiUpvote } from 'react-icons/bi'

function UpvoteButton(){
    const { pending } = useFormStatus()
    return <button aria-disabled={pending} className="p-2 text-orange-500"><BiUpvote size='24'/></button>
}

export default function UpvoteForm({ pid, upvotes } : { pid : string, upvotes: number }){
    const initialState = {
        type: null,
        message: null
    }
    const [state, dispatch] = useFormState(upvotePost, initialState)

    return (
        <form action={dispatch} className="flex text-orange-500 px-2 items-center">
            <input type="hidden" value={pid} name="pid"/>
            {upvotes} <UpvoteButton />
        </form>
    )
}
