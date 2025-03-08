import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useGame } from '../../hooks/useGame';
import QuadTree from '../../models/quadtree';

// Constants for the simulation
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CIRCLE_RADIUS = 5;
const CIRCLE_COUNT = 2000;
const VISUAL_RANGE = 50;
const MOVE_SPEED = 1;
const TURN_SPEED = 0.1;
const COLLISION_DISTANCE = CIRCLE_RADIUS * 2;
const COLLISION_DISTANCE_SQ = COLLISION_DISTANCE * COLLISION_DISTANCE; // Pre-calculate squared distance

// Types and their properties
const TYPES = {
    ROCK: { name: 'rock', color: '#e74c3c', target: 'scissors', threat: 'paper' },
    PAPER: { name: 'paper', color: '#3498db', target: 'rock', threat: 'scissors' },
    SCISSORS: { name: 'scissors', color: '#2ecc71', target: 'paper', threat: 'rock' }
};

// Helper functions
const getRandomPosition = () => ({
    x: Math.random() * Math.min(CANVAS_WIDTH, window.innerWidth - 40),
    y: Math.random() * Math.min(CANVAS_HEIGHT, window.innerHeight - 20)
});

const getRandomDirection = () => Math.random() * Math.PI * 2;

const getRandomType = () => {
    const types = Object.values(TYPES);
    return types[Math.floor(Math.random() * types.length)];
};

// Optimized distance calculation - avoid square root when possible
const distanceSq = (a, b) => {
    const dx = a.pos.x - b.pos.x;
    const dy = a.pos.y - b.pos.y;
    return dx * dx + dy * dy;
};


