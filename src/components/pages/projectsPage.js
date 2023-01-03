import { GridLayout } from "../gridLayout"
import { motion as m } from 'framer-motion'

const ProjectsPage = () => {
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
            <GridLayout />
        </m.div>
    )
}

export { ProjectsPage }