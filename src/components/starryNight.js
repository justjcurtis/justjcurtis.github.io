import { useCallback, useEffect, useRef, useState } from "react"
import { getRandomInt } from "../utils/helpers"

const TWINKLE_RATE = 0.0008

const StarryNight = ({ children }) => {
    const randomXY = () => {
        return { x: getRandomInt(window.innerWidth), y: getRandomInt(window.innerHeight * 2) }
    }
    const starCount = useRef(Math.floor((window.innerWidth * window.innerHeight) / 4000))
    const [stars, setStars] = useState(new Array(starCount.current).fill(0).map(() => ({ ...randomXY(), size: getRandomInt(2, 0.5), opacity: 1 })))
    const twinkling = useRef({})

    const draw = useCallback(() => {
        setStars((currentStars) => {
            if (!currentStars) return
            const nextStars = []
            for (let i = 0; i < starCount.current; i++) {
                const s = currentStars[i]
                if (twinkling.current[i] !== undefined) {
                    twinkling.current[i]--
                    if (twinkling.current[i] === 0) {
                        twinkling.current[i] = undefined
                        s.opacity = 1
                    }
                } else {
                    if (Math.random() >= TWINKLE_RATE) {
                        nextStars.push(s)
                        continue
                    }
                    twinkling.current[i] = getRandomInt(20, 40)
                    s.opacity = 0
                }
                nextStars.push(s)
            }
            return nextStars
        })
    }, [starCount])

    useEffect(() => {
        setTimeout(draw, 10)
    }, [stars, draw])
    return (
        <>
            <div className="bg-transparent text-white py-8 z-50 sticky top-0 mx-auto left-0 right-0 overflow-hidden">
                {stars && stars.map((s, i) => {
                    return (
                        <div key={i} id={`star-${i}`} style={
                            {
                                opacity: s.opacity,
                                top: `${s.y - 200 + (-window.scrollY * 0.1)}px`,
                                left: `${s.x}px`,
                                backgroundXolor: `white`,
                                width: `${s.size}px`,
                                height: `${s.size}px`,
                            }
                        } className={`starticle fixed bg-white transition-opacity duration-300`} />
                    )
                })}
                {children}
            </div>
        </>
    );
}

export { StarryNight }