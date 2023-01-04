import { useEffect, useRef, useState } from "react"
import { LOADING_MESSAGES } from "../../data/constants"
import { getRandomInt } from "../../utils/helpers"
import { motion as m } from 'framer-motion'

const stepCount = 3

const LoadingPage = ({ pagename, done }) => {
    const getStepText = () => {
        const st = []
        while (st.length < stepCount) {
            const v = getRandomInt(LOADING_MESSAGES.length - 1)
            if (st.includes(v)) continue
            st.push(v)
        }
        return st.map(v => LOADING_MESSAGES[v])
    }
    const steps = useRef(getStepText())
    const rowHeight = 24
    setTimeout(() => done(true), 7000)
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }} className="hero flex-1 bg-base-200 fixed top-0 h-screen w-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="animate-pulse text-5xl font-bold">Loading ⏳</h1>
                    {steps.current.map((s, i) =>
                        <m.h3 key={i} animate={{ color: ['#ccc', '#1fb2a6', '#1fb2a6', '#1fb2a6', '#ccc'], scale: [0, 1.05, 1, 1, 0.9], opacity: [0, 1, 1, 1, 0.6], y: [-(50 + (i * rowHeight)), -(i * rowHeight) + 10, -(i * rowHeight) + 10, -(i * rowHeight) + 10, 50 - (i * rowHeight) + ((stepCount - i) * (rowHeight * 3))] }} transition={{ delay: (0.3 + (10 / 6) * i), duration: (10 / 6) * 1 }}>{s}</m.h3>
                    )}
                    <m.h2 className='text-primary bg-neutral-content w-20 rounded text-xl font-bold mx-auto' animate={{ scale: [0, 1], opacity: [0, 1], y: [-30, -30] }} transition={{ delay: 5.5, duration: 0.3 }}>Done</m.h2>
                </div>
            </div>
        </m.div >
    )
}

export { LoadingPage }