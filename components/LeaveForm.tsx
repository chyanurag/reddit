'use client'
import { useFormState, useFormStatus } from "react-dom"
import { leaveSubreddit } from "@/lib/action"

function LeaveButton(){
    const { pending } = useFormStatus()
    return <button aria-disabled={pending} className="bg-orange-500 p-2 text-white">Leave</button>
}

export default function LeaveForm({ sid } : { sid : string }){
    const initialState = {
        type: null,
        message: null
    }
    const [state, dispatch] = useFormState(leaveSubreddit, initialState)
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
            <LeaveButton />
        </form>
    )
}
