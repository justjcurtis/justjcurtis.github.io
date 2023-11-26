import { getRandomInt } from '../utils/helpers'
import { useState, useEffect } from 'react'

const Floor = () => {
    const grassChance = 0.2
    const wiggleRate = 0.5
    const grassAngle = 10
    const [grass, setGrass] = useState([])
    useEffect(() => {
        const grassTemp = []
        const maxDimension = Math.max(window.screen.width, window.screen.height)
        for (let x = 0; x <= maxDimension; x += 1) {
            if (Math.random() < grassChance) {
                grassTemp.push({
                    x,
                    h: getRandomInt(12, 3),
                    d: getRandomInt(grassAngle, -grassAngle),
                })
            }
        }
        setGrass(grassTemp)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setGrass(grass.map(g => (Math.random() < wiggleRate ? g : { ...g, d: getRandomInt(grassAngle, -grassAngle) })))
        }, 1000)
        return () => clearInterval(interval)
    }, [grass])

    return (
        <>
            {grass.map((g, i) => {
                if (g.x > window.innerWidth) return null
                return (
                    <div
                        key={i}
                        style={{
                            left: g.x,
                            height: g.h,
                            transformOrigin: 'bottom',
                            rotate: `${g.d}deg`,
                            transition: `rotate ${getRandomInt(2, 1) / 2}s ease-in-out`,
                        }}
                        className={`w-0.5 absolute bottom-[80px] md:bottom-[128px] bg-accent`}
                    />
                )
            })}
            <div className="w-full absolute bottom-[75px] h-[6px] md:bottom-[120px] left-0 md:h-[8px] bg-accent"></div>
            <div className="w-full absolute bottom-[50px] h-[25px] md:bottom-[80px] left-0 md:h-[40px] bg-[#88674E]"></div>
            <div className="w-full absolute bottom-[25px] h-[25px] md:bottom-[40px] left-0 md:h-[40px] bg-[#664121]"></div>
            <div className="w-full absolute h-[25px] bottom-[0px] left-0 md:h-[40px] bg-[#542D1C]"></div>
        </>
    )
}

export { Floor }
