export default function Profile({ params } : {
    params: {
        username: string
    }
}) {
    return (
        <div>
            <h1>Viewing profile of {params.username}</h1>
        </div>
    )
}
