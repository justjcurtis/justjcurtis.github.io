import { motion as m } from "framer-motion"
import { CvLineItem } from "../cv/cvLineItem"
const CvExperience = ({ employer, role, dates, bullets }) => {
    return (
        <div className="mt-5">
            <CvLineItem leftText={employer} rightTexts={[role, dates]} />
            <m.ul initial={{ opacity: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + Math.random() * 0.3, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: 6, y: 10 }} className="text-md font-thin text-black text-left mt-5 list-disc">
                {bullets.map((bullet, i) => <li key={`${bullet}_${i}`}>{bullet}</li>)}
            </m.ul>
        </div>

    )
}

export { CvExperience }
