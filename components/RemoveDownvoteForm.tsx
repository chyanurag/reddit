'use client'
import { useFormState, useFormStatus } from "react-dom"
import { removeDownvote } from "@/lib/action"
import { BiSolidDownvote } from "react-icons/bi";

function DownvoteButton(){
    const { pending } = useFormStatus()
    return <button aria-disabled={pending} className="bg-orange-500 p-2 text-white"><BiSolidDownvote size='24'/></button>
}

export default function DownvoteForm({ pid, downvotes } : { pid : string, downvotes: number }){
    const initialState = {
        type: null,
        message: null
    }
    const [state, dispatch] = useFormState(removeDownvote, initialState)

    return (
        <form action={dispatch} className="flex items-center bg-orange-500 text-white px-2">
            <input type="hidden" value={pid} name="pid"/>
            {downvotes} <DownvoteButton />
        </form>
    )
}
