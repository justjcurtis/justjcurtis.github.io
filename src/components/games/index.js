import { Pong } from './pong'
import { Snake } from './snake'
import { SpaceInvaders } from './spaceInvaders'
import RockPaperScissors from './rps'

const allGames = [
    { name: 'snake', game: Snake },
    { name: 'pong', game: Pong },
    { name: 'spaceInvaders', game: SpaceInvaders },
    { name: 'rockPaperScissors', game: RockPaperScissors },
]

export { Pong, Snake, SpaceInvaders, RockPaperScissors, allGames }
