'use client'
import { useFormState, useFormStatus } from "react-dom"
import { removeUpvote } from "@/lib/action"
import { BiSolidUpvote } from 'react-icons/bi'

function UpvoteButton(){
    const { pending } = useFormStatus()
    return <button aria-disabled={pending} className="p-2 bg-orange-500 text-white"><BiSolidUpvote size='24'/></button>
}

export default function UpvoteForm({ pid, upvotes } : { pid : string, upvotes: number }){
    const initialState = {
        type: null,
        message: null
    }
    const [state, dispatch] = useFormState(removeUpvote, initialState)

    return (
        <form action={dispatch} className="flex items-center bg-orange-500 text-white px-2">
            <input type="hidden" value={pid} name="pid"/>
            {upvotes} <UpvoteButton />
        </form>
    )
}
