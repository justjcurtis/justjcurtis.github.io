import { motion as m } from "framer-motion"
const CvIconLineItem = ({ children, username, title, href }) => {
    return (
        <m.a href={href} target="_blank" rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.4 + Math.random() * 0.3, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }}
            exit={{ opacity: 0, x: 6, y: 10 }}>
            <div className="flex flex-1 flex-row mt-5">
                <div className="flex flex-1 flex-col">
                    {children}
                </div>
                <div className="flex flex-1 flex-col">
                    <h4 className="text-md text-thin text-gray-600 text-left">{username}</h4>
                    <h4 className="text-md text-thin text-gray-600 text-left">{title}</h4>
                </div>
            </div>
        </m.a>

    );
}

export { CvIconLineItem }
