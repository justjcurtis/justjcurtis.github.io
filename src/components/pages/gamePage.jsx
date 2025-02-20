import { useParams } from 'react-router-dom'
import { allGames } from '../games'
import { NotFoundPage } from './notFoundPage'
import { StarryNight } from '../starryNight'

const GamePage = () => {
    const { gameName } = useParams()
    const gameConfig = allGames.find(g => g.name === gameName)

    if (!gameConfig) return <NotFoundPage />

    const Game = gameConfig.game
    return (
        <>
            <StarryNight />
            <div className="flex-1 flex items-center justify-center select-none">
                <Game />
            </div>
        </>
    )
}

export { GamePage }

