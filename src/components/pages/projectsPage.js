import { GridLayout } from "../gridLayout"
import { motion as m } from 'framer-motion'
import { getProjects } from "../../data/projects"
import { useEffect, useRef, useState } from "react"

const ProjectsPage = () => {
    const [projects, setProjects] = useState([])
    const hasData = useRef(false)

    const fetchProjects = async () => {
        hasData.current = true
        const p = await getProjects()
        setProjects(p)
    }

    useEffect(() => {
        if (!hasData.current) fetchProjects()
    })
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
            <GridLayout projects={[...projects]} />
        </m.div>
    )
}

export { ProjectsPage }