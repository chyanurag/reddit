import Link from 'next/link'

export default function NotFound(){
    return (
        <div className='text-center'>
            <h1 className='text-2xl my-10'>The page you are looking for doesn't exists</h1>
            <Link href='/' className='p-5 bg-orange-500 text-xl text-white'>Go Home</Link>
        </div>
    )
}
