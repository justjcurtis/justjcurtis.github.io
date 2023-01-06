import { useCallback, useEffect, useRef, useState } from "react"
import { LOADING_MESSAGES } from "../../data/constants"
import { getRandomInt } from "../../utils/helpers"
import { motion as m } from 'framer-motion'
import { LoadingBG } from "../loadingBG"

const LoadingPage = ({ done }) => {
    const loadingText = useRef(LOADING_MESSAGES[getRandomInt(LOADING_MESSAGES.length - 1)])
    const [progress, setProgress] = useState(0)

    const step = useCallback(() => {
        if (progress >= 100) {
            setTimeout(() => done(true), 300)
            return
        }
        setProgress(p => p + 1)
    }, [progress, done])

    useEffect(() => {
        setTimeout(step, 10)
    }, [progress, step])

    return (
        <>
            <LoadingBG />
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }} className="hero flex-1 bg-transparent fixed top-0 h-screen w-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <div className="radial-progress text-primary bg-white bg-opacity-70 font-bold" style={{ "--value": progress, "--size": "12rem", "--thickness": "2px" }}>{progress}%</div>
                        <h2 className="text-xl text-accent bg-neutral-focus bg-opacity-60 p-4 mt-10 mx-5cg rounded-md">{loadingText.current}</h2>
                    </div>
                </div>
            </m.div >
        </>
    )
}

export { LoadingPage }