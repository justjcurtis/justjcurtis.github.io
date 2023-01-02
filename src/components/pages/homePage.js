import { Link } from 'react-router-dom'
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
        <div style={styles.hero} className="hero">
            <div className="hero-overlay bg-opacity-70 backdrop-blur-sm"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold"><span className='text-primary bg-primary-content rounded-md px-1'>Hi 👋🏼</span></h1>
                    <div style={styles.topContainer}>
                        <p style={styles.subtext} className="text-left mb-5">Welcome to my personal site. You can find, <Link to={'/projects'}><span className='text-secondary underline'>things I've made</span></Link>. There are links to my other places on the internet in the top right. You can also see some info <Link to={'/about'}><span className='text-secondary underline'>about me</span></Link> too.</p>
                        <img style={styles.avatarImage} className="mask mask-circle" src={avatarImagePath} alt="just j curtis" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { HomePage }