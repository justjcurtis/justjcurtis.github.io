import { Timeline } from "../timeline"
import { motion as m } from "framer-motion"
import { getTimeleaves } from "../../data/timeleaves"
import { useImageUrls } from "../../hooks/useImageUrls"
import { useQuery } from "../../hooks/useQuery"

const AboutPage = () => {
    const images = useImageUrls()
    const [timeleaves] = useQuery('timeleaves', getTimeleaves)
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
            <Timeline images={images} timeleaves={timeleaves} />
        </m.div>
    )
}

export { AboutPage }