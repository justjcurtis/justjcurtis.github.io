import { useMemo } from 'react'

const ANIMATION_CONSTANTS = {
    MIN_DELAY: 0.05,
    MAX_DELAY: 0.5,
    MIN_OFFSET: 2,
    MAX_OFFSET: 12
}

export const useRandomAnimation = () => {
    return useMemo(() => {
        const delay = ANIMATION_CONSTANTS.MIN_DELAY +
            (Math.random() * (ANIMATION_CONSTANTS.MAX_DELAY - ANIMATION_CONSTANTS.MIN_DELAY))

        const getRandomOffset = () => {
            const offset = ANIMATION_CONSTANTS.MIN_OFFSET +
                (Math.random() * (ANIMATION_CONSTANTS.MAX_OFFSET - ANIMATION_CONSTANTS.MIN_OFFSET))
            return Math.random() > 0.5 ? -offset : offset
        }

        const xOffset = getRandomOffset()
        const yOffset = getRandomOffset()
        const duration = (ANIMATION_CONSTANTS.MIN_DELAY / 2) +
            (Math.random() * ((ANIMATION_CONSTANTS.MAX_DELAY / 2) - (ANIMATION_CONSTANTS.MIN_DELAY / 2)))

        return {
            initial: { opacity: 0, x: xOffset, y: yOffset },
            animate: { opacity: 1, x: 0, y: 0 },
            exit: { opacity: 0, x: -xOffset, y: -yOffset },
            transition: { delay, duration }
        }
    }, [])
}

