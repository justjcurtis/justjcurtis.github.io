import { useRef, useEffect } from 'react';
import { getRandomInt } from '../../utils/helpers';
import { useGame } from './useGame';

const SPEED_MODIFIER = Math.min(window.innerWidth / 500, 1.2)
const pongBot = (current, ball) => {
    const target = (current.y + (current.h / 2)) + (current.targetSelector * (current.h / 7))
    const diff = target - ball.y + (ball.h / 2)
    if (diff < -(current.h / 7))
        current.y += (4 * (SPEED_MODIFIER)) + Math.abs(0.2 * ball.dx * (SPEED_MODIFIER)) + Math.abs(0.15 * ball.dy * (SPEED_MODIFIER))
    if (diff > (current.h / 7))
        current.y -= (4 * (SPEED_MODIFIER)) + Math.abs(0.2 * ball.dx * (SPEED_MODIFIER)) + Math.abs(0.15 * ball.dy * (SPEED_MODIFIER))
    return current
}
const Pong = () => {
    const mousePos = useRef({});
    const onMouseMove = (event) => {
        if (event.touches) event = event.touches[event.touches.length - 1]
        mousePos.current = ({ x: event.clientX, y: event.clientY });
    };

    const getOffset = (a, b) => ((b.y + (b.h / 2)) - (a.y + (a.h / 2))) / (b.h / 2)

    const isColliding = (a, b) => {
        return !(
            ((a.y + a.h) < (b.y)) ||
            (a.y > (b.y + b.h)) ||
            ((a.x + a.w) < b.x) ||
            (a.x > (b.x + b.w))
        );
    }
    const game = useGame({
        initialGameData: {
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
                targetSelector: getRandomInt(2, -2),
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
        },
        update: g => {
            const score = [...g.score]
            const ball = { ...g.ball }
            let player1 = { ...g.player1 }
            const player2 = { ...g.player2 }
            ball.x += ball.dx * (SPEED_MODIFIER)
            ball.y += ball.dy * (SPEED_MODIFIER)
            if (ball.y + ball.h > window.innerHeight || ball.y < 64) {
                ball.dy *= -1
                if (ball.y < 64) ball.y = 64
                if (ball.y + ball.h > window.innerHeight) ball.y = window.innerHeight - ball.h
            }
            if (ball.x > window.innerWidth || ball.x + ball.w < 0) {
                player1.targetSelector = getRandomInt(2, -2)
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
                    player1.targetSelector = getRandomInt(2, -2)
                    const offset = getOffset(ball, player1)
                    ball.dy = -offset * (ball.dx)
                    ball.x = player1.x + player1.w + ball.w / 2
                } else {
                    const offset = getOffset(ball, player2)
                    ball.dy = offset * (ball.dx)
                    ball.x = player2.x - player2.w - ball.w / 2
                }
            }
            if (mousePos.current.y) player2.y = mousePos.current.y - player2.h / 2
            player1 = pongBot(player1, ball)
            player2.x = window.innerWidth - 50

            if (player1.y + (player1.h / 2) < 64) player1.y = 64 - (player1.h / 2)
            if (player1.y + (player1.h / 2) > window.innerHeight) player1.y = window.innerHeight - (player1.h / 2)
            if (player2.y + (player2.h / 2) < 64) player2.y = 64 - (player2.h / 2)
            if (player2.y + (player2.h / 2) > window.innerHeight) player2.y = window.innerHeight - (player2.h / 2)

            return { score, ball, player1, player2 }
        },
        onMouseMove,
        onTouchMove: onMouseMove,
    })

    return (
        <div style={{ height: '100svh', overflow: 'hidden' }} className='w-full text-center absolute top-0'>
            <h3 className='absolute top-[70px] w-full text-4xl font-medium z-[90]'><span className='text-red-500'>{game.score[0]}</span> <span className='text-purple-500'>-</span> <span className='text-blue-500'>{game.score[1]}</span></h3>
            <div style={{
                top: game.player1.y,
                width: game.player1.w,
                height: game.player1.h,
                left: game.player1.x,
                borderRadius: game.player1.w / 2,
            }} className="fixed bg-red-500" />
            <div style={{
                borderRadius: game.player2.w / 2,
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