const RockPaperScissors = () => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
    const [stats, setStats] = useState({ rock: 0, paper: 0, scissors: 0 });
    const countdownRef = useRef(null);
    const lastUpdateTimeRef = useRef(0);
    const isResettingRef = useRef(false);
    const isPerformingReset = useRef(false);

    // Create boundary object only when dimensions change
    const boundary = useMemo(() => ({
        x: dimensions.width / 2,
        y: dimensions.height / 2,
        width: dimensions.width,
        height: dimensions.height
    }), [dimensions.width, dimensions.height]);

    // Optimized function to create circles with random types
    const createRandomCircles = () => {
        const circles = new Array(CIRCLE_COUNT);
        for (let i = 0; i < CIRCLE_COUNT; i++) {
            circles[i] = {
                pos: getRandomPosition(),
                direction: getRandomDirection(),
                type: getRandomType(),
                id: i // Use simple numeric IDs instead of string generation
            };
        }
        return circles;
    };

    // Initialize game data
    const initialGameData = {
        circles: createRandomCircles(),
        quadtree: new QuadTree(boundary),
        time: 0
    };

    // Update function for the game loop
    const update = useCallback((game) => {
        let { circles, time, quadtree } = game;

        // Handle countdown and reset logic directly in the game loop
        const now = Date.now();
        const deltaTime = now - lastUpdateTimeRef.current;

        // Check if countdown is active
        if (countdownRef.current !== null && countdownRef.current > 0) {
            // Only update countdown once per second
            if (deltaTime >= 1000) {
                lastUpdateTimeRef.current = now;
                countdownRef.current -= 1;

                // Reset the game when countdown reaches 0
                if (countdownRef.current <= 0) {
                    countdownRef.current = null;
                    // Create new circles with random types
                    circles = createRandomCircles();

                    // Reset quadtree with new circles
                    quadtree.clear();
                    circles.forEach(circle => quadtree.insert(circle));
                    quadtree.purgeEmpty();

                    if (!isPerformingReset.current) {
                        isPerformingReset.current = true;
                        setTimeout(() => {
                            setTimeout(() => {
                                isResettingRef.current = false; // Reset the flag after the reset is complete
                                isPerformingReset.current = false;
                            }, 200);
                            setGame({
                                ...game,
                                circles,
                                quadtree,
                                time: time + 1
                            });
                        }, 100);
                    }

                    return {
                        ...game,
                        circles,
                        quadtree,
                        time: time + 1
                    };
                }
            }
        }

        quadtree.clear();

        // Insert all circles into the quadtree
        circles.forEach(circle => quadtree.insert(circle));

        quadtree.purgeEmpty();

        // Update circles in-place for better performance
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            // if a circle is out of bounds, reset its position
            if (!circle.direction || circle.pos.x < 0 || circle.pos.x > dimensions.width || circle.pos.y < 0 || circle.pos.y > dimensions.height) {
                circle.pos = getRandomPosition();
                circle.direction = getRandomDirection();
            }

            // Find nearby circles using quadtree (more efficient)
            const nearbyCircles = quadtree.queryRadius(circle.pos.x, circle.pos.y, VISUAL_RANGE, CIRCLE_COUNT / 5);
            const others = [];

            // Filter out self more efficiently
            for (let j = 0; j < nearbyCircles.length; j++) {
                const other = nearbyCircles[j];
                if (other.id !== circle.id) {
                    others.push(other);
                }
            }

            // Handle collisions (rock-paper-scissors rules)
            for (let j = 0; j < others.length; j++) {
                const other = others[j];
                if (distanceSq(circle, other) < COLLISION_DISTANCE_SQ &&
                    circle.type.target === other.type.name) {
                    other.type = circle.type; // No need to create a new object
                    break
                }
            }

            // Movement logic
            let newDirection = circle.direction;
            let dx = Math.cos(circle.direction) * MOVE_SPEED;
            let dy = Math.sin(circle.direction) * MOVE_SPEED;

            // Find targets and threats in a single pass
            let closestTarget = null;
            let closestTargetDistSq = Infinity;
            let fleeX = 0;
            let fleeY = 0;
            let threatCount = 0;
            const canHaveThreat = stats[circle.type.threat] > 0;

            for (let j = 0; j < others.length; j++) {
                const other = others[j];
                if (!canHaveThreat && threatCount > 10) break
                const distSq = distanceSq(circle, other);
                // Check if it's a target
                if (other.type.name === circle.type.target) {
                    if (distSq < closestTargetDistSq) {
                        closestTarget = other;
                        closestTargetDistSq = distSq;
                    }
                }
                // Check if it's a threat
                else if (other.type.name === circle.type.threat) {
                    threatCount++;
                    const weight = 1 / distSq; // Simplified weight calculation
                    fleeX += (circle.pos.x - other.pos.x) * weight;
                    fleeY += (circle.pos.y - other.pos.y) * weight;
                }
            }
            const hasThreats = threatCount > 0;

            if (closestTarget) {
                // Move towards the closest target
                const targetAngle = Math.atan2(
                    closestTarget.pos.y - circle.pos.y,
                    closestTarget.pos.x - circle.pos.x
                );

                // Gradually turn towards the target
                newDirection = circle.direction + (((targetAngle - circle.direction + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * TURN_SPEED;
                dx = Math.cos(newDirection) * MOVE_SPEED;
                dy = Math.sin(newDirection) * MOVE_SPEED;
            }
            else if (hasThreats && (fleeX !== 0 || fleeY !== 0)) {
                // Calculate direction away from threats
                const fleeAngle = Math.atan2(fleeY, fleeX);

                // Gradually turn away from threats
                newDirection = circle.direction + (((fleeAngle - circle.direction + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * TURN_SPEED;
                dx = Math.cos(newDirection) * MOVE_SPEED;
                dy = Math.sin(newDirection) * MOVE_SPEED;
            }
            else {
                // Random movement with slight turning (less frequent randomization)
                if (Math.random() < 0.1) { // Only change direction 10% of the time
                    newDirection += (Math.random() - 0.5) * 0.2;
                    dx = Math.cos(newDirection) * MOVE_SPEED;
                    dy = Math.sin(newDirection) * MOVE_SPEED;
                }
            }

            // Update position with boundary checking
            let newX = circle.pos.x + dx;
            let newY = circle.pos.y + dy;

            // Bounce off walls
            if (newX < CIRCLE_RADIUS) {
                newX = CIRCLE_RADIUS;
                newDirection = Math.PI - newDirection;
            } else if (newX > dimensions.width - CIRCLE_RADIUS) {
                newX = dimensions.width - CIRCLE_RADIUS;
                newDirection = Math.PI - newDirection;
            }

            if (newY < CIRCLE_RADIUS) {
                newY = CIRCLE_RADIUS;
                newDirection = -newDirection;
            } else if (newY > dimensions.height - CIRCLE_RADIUS) {
                newY = dimensions.height - CIRCLE_RADIUS;
                newDirection = -newDirection;
            }

            // Update circle in-place
            circle.pos.x = newX;
            circle.pos.y = newY;
            circle.direction = newDirection;
        }

        // Use the same array reference
        const updatedCircles = circles;

        // Calculate stats more efficiently in a single pass
        let rockCount = 0;
        let paperCount = 0;
        let scissorsCount = 0;

        for (let i = 0; i < updatedCircles.length; i++) {
            const typeName = updatedCircles[i].type.name;
            if (typeName === 'rock') rockCount++;
            else if (typeName === 'paper') paperCount++;
            else scissorsCount++;
        }

        // Only update stats if they've changed to avoid unnecessary re-renders
        if (stats.rock !== rockCount || stats.paper !== paperCount || stats.scissors !== scissorsCount) {
            setStats({
                rock: rockCount,
                paper: paperCount,
                scissors: scissorsCount
            });
        }

        // Check if all circles are the same type and start countdown if needed
        if (
            (rockCount === CIRCLE_COUNT || paperCount === CIRCLE_COUNT || scissorsCount === CIRCLE_COUNT) &&
            countdownRef.current === null &&
            !isResettingRef.current
        ) {
            // Start countdown
            countdownRef.current = 5;
            lastUpdateTimeRef.current = now; // Reset timer for countdown
            isResettingRef.current = true; // Mark that we're in the resetting process
        }

        return {
            ...game,
            circles,
            quadtree,
            time: time + 1
        };
    }, [dimensions, stats]);

    // Use the game hook
    const { game, setGame } = useGame({
        initialGameData,
        update,
        fpsLimit: 60
    });

    // Initialize lastUpdateTimeRef when component mounts
    useEffect(() => {
        lastUpdateTimeRef.current = Date.now();
    }, []);

    // Optimized rendering
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Group circles by type to reduce context switches
        const rockCircles = [];
        const paperCircles = [];
        const scissorsCircles = [];

        for (let i = 0; i < game.circles.length; i++) {
            const circle = game.circles[i];
            if (circle.type.name === 'rock') {
                rockCircles.push(circle);
            } else if (circle.type.name === 'paper') {
                paperCircles.push(circle);
            } else {
                scissorsCircles.push(circle);
            }
        }

        // Draw rocks
        ctx.fillStyle = TYPES.ROCK.color;
        for (let i = 0; i < rockCircles.length; i++) {
            const circle = rockCircles[i];
            ctx.beginPath();
            ctx.arc(circle.pos.x, circle.pos.y, CIRCLE_RADIUS, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw papers
        ctx.fillStyle = TYPES.PAPER.color;
        for (let i = 0; i < paperCircles.length; i++) {
            const circle = paperCircles[i];
            ctx.beginPath();
            ctx.arc(circle.pos.x, circle.pos.y, CIRCLE_RADIUS, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw scissors
        ctx.fillStyle = TYPES.SCISSORS.color;
        for (let i = 0; i < scissorsCircles.length; i++) {
            const circle = scissorsCircles[i];
            ctx.beginPath();
            ctx.arc(circle.pos.x, circle.pos.y, CIRCLE_RADIUS, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw countdown if active
        if (countdownRef.current !== null) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = 'bold 120px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(countdownRef.current.toString(), canvas.width / 2, canvas.height / 2);

            ctx.font = 'bold 24px Arial';
            ctx.fillText('Resetting simulation...', canvas.width / 2, canvas.height / 2 + 80);
        }

        // Optional: Draw quadtree for debugging (commented out for performance)
        // drawQuadtree(ctx, game.quadtree);
    }, [game]);

    // Handle window resize with debounce
    useEffect(() => {
        // Debounce function to delay execution until resize is "finished"
        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    func(...args);
                }, delay);
            };
        };

        const handleResize = () => {
            const container = canvasRef.current?.parentElement;
            if (container) {
                // Make sure we account for padding and borders
                const containerWidth = container.clientWidth;
                // Use the container width to ensure the canvas fits within its parent
                const width = Math.min(CANVAS_WIDTH, containerWidth);
                const height = Math.min(CANVAS_HEIGHT, window.innerHeight - container.offsetTop - 20);
                setDimensions({ width, height });
            }
        };

        // Create debounced version of the resize handler (200ms delay)
        const debouncedHandleResize = debounce(handleResize, 200);

        // Initial size calculation
        handleResize();

        // Add event listener with debounced handler
        window.addEventListener('resize', debouncedHandleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, []);

    // Optional: Draw quadtree for debugging (optimized but commented out in render for performance)
    const drawQuadtree = (ctx, node) => {
        if (!node) return;

        // Draw current node boundary
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            node.boundary.x - node.boundary.width / 2,
            node.boundary.y - node.boundary.height / 2,
            node.boundary.width,
            node.boundary.height
        );

        // Draw children if divided
        if (node.divided) {
            drawQuadtree(ctx, node.children.northWest);
            drawQuadtree(ctx, node.children.northEast);
            drawQuadtree(ctx, node.children.southWest);
            drawQuadtree(ctx, node.children.southEast);
        }
    };

    return (
        <div className="flex flex-col items-center p-[20px] w-full max-w-screen overflow-hidden absolute top-0">
            <div className="stats flex justify-around w-full max-w-[800px] mb-[10px] font-bold mt-12">
                <div className="stat" style={{ color: TYPES.ROCK.color }}>
                    Rocks: {stats.rock}
                </div>
                <div className="stat" style={{ color: TYPES.PAPER.color }}>
                    Papers: {stats.paper}
                </div>
                <div className="stat" style={{ color: TYPES.SCISSORS.color }}>
                    Scissors: {stats.scissors}
                </div>
            </div>
            <div className="w-full max-w-[800px] mb-[20px] overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    style={{
                        border: '1px solid #1a1a1a',
                        maxWidth: '100%',
                        display: 'block'
                    }}
                />
            </div>
        </div>
    );
};

export default RockPaperScissors;

