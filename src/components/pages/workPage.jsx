import { useImageUrls } from '../../hooks/useImageUrls'
const WorkPage = () => {
    // const images = useImageUrls()
    return (
        <div className='absolute top-0 h-full w-full pt-16'>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 m-4">
                <div className='bg-red-500 md:col-span-2' >
                    <h1 className='text-4xl'>Work</h1>
                </div>
                <div className='bg-blue-500' >
                    <h1 className='text-4xl'>Work</h1>
                </div>
                <div className='bg-green-500 md:row-span-2' >
                    <h1 className='text-4xl'>Work</h1>
                </div>
                <div className='bg-purple-500' >
                    <h1 className='text-4xl'>Work</h1>
                </div>
                <div className='bg-gray-500 md:col-span-2' >
                    <h1 className='text-4xl'>Work</h1>
                </div>
            </div>
        </div>
    )
}

export { WorkPage }
