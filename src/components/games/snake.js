import { useState, useRef, useEffect } from 'react'
const GRID_SIZE = 64
const Snake = () => {
    const [game, setGame] = useState({
        score: 0,
        snake: [
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 },
        ],
        food: { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) },
        direction: { x: 1, y: 0 },
        restart: false,
    })
    const lastRender = useRef(0)
    const lastMove = useRef(0)
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (game.restart) return
            const now = Date.now()
            const delta = now - lastRender.current
            if (lastRender === 0 || delta < 17) {
                clearTimeout(timeout)
                return
            }
            lastRender.current = now
            setGame(g => {
                const snake = [...g.snake]
                const food = { ...g.food }
                let direction = { ...g.direction }
                let score = g.score
                let restart = g.restart

                if (lastMove.current === 0) lastMove.current = Date.now()
                const moveDelta = now - lastMove.current
                if (moveDelta >= 100) {
                    for (let i = snake.length - 1; i >= 0; i--) {
                        const bit = snake[i]
                        if (i === 0) {
                            bit.x += direction.x
                            bit.y += direction.y
                            break
                        }
                        bit.x = snake[i - 1].x
                        bit.y = snake[i - 1].y
                    }
                    lastMove.current = now
                }
                const head = { ...snake[0] }
                if (head.x === food.x && head.y === food.y) {
                    score++
                    food.x = Math.floor(Math.random() * GRID_SIZE)
                    food.y = Math.floor(Math.random() * GRID_SIZE)
                    snake.push({ ...g.snake[g.snake.length - 1] })
                }
                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                    restart = true
                }
                for (let i = 1; i < snake.length; i++) {
                    const bit = snake[i]
                    if (head.x === bit.x && head.y === bit.y) {
                        restart = true
                        break
                    }
                }
                const preHead = { ...snake[1] }
                let unwantedDirection = {
                    x: preHead.x - head.x,
                    y: preHead.y - head.y,
                }
                if (unwantedDirection.x !== lastDirection.current.x &&
                    unwantedDirection.y !== lastDirection.current.y) {
                    direction = lastDirection.current
                }
                return { score, snake, food, direction, restart }
            })
            return () => {
                clearTimeout(timeout)
            }
        }, 17)
    }, [game])

    const resetGame = () => {
        setGame(_ => {
            const restart = false
            const score = 0
            const snake = [
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
            ]
            const food = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) }
            const direction = { x: 1, y: 0 }
            lastDirection.current = direction
            return { score, snake, food, direction, restart }
        })

    }

    const lastDirection = useRef(game.direction)
    const handleKeyDown = (e) => {
        const direction = { ...lastDirection.current }
        switch (e.key) {
            case 'ArrowUp':
                direction.x = 0
                direction.y = -1
                break
            case 'ArrowDown':
                direction.x = 0
                direction.y = 1
                break
            case 'ArrowLeft':
                direction.x = -1
                direction.y = 0
                break
            case 'ArrowRight':
                direction.x = 1
                direction.y = 0
                break
            case ' ':
                if (!game.restart) break
                resetGame()
                break
            default:
                break
        }
        lastDirection.current = direction
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [game.restart]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleClick = (e) => {
        if (e.touches) e = e.touches[0]
        if (game.restart) {
            resetGame()
            return
        }
        const direction = { ...lastDirection.current }
        const x = e.clientX
        const y = e.clientY
        const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        const angle = Math.atan2(y - center.y, x - center.x) * 180 / Math.PI
        if (angle > -45 && angle < 45) {
            direction.x = 1
            direction.y = 0
        } else if (angle > 45 && angle < 135) {
            direction.x = 0
            direction.y = 1
        } else if (angle > 135 || angle < -135) {
            direction.x = -1
            direction.y = 0
        } else if (angle > -135 && angle < -45) {
            direction.x = 0
            direction.y = -1
        }
        lastDirection.current = direction
    }
    useEffect(() => {
        window.addEventListener('touchstart', handleClick)
        return () => {
            window.removeEventListener('touchstart', handleClick)
        }
    }, [game.restart]) // eslint-disable-line react-hooks/exhaustive-deps

    const styles = {
        grid: {
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            gap: 1,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: `${Math.min(window.innerWidth, window.innerHeight - (64 + 134))}px`,
            height: `${Math.min(window.innerWidth, window.innerHeight - (64 + 134))}px`,
            marginTop: '134px',
            marginBottom: '64px',
        },
        restartText: {
            opacity: game.restart ? 1 : 0,
            transition: `opacity ${game.restart ? 1.5 : 0.2}s ease-in-out`,
        }
    }
    return (
        <div className="w-full h-[100svh] absolute text-center">
            <h3 className='absolute top-[70px] w-full text-4xl font-medium z-[90] text-purple-500'>{game.score}</h3>
            <h3 style={styles.restartText} className='absolute top-[40%] w-full text-4xl font-medium text-red-500'>You Died</h3>
            <h3 style={styles.restartText} className='absolute top-[50%] w-full text-4xl font-medium text-blue-500'>Press Space or Tap to Restart</h3>
            <div style={styles.grid}>
                {Array.from(Array(GRID_SIZE).keys()).map(y => {
                    return (Array.from(Array(GRID_SIZE).keys()).map(x => {
                        const isSnake = game.snake.find(bit => bit.x === x && bit.y === y)
                        const isHead = isSnake && x === game.snake[0].x && y === game.snake[0].y
                        const isFood = game.food.x === x && game.food.y === y
                        const color = isHead ? 'bg-purple-500' : isSnake ? 'bg-blue-400' : isFood ? 'bg-red-500' : 'bg-gray-500'
                        const opacity = !isSnake && !isFood ? 'opacity-20' : 'opacity-100'
                        return (
                            <div key={`${x}-${y}`} className={`${color} ${opacity}`} />
                        )
                    }))
                })}
            </div>
        </div>
    )
}

export { Snake }
