import { useEffect, useState } from 'react'

export const useGame = ({
    initialGameData,
    update,
    onClick,
    onTouchMove,
    onMouseMove,
    onKeyPress,
    fpsLimit = 60,
}) => {
    const [game, setGame] = useState({
        ...initialGameData,
        info: {},
    })

    useEffect(() => {
        setTimeout(() => {
            setGame(currentGame => update(currentGame))
        }, 1000 / fpsLimit)
    }, [game])

    useEffect(() => {
        if (onKeyPress !== undefined) window.addEventListener('keydown', onKeyPress)
        if (onTouchMove !== undefined) window.addEventListener('touchmove', onTouchMove)
        if (onMouseMove !== undefined) window.addEventListener('mousemove', onMouseMove)
        if (onClick !== undefined) window.addEventListener('click', onClick)
        return () => {
            if (onKeyPress !== undefined) window.removeEventListener('keydown', onKeyPress)
            if (onTouchMove !== undefined) window.removeEventListener('touchmove', onTouchMove)
            if (onMouseMove !== undefined) window.removeEventListener('mousemove', onMouseMove)
            if (onClick !== undefined) window.removeEventListener('click', onClick)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return game
}
