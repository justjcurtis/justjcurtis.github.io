import { useRef, useEffect } from 'react';
import { useGame } from './useGame';

const PLAYER_CHAR = '▲';
const ENEMY_CHAR = '▼';
const PROJECTILE_CHAR = '•';
const BASE_ENEMY_SPEED = 1;
const PROJECTILE_SPEED = 8;
const EXPLOSION_CHARS = ['✧', '✦', '✺', '✹', '✶', '✷', '✸', '✹', '★', '☆', '✫'];

const getResponsiveSize = () => {
    const screenWidth = window.innerWidth;
    // Base size on screen width, with a minimum of 20px and maximum of 40px
    const size = Math.min(Math.max(screenWidth * 0.04, 20), 40);
    return size;
};

const INITIAL_GAME_STATE = {
    score: 0,
    level: 1,
    lives: 3,
    player: {
        x: window.innerWidth / 2,
        y: window.innerHeight - 100,
        w: getResponsiveSize(),
        h: getResponsiveSize(),
        speed: 5
    },
    enemies: [],
    projectiles: [],
    enemyProjectiles: [],
    explosions: [],
    enemyDirection: 1,
    lastShot: 0,
    gameOver: false
};

const SpaceInvaders = () => {
    const gameOverRef = useRef(false);
    const touchPos = useRef({ x: 0, y: 0 });
    const keyState = useRef({
        ArrowLeft: false,
        ArrowRight: false,
        Space: false
    });

    const getInitialEnemies = (level) => {
        const enemies = [];
        const rows = Math.min(3 + Math.floor(level / 2), 6);
        const cols = Math.min(6 + Math.floor(level / 3), 10);
        const enemySize = getResponsiveSize() * 0.75; // Enemies slightly smaller than player
        const spacing = Math.min(enemySize * 2, window.innerWidth / (cols + 2));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                enemies.push({
                    x: (j + 1) * spacing,
                    y: (i + 1) * spacing + 100,
                    w: enemySize,
                    h: enemySize,
                    alive: true
                });
            }
        }
        return enemies;
    };

    const onKeyDown = (event) => {
        if (event.code === 'ArrowLeft') keyState.current.ArrowLeft = true;
        if (event.code === 'ArrowRight') keyState.current.ArrowRight = true;
        if (event.code === 'Space') {
            keyState.current.Space = true;
            if (gameOverRef.current) {
                restartGame();
            }
        }
    };

    const onKeyUp = (event) => {
        if (event.code === 'ArrowLeft') keyState.current.ArrowLeft = false;
        if (event.code === 'ArrowRight') keyState.current.ArrowRight = false;
        if (event.code === 'Space') keyState.current.Space = false;
    };

    const onTouchMove = (event) => {
        const touch = event.touches[event.touches.length - 1];
        touchPos.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchStart = (event) => {
        const touch = event.touches[event.touches.length - 1];
        touchPos.current = { x: touch.clientX, y: touch.clientY };
    };

    const restartGame = () => {
        gameOverRef.current = false;
        setGame({
            ...INITIAL_GAME_STATE,
            enemies: getInitialEnemies(1)
        });
    };

    const { game, setGame } = useGame({
        initialGameData: {
            ...INITIAL_GAME_STATE,
            enemies: getInitialEnemies(1)
        },
        update: (g) => {
            if (gameOverRef.current) {

                return g;
            }

            const newState = { ...g };
            const player = { ...g.player };
            const projectiles = [...g.projectiles];
            const enemyProjectiles = [...g.enemyProjectiles];
            let enemies = [...g.enemies];

            // Player movement
            if (keyState.current.ArrowLeft) {
                player.x = Math.max(0, player.x - player.speed);
            }
            if (keyState.current.ArrowRight) {
                player.x = Math.min(window.innerWidth - player.w, player.x + player.speed);
            }

            // Touch controls
            if (touchPos.current.x) {
                const targetX = touchPos.current.x - player.w / 2;
                player.x += (targetX - player.x) * 0.2;
                player.x = Math.max(0, Math.min(window.innerWidth - player.w, player.x));
            }

            // Shooting
            const now = Date.now();
            if ((keyState.current.Space || touchPos.current.x) && now - g.lastShot > 500) {
                projectiles.push({
                    x: player.x + player.w / 2 - 5,
                    y: player.y,
                    w: 10,
                    h: 10,
                    dy: -PROJECTILE_SPEED
                });
                newState.lastShot = now;
            }

            // Enemy movement and shooting
            let shouldChangeDirection = false;
            const speed = BASE_ENEMY_SPEED * (1 + g.level * 0.1);

            enemies.forEach((enemy, index) => {
                if (!enemy.alive) return;
                enemy.x += speed * g.enemyDirection;

                if (enemy.x <= 0 || enemy.x + enemy.w >= window.innerWidth) {
                    shouldChangeDirection = true;
                }

                // Random enemy shooting
                if (Math.random() < 0.001 * g.level) {
                    enemyProjectiles.push({
                        x: enemy.x + enemy.w / 2 - 5,
                        y: enemy.y + enemy.h,
                        w: 10,
                        h: 10,
                        dy: PROJECTILE_SPEED / 2
                    });
                }
            });

            if (shouldChangeDirection) {
                newState.enemyDirection *= -1;
                enemies = enemies.map(enemy => ({
                    ...enemy,
                    y: enemy.y + 20
                }));
            }

            // Update projectiles
            const updatedProjectiles = projectiles
                .map(p => ({ ...p, y: p.y + p.dy }))
                .filter(p => p.y > 0);

            const updatedEnemyProjectiles = enemyProjectiles
                .map(p => ({ ...p, y: p.y + p.dy }))
                .filter(p => p.y < window.innerHeight);

            // Collision detection
            updatedProjectiles.forEach(projectile => {
                enemies.forEach(enemy => {
                    if (!enemy.alive) return;
                    if (projectile.x < enemy.x + enemy.w &&
                        projectile.x + projectile.w > enemy.x &&
                        projectile.y < enemy.y + enemy.h &&
                        projectile.y + projectile.h > enemy.y) {
                        enemy.alive = false;
                        projectile.y = -100;
                        newState.score += 10 * g.level;
                        // Add explosion particles
                        for (let i = 0; i < 6; i++) {
                            const angle = (Math.PI * 2 * i) / 6;
                            const speed = 2 + Math.random() * 2;
                            newState.explosions.push({
                                x: enemy.x + enemy.w / 2,
                                y: enemy.y + enemy.h / 2,
                                dx: Math.cos(angle) * speed,
                                dy: Math.sin(angle) * speed,
                                char: EXPLOSION_CHARS[Math.floor(Math.random() * EXPLOSION_CHARS.length)],
                                life: 30,
                                size: enemy.w * 0.4
                            });
                        }
                    }
                });
            });

            // Check for player hit
            updatedEnemyProjectiles.forEach(projectile => {
                if (projectile.x < player.x + player.w &&
                    projectile.x + projectile.w > player.x &&
                    projectile.y < player.y + player.h &&
                    projectile.y + projectile.h > player.y) {
                    newState.lives -= 1;
                    projectile.y = window.innerHeight + 100; // Remove projectile
                    // Add blue explosion particles for player hit
                    for (let i = 0; i < 4; i++) {
                        const angle = (Math.PI * 2 * i) / Math.random() * 6;
                        const speed = 1 + Math.random() * 1.5;
                        newState.explosions.push({
                            x: player.x + player.w / 2,
                            y: player.y + player.h / 2,
                            dx: Math.cos(angle) * speed,
                            dy: Math.sin(angle) * speed,
                            char: EXPLOSION_CHARS[Math.floor(Math.random() * EXPLOSION_CHARS.length)],
                            life: 20,
                            size: player.w * 0.3,
                            isPlayer: true // Flag to identify player explosions
                        });
                    }
                    if (newState.lives <= 0) {
                        gameOverRef.current = true;
                    }
                }
            });

            // Check level completion
            const remainingEnemies = enemies.filter(e => e.alive).length;
            if (remainingEnemies === 0) {
                newState.level += 1;
                newState.lives = Math.min(newState.lives + 1, 5); // Gain a life, max 5
                newState.enemies = getInitialEnemies(newState.level);
                enemies = newState.enemies;
            }

            // Check game over (enemies too low)
            if (enemies.some(e => e.alive && e.y + e.h > player.y)) {
                gameOverRef.current = true;
            }

            // Update explosions
            const updatedExplosions = (newState.explosions || [])
                .map(exp => ({
                    ...exp,
                    x: exp.x + exp.dx,
                    y: exp.y + exp.dy,
                    life: exp.life - 1
                }))
                .filter(exp => exp.life > 0);

            return {
                ...newState,
                player,
                projectiles: updatedProjectiles,
                enemyProjectiles: updatedEnemyProjectiles,
                enemies,
                explosions: updatedExplosions
            };
        },
        onKeyPress: onKeyDown,
        onKeyUp,
        onTouchMove,
        onTouchStart,
        fpsLimit: 60
    });

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('touchstart', onTouchStart);
        return () => {
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('touchstart', onTouchStart);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            style={{ height: '100svh', overflow: 'hidden' }}
            className='w-full text-center absolute top-0'
            onClick={() => {
                if (gameOverRef.current && window.innerWidth <= 768) {
                    restartGame();
                }
            }}
        >
            <div className='absolute top-[70px] w-full text-4xl md:text-4xl text-xl font-medium'>
                <span className='text-red-500'>Score: {game.score}</span>
                <span className='text-purple-500 mx-4'>|</span>
                <span className='text-blue-500'>Level: {game.level}</span>
                <span className='text-purple-500 mx-4'>|</span>
                <span className='text-green-500'>Lives: {game.lives}</span>
            </div>

            {gameOverRef.current && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4'>
                    <div className='text-4xl font-bold text-purple-500'>
                        Game Over!
                    </div>
                    <div className='text-xl text-gray-300'>
                        {window.innerWidth > 768
                            ? "Press SPACE to restart"
                            : "Tap anywhere to restart"}
                    </div>
                </div>
            )}

            <div style={{
                position: 'fixed',
                left: game.player.x,
                top: game.player.y,
                width: game.player.w,
                height: game.player.h,
                color: '#ef4444',
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>{PLAYER_CHAR}</div>

            {game.enemies.map((enemy, index) => enemy.alive && (
                <div key={index} style={{
                    position: 'fixed',
                    left: enemy.x,
                    top: enemy.y,
                    width: enemy.w,
                    height: enemy.h,
                    color: '#3b82f6',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>{ENEMY_CHAR}</div>
            ))}

            {game.projectiles.map((projectile, index) => (
                <div key={`p${index}`} style={{
                    position: 'fixed',
                    left: projectile.x,
                    top: projectile.y,
                    width: projectile.w,
                    height: projectile.h,
                    color: '#a855f7',
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textShadow: '0 0 1px #000'
                }}>{PROJECTILE_CHAR}</div>
            ))}

            {game.enemyProjectiles.map((projectile, index) => (
                <div key={`ep${index}`} style={{
                    position: 'fixed',
                    left: projectile.x,
                    top: projectile.y,
                    width: projectile.w,
                    height: projectile.h,
                    color: '#a855f7',
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textShadow: '0 0 1px #000'
                }}>{PROJECTILE_CHAR}</div>
            ))}

            {game.explosions?.map((explosion, index) => (
                <div key={`exp${index}`} style={{
                    position: 'fixed',
                    left: explosion.x,
                    top: explosion.y,
                    width: explosion.size,
                    height: explosion.size,
                    color: explosion.isPlayer
                        ? `rgba(59, 130, 246, ${explosion.life / 20})`
                        : `rgba(239, 68, 68, ${explosion.life / 30})`,
                    fontSize: `${explosion.size}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translate(-50%, -50%)',
                    textShadow: explosion.isPlayer
                        ? '0 0 3px rgba(59, 130, 246, 0.5)'
                        : '0 0 3px rgba(239, 68, 68, 0.5)'
                }}>{explosion.char}</div>
            ))}
        </div>
    );
};

export { SpaceInvaders };

