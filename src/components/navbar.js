import { Link, useLocation } from "react-router-dom"
const iconImagePath = require('../assets/favicon.png')

const styles = {
    icon: {
        height: '80%',
        marginRight: 10
    }
}


const Navbar = () => {
    const location = useLocation().pathname
    const links = [
        { title: 'Home', to: '/' },
        { title: 'Projects', to: '/projects' },
        { title: 'About', to: '/about' },
    ]
    const ListItemLink = (title, to, location, mx = 0) => <li key={title} className={`rounded-md mx-${mx} ${location === to ? 'bg-secondary text-neutral-focus' : ''}`}><Link className="text-center inline" to={to}>{title}</Link></li>
    return (
        <div onClick={() => console.log('clicked')} className="navbar fixed z-[100] bg-base-100">
            <div className="navbar-start">
                <div className="invisible w-0 md:w-full md:visible">
                    <ul className="menu menu-horizontal px-1">
                        {links.map(({ title, to }) => ListItemLink(title, to, location, 1))}
                    </ul>
                </div>
                <div className="visible w-full dropdown md:w-0 md:invisible ">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {links.map(({ title, to }) => ListItemLink(title, to, location))}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link className="btn btn-ghost normal-case text-xl" to="/"><img style={styles.icon} src={iconImagePath} alt="icon" />JustJCurtis</Link>
            </div>
            <div className="navbar-end">
                <a href="https://github.com/justjcurtis" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 feather feather-github" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://www.linkedin.com/in/justjcurtis" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 feather feather-github" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
            </div>
        </div>
    )
}

export { Navbar }