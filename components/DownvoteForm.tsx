'use client'
import { useFormState, useFormStatus } from "react-dom"
import { downvotePost } from "@/lib/action"
import { BiDownvote } from "react-icons/bi";

function DownvoteButton(){
    const { pending } = useFormStatus()
    return <button aria-disabled={pending} className="p-2 text-orange-500"><BiDownvote size='24'/></button>
}

export default function DownvoteForm({ pid, downvotes } : { pid : string, downvotes: number }){
    const initialState = {
        type: null,
        message: null
    }
    const [state, dispatch] = useFormState(downvotePost, initialState)

    return (
        <form action={dispatch} className="flex text-orange-500 px-2 items-center">
            <input type="hidden" value={pid} name="pid"/>
            {downvotes} <DownvoteButton />
        </form>
    )
}
