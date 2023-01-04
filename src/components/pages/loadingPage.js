import { useRef, useState } from "react"
import { LOADING_MESSAGES } from "../../data/constants"
import { getRandomInt } from "../../utils/helpers"
import { motion as m } from 'framer-motion'

const LoadingPage = ({ done }) => {
    const loadingText = useRef(LOADING_MESSAGES[getRandomInt(LOADING_MESSAGES.length - 1)])
    const [progress, setProgress] = useState(0)

    const step = () => {
        if (progress >= 100) {
            setTimeout(() => done(true), 500)
            return
        }
        setProgress(progress + 1)
    }
    if (progress === 0) step()
    else setTimeout(step, 20)
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }} className="hero flex-1 bg-base-200 fixed top-0 h-screen w-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <div className="radial-progress text-primary bg-neutral-content font-bold" style={{ "--value": progress, "--size": "12rem", "--thickness": "2px" }}>{progress}%</div>
                    <h2 className="text-xl text-accent bg-neutral-focus px-4 py-3 mt-10 mx-5cg rounded-md">{loadingText.current}</h2>
                </div>
            </div>
        </m.div >
    )
}

export { LoadingPage }