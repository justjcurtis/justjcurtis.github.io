import { useState, useEffect } from 'react';

const pongBot = (current, ball) => {
    if (current.y + (current.h / 2) < ball.y + (ball.h / 2))
        current.y += Math.abs(0.3 * ball.dx) + Math.abs(0.2 * ball.dy)
    if (current.y + (current.h / 2) > ball.y + (ball.h / 2))
        current.y -= Math.abs(0.3 * ball.dx) - (0.2 * ball.dy)
    return current
}
const Pong = () => {
    const [mousePos, setMousePos] = useState({});
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (event.touches) event = event.touches[event.touches.length - 1]
            setMousePos({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove);
        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    const [game, setGame] = useState({
        score: [0, 0],
        ball: {
            w: 20,
            h: 20,
            x: 100,
            y: window.innerHeight / 2,
            dx: 5,
            dy: 1,
        },
        player1: {
            y: window.innerHeight / 2 - 150,
            x: 50,
            w: 12,
            h: 160,
        },
        player2: {
            y: window.innerHeight / 2 - 150,
            x: window.innerWidth - 50,
            w: 12,
            h: 150,
        },
    })

    const getOffset = (a, b) => ((b.y + (b.h / 2)) - (a.y + (a.h / 2))) / (b.h / 2)

    const isColliding = (a, b) => {
        return !(
            ((a.y + a.h) < (b.y)) ||
            (a.y > (b.y + b.h)) ||
            ((a.x + a.w) < b.x) ||
            (a.x > (b.x + b.w))
        );
    }

    useEffect(() => {
        setTimeout(() => {
            setGame(g => {
                const score = [...g.score]
                const ball = { ...g.ball }
                let player1 = { ...g.player1 }
                const player2 = { ...g.player2 }
                ball.x += ball.dx
                ball.y += ball.dy
                if (ball.y + ball.h > window.innerHeight || ball.y < 64) {
                    ball.dy *= -1
                }
                if (ball.x > window.innerWidth || ball.x + ball.w < 0) {
                    if (ball.x < 0) {
                        score[1] += 1
                        ball.dx = -5
                        ball.dy = Math.random() * 4 - 2
                        ball.x = window.innerWidth - 80
                        ball.y = player2.y + player2.h / 2
                    } else {
                        score[0] += 1
                        ball.dx = 5
                        ball.dy = Math.random() * 4 - 2
                        ball.x = 80
                        ball.y = player1.y + player1.h / 2
                    }
                }
                if (isColliding(ball, player1) || isColliding(ball, player2)) {
                    ball.dx *= -1
                    if (Math.abs(ball.dx) < 10) {
                        ball.dx += ball.dx > 0 ? 0.5 : -0.5
                    }
                    if (ball.x < window.innerWidth / 2) {
                        const offset = getOffset(ball, player1)
                        ball.dy = -offset * (ball.dx)
                        ball.x = player1.x + player1.w + ball.w / 2
                    } else {
                        const offset = getOffset(ball, player2)
                        ball.dy = offset * (ball.dx)
                        ball.x = player2.x - player2.w - ball.w / 2
                    }
                }
                if (mousePos.y) player2.y = mousePos.y - player2.h / 2
                player1 = pongBot(player1, ball)
                return { score, ball, player1, player2 }
            })
        }, 17)
    }, [game]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ height: '100svh', overflow: 'hidden' }} className='w-full text-center absolute top-0'>
            <h3 className='absolute top-20 w-full text-4xl font-medium z-[90]'><span className='text-red-500'>{game.score[0]}</span> <span className='text-purple-500'>-</span> <span className='text-blue-500'>{game.score[1]}</span></h3>
            <div style={{
                top: game.player1.y,
                width: game.player1.w,
                height: game.player1.h,
                left: game.player1.x,
            }} className="fixed bg-red-500" />
            <div style={{
                top: game.player2.y,
                width: game.player2.w,
                height: game.player2.h,
                left: game.player2.x,
            }} className="fixed bg-blue-500" />
            <div style={{
                top: game.ball.y,
                left: game.ball.x,
                borderRadius: '50%',
                width: game.ball.w,
                height: game.ball.h,
            }} className="fixed bg-purple-500" />
        </div>
    );
}

export { Pong }
