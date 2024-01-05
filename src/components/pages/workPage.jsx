import { getWorkCards } from '../../data/workCards'
import { WorkCard } from '../workCard'
import { useQuery } from '../../hooks/useQuery'

const WorkPage = () => {
    const [workCards] = useQuery('workCards', getWorkCards)
    return (
        <div className='min-h-full w-full py-16'>
            <div className="bg-red-800 bg-red-600 md:row-span-2 md:col-span-2" />
            <div className='max-w-7xl mx-auto' >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 m-4 lg:gap-3">
                    {workCards && workCards.map((card, index) => (
                        <WorkCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export { WorkPage }
