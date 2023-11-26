import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Pong } from '../pong'
import { motion as m } from "framer-motion"
import { useImageUrls } from '../../hooks/useImageUrls'

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
    }
}

const HomePage = () => {
    const images = useImageUrls()
    const [showInfo, setShowInfo] = useState(true)

    let lastTap = useRef(0);

    useEffect(() => {
        const handleTap = () => {
            const now = Date.now();
            const DOUBLE_PRESS_DELAY = 300;
            if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
                console.log(!showInfo)
                setShowInfo(!showInfo)
            } else {
                lastTap.current = now;
            }
        }
        window.addEventListener('click', handleTap);
        return () => {
            window.removeEventListener('click', handleTap);
        };
    }, [showInfo, setShowInfo]);

    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }} style={{ top: 0, height: '100svh', overflow: 'hidden', backgroundImage: `url(${images.HomeBackground})` }} className="hero flex-1 fixed">
            <Pong />
            <div className="hero-overlay bg-opacity-60 backdrop-blur-sm"></div>
            {showInfo && <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <m.h1 initial={{ opacity: 0, x: -2, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.4, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: 2, y: -10 }} className="mb-5 text-5xl font-bold"><span className='text-primary bg-primary-content rounded-md px-1'>Hi 👋🏼</span></m.h1>
                    <div style={styles.topContainer}>
                        <m.p initial={{ opacity: 0, x: -10, y: 2 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.25, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: -10, y: 2 }} style={styles.subtext} className="text-left mb-5">Welcome to my personal site. Here you can find <Link to={'/projects'}><span className='text-secondary underline bg-neutral rounded px-1'>things I've made</span></Link>. There are links to my other places on the internet in the top right. You can see some info <Link to={'/about'}><span className='text-secondary bg-neutral underline rounded px-1'>about me</span></Link> too. <br /><br />If you just want to play pong, double tap anywhere on the screen. Double tap again to bring this page back.</m.p>
                        <m.img initial={{ opacity: 0, x: +10, y: 6 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.2, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: 6, y: 10 }} style={styles.avatarImage} className="mask mask-circle border-4 border-neutral-content rounded-full" src={images.Avatar} alt="just j curtis" />
                    </div>
                    <m.div initial={{ opacity: 0, x: -6, y: 25 }} animate={{ opacity: 1, x: 0, y: 10 }} transition={{ delay: 0.3, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: -3, y: 15 }} className="stats shadow bg-opacity-60 backdrop-blur-sm">
                        <div className="stat">
                            <div className="stat-title">Current Focus</div>
                            <div className="stat-value text-accent underline"><a href='https://www.zopa.com/help/article/how-to-download-zopa-app' target="_blank" rel="noreferrer">Zopa App</a></div>
                            <div className="stat-desc mt-3">Thanks for stopping by   🌈</div>
                        </div>

                    </m.div>
                </div>
            </div>}
        </m.div >
    )
}

export { HomePage }
