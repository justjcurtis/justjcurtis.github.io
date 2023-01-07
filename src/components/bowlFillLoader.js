import { motion as m } from 'framer-motion'

export const BowlFillLoader = ({ seconds }) => {
    return (
        <div className="bg-neutral-content overflow-hidden w-48 h-48 relative mask mask-circle">
            <m.div initial={{ color: `rgb(17, 19, 24)` }} animate={{ color: 'rgb(100, 26, 230)' }} transition={{ delay: seconds + .25, duration: 0.25 }} className="py-7 pr-2 text-9xl absolute left-0 top-0 w-full h-full">J</m.div>
            <m.div initial={{ y: 0, rotate: 0 }} animate={{ y: '-50%', rotate: 90 * Math.floor(seconds) }} transition={{ duration: seconds, ease: 'easeInOut' }} className="w-[200%] h-[200%] absolute bg-neutral-focus top-[-100%] rounded-[40%] left-[-50%]" />
            <div className="absolute left-0 top-0 w-full h-full border-4 border-neutral-content rounded-[100%]" />
        </div>
    )
}