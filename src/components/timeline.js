import { useRef } from "react"
import { getTimeline } from "../data/timeline"
import { TimeLeaf } from "./timeleaf"

const Timeline = () => {
    const timeline = getTimeline()
    const bottomEl = useRef()
    return (
        <section>
            <div className="bg-neutral-focus text-white py-8">
                <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
                    <div className="flex flex-col w-full sticky md:w-80  md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
                        <p className="ml-2 text-accent uppercase tracking-loose">Timeline</p>
                        <p className="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2">History of me</p>
                        <p className="text-sm md:text-base text-gray-50 mb-4">
                            Here’s a brief history of me & my professional development, the start is @ the <button onClick={() => bottomEl.current.scrollIntoView()}><span className='underline'>bottom</span></button>, as per usual.
                        </p>
                    </div>
                    <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
                        <div className="container mx-auto w-full h-full">
                            <div className="relative wrap overflow-hidden p-10 h-full">
                                <div className="border-2-2 bg-accent w-1 absolute h-full rounded-3xl"
                                    style={{ right: '50%' }}></div>
                                {timeline.map((t, i) => <div key={i}><TimeLeaf date={t.date} title={t.title} text={t.text} isRight={i % 2 !== timeline.length % 2} /></div>)}
                            </div>
                            <img ref={bottomEl} className="mx-auto -mt-20" src={require('../assets/launch.svg').default} alt="rocket man"></img>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { Timeline }