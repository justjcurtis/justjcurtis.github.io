import { Link } from 'react-router-dom'
import { motion as m } from "framer-motion"
const backgroundImagePath = require('../../assets/background.jpg')
const avatarImagePath = require('../../assets/portrait_alt.jpg')

const styles = {
    hero: {
        flex: 1,
        backgroundImage: `url(${backgroundImagePath})`,
    },
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
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }} style={styles.hero} className="hero">
            <div className="hero-overlay bg-opacity-70 backdrop-blur-sm"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <m.h1 initial={{ opacity: 0, x: -2, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.4, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: 2, y: -10 }} className="mb-5 text-5xl font-bold"><span className='text-primary bg-primary-content rounded-md px-1'>Hi 👋🏼</span></m.h1>
                    <div style={styles.topContainer}>
                        <m.p initial={{ opacity: 0, x: -10, y: 2 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.25, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: -10, y: 2 }} style={styles.subtext} className="text-left mb-5">Welcome to my personal site. Here you can find <Link to={'/projects'}><span className='text-accent bg-primary-content rounded px-1'>things I've made</span></Link>. There are links to my other places on the internet in the top right. You can also see some info <Link to={'/about'}><span className='text-accent bg-primary-content rounded px-1'>about me</span></Link> too.</m.p>
                        <m.img initial={{ opacity: 0, x: +10, y: 6 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.2, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }} exit={{ opacity: 0, x: 6, y: 10 }} style={styles.avatarImage} className="mask mask-circle" src={avatarImagePath} alt="just j curtis" />
                    </div>
                </div>
            </div>
        </m.div>
    )
}

export { HomePage }