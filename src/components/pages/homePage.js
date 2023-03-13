import { Link } from 'react-router-dom'
import { motion as m } from "framer-motion"
import { useImageUrls } from '../../hooks/useImageUrls'
import { useCounters } from '../../hooks/useCounters'
import { useEffect, useState } from 'react'

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
    const { counters, getCount } = useCounters()
    const [views, setViews] = useState('...')
    useEffect(() => {
        getCount(counters.monthlyViews).then(value => {
            setViews(value)
        })
    })
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }} style={{ backgroundImage: `url(${images.HomeBackground})` }} className="hero flex-1">
            <div className="hero-overlay bg-opacity-70 backdrop-blur-sm"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <m.h1 initial={{ opacity: 0, x: -2, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.4, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: 2, y: -10 }} className="mb-5 text-5xl font-bold"><span className='text-primary bg-primary-content rounded-md px-1'>Hi 👋🏼</span></m.h1>
                    <div style={styles.topContainer}>
                        <m.p initial={{ opacity: 0, x: -10, y: 2 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.25, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: -10, y: 2 }} style={styles.subtext} className="text-left mb-5">Welcome to my personal site. Here you can find <Link to={'/projects'}><span className='text-accent bg-primary-content rounded px-1'>things I've made</span></Link>. There are links to my other places on the internet in the top right. You can see some info <Link to={'/about'}><span className='text-accent bg-primary-content rounded px-1'>about me</span></Link> too.</m.p>
                        <m.img initial={{ opacity: 0, x: +10, y: 6 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.2, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: 6, y: 10 }} style={styles.avatarImage} className="mask mask-circle border-4 border-neutral-content rounded-full" src={images.Avatar} alt="just j curtis" />
                    </div>
                    <m.div initial={{ opacity: 0, x: -3, y: 15 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.3, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: -3, y: 15 }} className="stats shadow bg-opacity-60 backdrop-blur-sm">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div className="stat-title">Views This Month</div>
                            <div className="stat-value text-secondary">{views}</div>
                            <div className="stat-desc">Thanks for stopping by   🌈</div>
                        </div>

                    </m.div>
                </div>
            </div>
        </m.div >
    )
}

export { HomePage }