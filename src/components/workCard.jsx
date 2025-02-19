import { motion as m } from "framer-motion"
import PropTypes from 'prop-types'
import { useRandomAnimation } from '../hooks/useRandomAnimation'

const WorkCard = ({
    bg,
    name,
    title,
    tech,
    description,
    link,
    cols = 1,
    rows = 1
}) => {
    const animation = useRandomAnimation()

    return (
        <m.div
            {...animation}
            className={`
                bg-${bg} 
                rounded-md 
                lg:col-span-${cols} 
                lg:row-span-${rows} 
                flex 
                flex-col 
                place-content-between
            `}
        >
            <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="p-4"
            >
                <h1 className="text-primary-content text-2xl font-bold">
                    {name}
                </h1>
                <h2 className="mt-2 text-primary-content text-xl font-bold">
                    {title}
                </h2>
                <hr className="mb-2 border-primary-content border-opacity-60" />
                <p className="text-primary-content">
                    {description}
                </p>
            </a>
            {tech && (
                <h3 className="
                    text-neutral-content 
                    text-sm 
                    bg-neutral-focus 
                    bg-opacity-60 
                    rounded-b-md 
                    p-2 
                    mt-4 
                    justify-self-center"
                >
                    {tech}
                </h3>
            )}
        </m.div>
    )
}

WorkCard.propTypes = {
    bg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tech: PropTypes.string,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    cols: PropTypes.number,
    rows: PropTypes.number
}

export { WorkCard }
