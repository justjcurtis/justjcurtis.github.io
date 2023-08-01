import { motion as m } from "framer-motion"
const CvLineItem = ({ leftText, rightTexts }) => {
    return (
        <m.div initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.4 + Math.random() * 0.3, duration: (0.1 + (0.3 * Math.random())), ease: 'easeInOut' }}
            exit={{ opacity: 0, x: 6, y: 10 }}
            className="flex flex-row mt-5">
            <div className="flex flex-1 flex-col">
                <h4 className="text-lg font-bold text-black text-left">{leftText}</h4>
            </div>
            <div className="flex flex-1 flex-col" >
                {rightTexts.map((text, i) => {
                    return <h4 key={`${text}_${i}`} className="text-md text-thin text-gray-600 text-left">
                        {
                            text.startsWith('https://') ?
                                <a href={text} target="_blank" rel="noreferrer">{text.slice(8)}</a> :
                                text
                        }
                    </h4>

                })
                }
            </div>
        </m.div >
    );
}

export { CvLineItem }
