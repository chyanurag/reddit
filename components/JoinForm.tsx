'use client'
import { useFormState, useFormStatus } from "react-dom"
import { joinSubreddit } from "@/lib/action"

function JoinButton(){
    const { pending } = useFormStatus()
    return <button aria-disabled={pending} className="bg-orange-500 p-2 text-white">Join</button>
}

export default function JoinForm({ sid } : { sid : string }){
    const initialState = {
        type: null,
        message: null
    }
    const [state, dispatch] = useFormState(joinSubreddit, initialState)
    if(state.message){
        switch(state.type){
            case 'error':
                alert(`Error : ${state.message}`)
                break;
            case 'success':
                alert(`Success : ${state.message}`)
        }
    }

    return (
        <form action={dispatch}>
            <input type="hidden" value={sid} name="sid"/>
            <JoinButton />
        </form>
    )
}
