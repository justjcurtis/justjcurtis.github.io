import { Timeline } from "../timeline"
import { motion as m } from "framer-motion"
import { getTimeleaves } from "../../data/timeleaves"
import { useEffect, useRef, useState } from "react"

const AboutPage = ({ images }) => {
    const [timeleaves, setTimeleaves] = useState([])
    const hasData = useRef(false)

    const fetchTimeleaves = async () => {
        hasData.current = true
        const x = await getTimeleaves()
        setTimeleaves(x)
    }

    useEffect(() => {
        if (!hasData.current) fetchTimeleaves()
    })
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
            <Timeline images={images} timeleaves={timeleaves} />
        </m.div>
    )
}

export { AboutPage }