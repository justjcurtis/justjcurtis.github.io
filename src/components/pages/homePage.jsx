import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { allGames } from '../games'
import { motion as m } from "framer-motion"
import { useImageUrls } from '../../hooks/useImageUrls'
import { getRandomForToday, selectFromArrWithFloat } from '../../utils/helpers'

const styles = {
    topContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    avatarImage: {
        height: 150,
        width: 150,
        marginLeft: 10,
    },
    subtext: {
        width: '100%',
    },
}

const HomePage = () => {
    const images = useImageUrls()
    const [showInfo, setShowInfo] = useState(true)
    const lastTaps = useRef([])
    const todaysGame = selectFromArrWithFloat(allGames, getRandomForToday())
    const tomorrowGame = selectFromArrWithFloat(allGames, getRandomForToday(1))

    useEffect(() => {
        const TRIPLE_PRESS_DELAY = 700
        const handleTap = () => {
            lastTaps.current.push(Date.now())
            const timeout = setTimeout(() => {
                lastTaps.current = []
            }, TRIPLE_PRESS_DELAY)

            if (lastTaps.current.length >= 3) {
                clearTimeout(timeout)
                lastTaps.current = []
                setShowInfo(prev => !prev)
            }
        }
        window.addEventListener('click', handleTap)
        return () => window.removeEventListener('click', handleTap)
    }, [])

    const getTransitionStyle = (isVisible) => ({
        visibility: isVisible ? 'visible' : 'hidden',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.4s ease-in-out'
    })

    const getMotionProps = (delay, x = 0, y = 0, exitX = x, exitY = y) => ({
        initial: { opacity: 0, x, y },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: {
            delay,
            duration: 0.1 + (0.3 * Math.random()),
            ease: 'easeInOut'
        },
        exit: { opacity: 0, x: exitX, y: exitY }
    })

    return (
        <m.div
            {...getMotionProps(0)}
            style={{
                top: 0,
                height: '100svh',
                overflow: 'hidden',
                backgroundImage: `url(${images.HomeBackground})`
            }}
            className="select-none hero flex-1 fixed"
        >
            <div style={getTransitionStyle(!showInfo)} className="hero-overlay bg-opacity-60 backdrop-blur-sm" />
            {todaysGame && <todaysGame.game />}
            <div style={getTransitionStyle(showInfo)} className="hero-overlay bg-opacity-60 backdrop-blur-sm" />
            <div style={getTransitionStyle(showInfo)} className="hero-content text-center text-neutral-content mt-[100px]">
                <div className="max-w-md">
                    <m.h1 {...getMotionProps(0.4, -2, -10, 2, -10)} className="mb-5 text-5xl font-bold">
                        <span className='text-primary bg-primary-content rounded-md px-1'>Hi 👋🏼</span>
                    </m.h1>
                    <div style={styles.topContainer}>
                        <m.p {...getMotionProps(0.25, -10, 2)} style={styles.subtext} className="text-sm text-left mb-5">
                            Welcome to my personal site. Here you can find <Link to={'/projects'}><span className='text-secondary underline bg-neutral rounded px-1'>things I've made</span></Link>.
                            There are links to my other places on the internet in the top right. You can see some info <Link to={'/about'}>
                                <span className='text-secondary bg-neutral underline rounded px-1'>about me</span></Link> too.
                            <br /><br />Triple tap anywhere to toggle this page & focus on {todaysGame.name}.
                        </m.p>
                        <m.img
                            {...getMotionProps(0.2, 10, 6, 6, 10)}
                            style={styles.avatarImage}
                            className="mask mask-circle border-4 border-neutral-content rounded-full"
                            src={images.Avatar}
                            alt="just j curtis"
                        />
                    </div>
                    <m.div {...getMotionProps(0.3, -6, 25, -3, 15)} className="stats shadow bg-opacity-60 backdrop-blur-sm">
                        <div className="stat">
                            <div className="stat-title">Current Focus</div>
                            <div className="stat-value text-accent underline">
                                <a href='https://rippl.work/features/' target="_blank" rel="noreferrer">Rippl App</a>
                            </div>
                            <div className="stat-desc mt-3">Thanks for stopping by   🌈</div>
                        </div>
                    </m.div>
                    {tomorrowGame.name !== todaysGame.name && (
                        <m.p {...getMotionProps(0.25, 10, 2)} style={styles.subtext} className="text-center mt-5">
                            Check back here tomorrow for <span className='text-accent'>{tomorrowGame.name}</span>
                        </m.p>
                    )}
                </div>
            </div>
        </m.div>
    )
}

export { HomePage }
