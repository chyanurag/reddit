export default function NewPost({ params } : {
    params: {
        subName: string
    }
}){
    return (
        <div>
            <h1>Create a new post for {params.subName}</h1>
        </div>
    )
}
