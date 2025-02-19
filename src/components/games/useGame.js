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
        const timeout = setTimeout(() => {
            setGame(currentGame => update(currentGame))
        }, 1000 / fpsLimit)
        return () => clearTimeout(timeout)
    }, [game])

    useEffect(() => {
        const eventListeners = [
            { event: 'keydown', handler: onKeyPress },
            { event: 'touchmove', handler: onTouchMove },
            { event: 'mousemove', handler: onMouseMove },
            { event: 'click', handler: onClick }
        ].filter(({ handler }) => handler !== undefined);

        eventListeners.forEach(({ event, handler }) => {
            window.addEventListener(event, handler);
        });

        return () => {
            eventListeners.forEach(({ event, handler }) => {
                window.removeEventListener(event, handler);
            });
        };
    }, [onKeyPress, onTouchMove, onMouseMove, onClick])
    return { game, setGame }
}
