'use client'
import { createSubreddit } from '@/lib/action'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
    type: null,
    message: null
}

function CreateButton() {
    const { pending } = useFormStatus()
    return <button className='p-2 text-md bg-orange-500 my-5 text-white' type="submit" aria-disabled={pending}>Create Subreddit</button>
}

export default function NewSubreddit() {
    const [state, formAction] = useFormState(createSubreddit, initialState)

    return (
        <form action={formAction} className="flex flex-col shadow-lg p-5 w-1/4 mx-auto text-center">
            <h1 className="text-2xl my-5 p-2 text-orange-500">Create a new subreddit</h1>
            <input className="text-xl my-5 p-2 border-2" type="text" placeholder="Think something cool" name="sname"/>
            <h3 className={state?.type === "error" ? "text-red-500" : "text-green-500"}>{state?.message}</h3>
            <CreateButton />
        </form>
    )
}
