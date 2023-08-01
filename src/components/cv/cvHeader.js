import React from "react";
import { motion as m } from "framer-motion"
import { useImageUrls } from '../../hooks/useImageUrls'

const CvHeader = () => {
    const images = useImageUrls()
    return (
        <div className="flex md:flex-row flex-col md:justify-evenly">
            <div className="flex flex-1 lg:h-64 lg:w-64 md:ml-10 mt-14 h-40 w-40 mx-auto">
                <m.img initial={{ opacity: 0, x: -10, y: -6 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.2, duration: (0.15 + (0.1 * Math.random())), ease: 'easeInOut' }}
                    exit={{ opacity: 0, x: 6, y: 10 }}
                    className="mask mask-hexagon"
                    src={images.AvatarAlt}
                    alt="just j curtis" />
            </div>
            <div
                className='flex-[2_2_0%] flex flex-col justify-center text-center'>
                <m.h1 initial={{ opacity: 0, x: 20, y: -10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.2, duration: (0.3 + (0.1 * Math.random())), ease: 'easeInOut' }}
                    exit={{ opacity: 0, x: 6, y: 10 }}
                    className="text-6xl lg:text-8xl font-thin text-black md:mt-20 mb-5">Jacson<br />J Curtis</m.h1>
                <m.h3 initial={{ opacity: 0, x: 0, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3, duration: (0.3 + (0.3 * Math.random())), ease: 'easeInOut' }}
                    exit={{ opacity: 0, x: 6, y: 10 }}
                    className="text-xl font-thin text-primary-focus">Senior Software Engineer</m.h3>
            </div>
        </div>

    );
}

export { CvHeader }
