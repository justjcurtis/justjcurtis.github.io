import { useEffect, useRef, useState } from "react"
import { debounce } from "../utils/helpers"
import { ProjectCard } from "./projectCard"

const styles = {
    container: {
        flex: 1,
        padding: 15,
    }
}

const GridLayout = ({ projects = [] }) => {
    const [filter, setFilter] = useState('')
    const [filteredProjects, setFilteredProjects] = useState([])

    const filterInputRef = useRef()
    const clearbuttonRef = useRef()

    useEffect(() => {
        const getFilteredProjects = (filter) => filter.length < 3 ? projects : projects.filter(p => [p.title, p.description, p.long ? p.long : '', p.tags ? p.tags.join(' ') : ''].join(' ').toLowerCase().includes(filter))
        setFilteredProjects(getFilteredProjects(filter.toLowerCase()))
        clearbuttonRef.current.style.opacity = +(filter.length > 0)

    }, [filter, projects])

    const handleClearClicked = () => {
        filterInputRef.current.value = ''
        clearbuttonRef.current.style.opacity = 0
        setFilter('')
    }

    const [showSearch, setShowSearch] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    let checkpoint = useRef(0);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            if (showSearch) {
                setShowSearch(false);
                checkpoint.current = lastScrollY;
            }
        } else {
            setShowSearch(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    const searchStyle = {
        top: showSearch ? 64 : Math.max(64 - (window.scrollY - checkpoint.current), -20),
        transition: showSearch ? 'top 0.5s' : 'none',
    };

    return (
        <div style={styles.container} className="bg-neutral-focus mt-[49px]">
            <div style={searchStyle} className="form-control bg-neutral-focus p-4 fixed z-[90] w-screen -ml-4 bg-opacity-60 backdrop-blur-md">
                <input ref={filterInputRef} onKeyUp={debounce((e) => setFilter(e.target.value))} type="text" placeholder="Search projects" className="input input-bordered w-full" />
                <button ref={clearbuttonRef} onClick={handleClearClicked} type="button" className="bg-base-300 text-neutral-content absolute top-6 right-5 p-[11.2px] font-bold rounded-full text-sm text-center inline-flex items-center mr-2 w-8 h-8 transition-opacity opacity-0 duration-300">X</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[80px]">
                {filteredProjects.map((p, i) => <div key={i}>
                    <ProjectCard
                        title={p.title}
                        description={p.description}
                        long={p.longDescription}
                        link={p.link}
                        imgpath={p.image.url}
                        status={p.statuTag}
                        tags={p.tags.map(t => t.title)}
                    />
                </div>
                )}
            </div>
        </div>
    )
}

export { GridLayout }
