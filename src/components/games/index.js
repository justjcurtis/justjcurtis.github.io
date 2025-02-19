import { Pong } from './pong'
import { Snake } from './snake'
import { SpaceInvaders } from './spaceInvaders'

const allGames = [
    { name: 'snake', game: Snake },
    { name: 'pong', game: Pong },
    { name: 'spaceInvaders', game: SpaceInvaders },
]

export { Pong, Snake, SpaceInvaders, allGames }
