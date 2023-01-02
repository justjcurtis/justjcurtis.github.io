import { useRef, useState } from "react"
import { debounce } from "../utils/helpers"
import { getProjects } from "../data/projects"
import { ProjectCard } from "./projectCard"

const styles = {
    container: {
        flex: 1,
        padding: 15,
    }
}

const GridLayout = () => {
    const projects = getProjects()
    const getFilteredProjects = (filter) => filter.length < 3 ? projects : projects.filter(p => [p.title, p.description, p.long ? p.long : '', p.tags ? p.tags.join(' ') : ''].join(' ').toLowerCase().includes(filter))
    const filter = useRef('')
    const filterInputRef = useRef()
    const [filteredProjects, setFilteredProjects] = useState([...projects])

    const handleFilterKeyUp = () => debounce(() => {
        filter.current = filterInputRef.current.value.toLowerCase()
        setFilteredProjects(getFilteredProjects(filter.current))
    })

    return (
        <div style={styles.container} className="bg-neutral-focus mt-[49px]">
            <div className="form-control bg-neutral-focus p-4 fixed z-[90] w-screen -ml-4 bg-opacity-60 backdrop-blur-md">
                <input ref={filterInputRef} onKeyUp={handleFilterKeyUp()} type="text" placeholder="Search projects" className="input input-bordered w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[80px]">
                {filteredProjects.map((p, i) =>
                    <div key={i}>
                        <ProjectCard
                            title={p.title}
                            description={p.description}
                            long={p.long}
                            link={p.link}
                            imgpath={p.imgpath}
                            status={p.status}
                            tags={p.tags}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export { GridLayout }