import { Link, useLocation } from "react-router-dom"

const styles = {
    icon: {
        height: '80%',
        marginRight: 10
    }
}

const Navbar = ({ images }) => {
    const location = useLocation().pathname
    const links = [
        { title: 'Home', to: '/' },
        { title: 'Work', to: '/work' },
        { title: 'Projects', to: '/projects' },
        { title: 'About', to: '/about' },
    ]

    const loseActiveFocus = () => {
        const elem = document.activeElement;
        if (elem) elem?.blur();

    };

    const ListItemLink = (title, to, location, mx = 0) => {
        const activeClasses = location === to ? 'bg-secondary text-neutral-focus' : ''
        return (
            <li key={title} onClick={loseActiveFocus} className={`rounded-md mx-${mx} ${activeClasses}`}><Link className="text-center inline" to={to}>{title}</Link></li>
        )
    }

    return (
        <div className="navbar fixed z-[100] bg-base-100">
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
                <Link className="btn btn-ghost normal-case text-xl" to="/"><img style={styles.icon} src={images.IconCircle} alt="icon" />JustJCurtis</Link>
            </div>
            <div className="navbar-end">
                <Link to="/cv" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M3 24h19v-23h-1v22h-18v1zm17-24h-18v22h18v-22zm-1 1h-16v20h16v-20zm-2 16h-12v1h12v-1zm0-3h-12v1h12v-1zm0-3h-12v1h12v-1zm-7.348-3.863l.948.3c-.145.529-.387.922-.725 1.178-.338.257-.767.385-1.287.385-.643 0-1.171-.22-1.585-.659-.414-.439-.621-1.04-.621-1.802 0-.806.208-1.432.624-1.878.416-.446.963-.669 1.642-.669.592 0 1.073.175 1.443.525.221.207.386.505.496.892l-.968.231c-.057-.251-.177-.449-.358-.594-.182-.146-.403-.218-.663-.218-.359 0-.65.129-.874.386-.223.258-.335.675-.335 1.252 0 .613.11 1.049.331 1.308.22.26.506.39.858.39.26 0 .484-.082.671-.248.187-.165.322-.425.403-.779zm3.023 1.78l-1.731-4.842h1.06l1.226 3.584 1.186-3.584h1.037l-1.734 4.842h-1.044z" fill="#a6adbb" /></svg>
                </Link>
                <a href="https://github.com/justjcurtis" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://www.linkedin.com/in/justjcurtis" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
            </div>
        </div>
    )
}

export { Navbar }
