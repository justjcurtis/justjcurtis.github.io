import { Modal } from "./modal"
import { motion as m } from "framer-motion"
import { useRef } from "react"

const ProjectCard = ({ title, description, link, long, imgpath, status, tags = [] }) => {
    const cardClicked = () => {
        if (!link) return
        if (!long) {
            window.open(link, '_blank')
            return
        }
    }
    const trandom = useRef(Math.random())
    return (
        <>
            <label onClick={cardClicked} htmlFor={title}>
                <m.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + (0.3 * Math.random()), duration: 0.1 + (0.3 * trandom.current), ease: 'easeInOut' }} exit={{ opacity: 0, scale: 0.97 }} className={`card w-50 bg-base-100 shadow-xl h-[600px]`}>
                    <figure>{imgpath ? <img className="h-[400px] object-cover" src={imgpath} alt={title} /> : <div className="text-center h-80"><h1 className="mt-20 text-3xl text-primary">Image coming soon..</h1></div>}</figure>
                    <div className="card-body">
                        <h2 className="card-title text-primary bg-primary-content rounded-md px-1">
                            {title}
                            {status && <div className="badge badge-secondary">{status}</div>}
                        </h2>
                        <p>{description}</p>
                        <div className="card-actions justify-end">
                            {tags.map((t, i) => <div key={i} className="badge badge-outline badge-accent">{t}</div>)}
                        </div>
                    </div>
                </m.div >
            </label>
            {long && <Modal id={title} link={link} title={title} description={long} />}
        </>
    )
}

export { ProjectCard }