import { Link } from 'react-router-dom'
const backgroundImagePath = require('../../assets/background.jpg')
const avatarImagePath = require('../../assets/portrait_alt.jpg')

const styles = {
    hero: {
        flex: 1,
        backgroundImage: `url(${backgroundImagePath})`,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: 150,
        minWidth: 150,
        maxHeight: 150,
        maxWidth: 150,
        overflowy: 'hidden'
    },
    topContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    avatarImage: {
        minHeight: 150,
        minWidth: 150,
        maxHeight: 150,
        maxWidth: 150,
    },
    subtext: {
        width: '100%',
    }
}

const HomePage = () => {
    return (
        <div style={styles.hero} className="hero">
            <div className="hero-overlay bg-opacity-70 backdrop-blur-sm"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hi 👋🏼</h1>
                    <div style={styles.topContainer}>
                        <p style={styles.subtext} className="text-left mb-5">Welcome to my personal site, <Link to={'/projects'}><span className='underline'>here</span></Link> you can find, things I've made in my own time & links to my other places on the internet.</p>
                        <div style={styles.imageContainer}><img style={styles.avatarImage} className="ml-5 mb-5 mask mask-hexagon-2" src={avatarImagePath} alt="just j curtis" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { HomePage }