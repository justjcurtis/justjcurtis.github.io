import { GridLayout } from "../gridLayout"
import { motion as m } from 'framer-motion'
import { getProjects } from "../../data/projects"
import { useQuery } from "../../hooks/useQuery"

const ProjectsPage = () => {
    const [projects] = useQuery('projects', getProjects)
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
            <GridLayout projects={[...projects]} />
        </m.div>
    )
}

export { ProjectsPage }