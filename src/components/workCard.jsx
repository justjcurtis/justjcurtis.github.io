import { motion as m } from "framer-motion"
const WorkCard = ({ bg, name, title, tech, description, link, cols = 1, rows = 1 }) => {
    const minDelay = 0.05
    const maxDelay = 0.5
    const delay = minDelay + (Math.random() * (maxDelay - minDelay))
    let xoffset = 2 + (Math.random() * 10)
    if (Math.random() > 0.5) xoffset = -xoffset
    let yoffset = 2 + (Math.random() * 10)
    if (Math.random() > 0.5) yoffset = -yoffset

    const length = (minDelay / 2) + (Math.random() * ((maxDelay / 2) - (minDelay / 2)))

    return (
        <m.div initial={{ opacity: 0, x: xoffset, y: yoffset }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: delay, duration: length }} exit={{ x: -xoffset, y: -yoffset, opacity: 0 }} className={`bg-${bg} rounded-md md:col-span-${cols} md:row-span-${rows} flex flex-col place-content-between`} >
            <a href={link} target="_blank" rel="noreferrer">
                <div className="p-4" >
                    <h1 className="text-primary-content ext-2xl font-bold">{name}</h1>
                    <h2 className="mt-2 text-primary-content text-xl font-bold">{title}</h2>
                    <hr className="mb-2 border-primary-content border-opacity-60" />
                    <p className="text-primary-content text">{description}</p>
                </div>
            </a>
            {tech && <h3 className="text-neutral-content text-sm bg-neutral-focus bg-opacity-60 rounded-b-md p-2 mt-4 justify-self-center">{tech}</h3>}
        </m.div >
    )
}

export { WorkCard }
