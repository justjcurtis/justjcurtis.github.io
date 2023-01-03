import { useRef } from "react";
import Sketch from "react-p5";
import { setup, draw } from './starfield/sketch'

const StarryNight = ({ children }) => {
    const canvasParentRef = useRef()
    return (
        <>
            <Sketch setup={setup} draw={draw} className="fixed top-0 mx-auto left-0 right-0" />
            <div ref={canvasParentRef} className="bg-transparent text-white py-8 z-50 absolute top-0 mx-auto left-0 right-0">
                {children}
            </div>
        </>
    );
}

export { StarryNight }