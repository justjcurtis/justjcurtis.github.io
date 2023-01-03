import { Timeline } from "../timeline"
import { motion as m } from "framer-motion"
const AboutPage = () => {
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
            <Timeline />
        </m.div>
    )
}

export { AboutPage }