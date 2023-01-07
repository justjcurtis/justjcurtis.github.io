import { CONSTRUCTION_PERCENTAGE } from "../../data/constants"
import { motion as m } from 'framer-motion'

const WipPage = ({ pagename }) => {
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }} className="hero flex-1 bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Contruction In Progress 🛠</h1>
                    <p className="py-6">Check back later to see how it went 👀. <br /> This will eventually become the {pagename} page 🚀</p>
                    <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": CONSTRUCTION_PERCENTAGE }}>{CONSTRUCTION_PERCENTAGE}%</div>
                </div>
            </div>
        </m.div>
    )
}

export { WipPage }