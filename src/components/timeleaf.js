import { motion as m } from 'framer-motion'
import { useRef } from 'react'

const TimeLeaf = ({ date, title, text, isRight = false }) => {
    const gradientClassName = isRight ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
    const textSideClassName = isRight ? 'text-left' : 'text-right'
    const markerStyle = { marginLeft: isRight ? '50%' : '-70%', marginRight: isRight ? '-70%' : '50%' }
    const xPre = isRight ? -20 : 20
    const trandom = useRef(Math.random())
    const markerDelayRandom = useRef(0.5 + (0.2 * Math.random()))
    return (
        <m.div initial={{ opacity: 0, x: xPre }} animate={{ opacity: 1, x: 0 }} transition={{ delay: markerDelayRandom.current, duration: (0.1 + (0.3 * trandom.current)), ease: 'easeInOut' }} exit={{ opacity: 0, x: xPre }} className={`mb-8 flex justify-between items-center w-full ${isRight ? 'left-timeline' : 'flex-row-reverse right-timeline'}`}>
            <div style={markerStyle} className={`w-full h-1 ${gradientClassName} from-accent via-transparent to-transparent z-0`} />
            <div className="order-1 w-5/12"></div>
            <m.div initial={{ opacity: 0, x: xPre }} animate={{ opacity: 1, x: 0 }} transition={{ delay: markerDelayRandom.current + 0.1 + (Math.random() * 0.2), duration: (0.1 + (0.3 * trandom.current)), ease: 'easeInOut' }} exit={{ opacity: 0, x: xPre }} className={`order-1  w-5/12 px-1 py-4 z-20 ${textSideClassName}`}>
                <p className={`mb-3 text-base text-accent ${textSideClassName}`}>{date}</p>
                <h4 className={`mb-3 font-bold  text-lg md:text-2xl text-primary bg-primary-content rounded-md px-1 ${textSideClassName}`}>{title}</h4>
                <p className={`text-sm md:text-base leading-snug text-gray-50 text-opacity-100 ${textSideClassName}`}>
                    {text}
                </p>
            </m.div>
        </m.div>
    )
}

export { TimeLeaf }
