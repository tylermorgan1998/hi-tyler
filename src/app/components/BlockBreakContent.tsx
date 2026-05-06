import { useEffect, useRef, useState } from 'react';

export function BlockBreakContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  
  const gameStateRef = useRef({
    balls: [{ x: 0, y: 0, dx: 0, dy: 0, radius: 8, active: true }],
    paddle: { x: 0, y: 0, width: 100, height: 12 },
    blocks: [] as Array<{ x: number; y: number; width: number; height: number; color: string; hits: number; visible: boolean; pattern?: string }>,
    animationId: null as number | null,
    isPlaying: false,
    currentLevel: 1,
  });

  // Function to create blocks for a level
  const createLevel = (levelNum: number, canvas: HTMLCanvasElement) => {
    const blockRowCount = Math.min(4 + Math.floor(levelNum / 3), 6); // Increase rows every 3 levels, max 6
    const blockColumnCount = Math.min(7 + Math.floor(levelNum / 2), 10); // Increase columns, max 10
    const blockWidth = Math.floor((canvas.width - 80) / blockColumnCount);
    const blockHeight = 30;
    const blockPadding = 8;
    const blockOffsetTop = 60;
    const blockOffsetLeft = (canvas.width - (blockColumnCount * (blockWidth + blockPadding) - blockPadding)) / 2;

    const colors = [
      { base: '#60A5FA', glow: '#3B82F6' }, // Blue
      { base: '#EF4444', glow: '#DC2626' }, // Red
      { base: '#FBBF24', glow: '#F59E0B' }, // Yellow
      { base: '#34D399', glow: '#10B981' }, // Green
      { base: '#A855F7', glow: '#9333EA' }, // Purple
      { base: '#EC4899', glow: '#DB2777' }, // Pink
    ];

    const patterns = ['multiball'];

    const blocks: Array<{ x: number; y: number; width: number; height: number; color: string; hits: number; visible: boolean; pattern?: string }> = [];
    
    for (let row = 0; row < blockRowCount; row++) {
      for (let col = 0; col < blockColumnCount; col++) {
        const colorSet = colors[row % colors.length];
        // Some blocks are multiball blocks (10-20% chance depending on level)
        const multiballChance = Math.min(0.1 + (levelNum * 0.02), 0.2);
        const pattern = Math.random() < multiballChance ? 'multiball' : undefined;
        // More 2-hit blocks at higher levels (normal blocks or 2-hit blocks)
        const multiHitChance = Math.min(0.3 + (levelNum * 0.1), 0.6);
        const hits = pattern === 'multiball' ? 1 : (Math.random() < multiHitChance ? 2 : 1);
        
        blocks.push({
          x: blockOffsetLeft + col * (blockWidth + blockPadding),
          y: blockOffsetTop + row * (blockHeight + blockPadding),
          width: blockWidth,
          height: blockHeight,
          color: colorSet.base,
          hits,
          visible: true,
          pattern,
        });
      }
    }
    
    return blocks;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      // Reduced to about half width for better sizing
      const maxWidth = Math.min(700, (window.innerWidth - 200) / 2);
      const maxHeight = Math.min(400, window.innerHeight - 300);
      canvas.width = maxWidth;
      canvas.height = maxHeight;
      
      // Initialize game objects
      const state = gameStateRef.current;
      state.paddle.width = Math.min(100, canvas.width * 0.15);
      state.paddle.height = 12;
      state.paddle.x = (canvas.width - state.paddle.width) / 2;
      state.paddle.y = canvas.height - 30;
      
      state.balls[0].radius = 8;
      
      // Only reset ball position if not playing
      if (!state.isPlaying) {
        state.balls[0].x = canvas.width / 2;
        state.balls[0].y = canvas.height - 50;
        state.balls[0].dx = 0;
        state.balls[0].dy = 0;
      }

      // Create blocks for the current level
      state.blocks = createLevel(state.currentLevel, canvas);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Draw functions
    const drawBall = () => {
      const { balls } = gameStateRef.current;
      balls.forEach(ball => {
        if (!ball.active) return;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#60A5FA';
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.closePath();
      });
    };

    const drawPaddle = () => {
      const { paddle } = gameStateRef.current;
      const gradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x + paddle.width, paddle.y);
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.5, '#E5E7EB');
      gradient.addColorStop(1, '#FFFFFF');
      
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFFFFF';
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
      ctx.shadowBlur = 0;
    };

    const drawBlocks = () => {
      const { blocks } = gameStateRef.current;
      blocks.forEach(block => {
        if (!block.visible) return;

        // Draw block with gradient
        const gradient = ctx.createLinearGradient(block.x, block.y, block.x, block.y + block.height);
        gradient.addColorStop(0, block.color);
        gradient.addColorStop(1, adjustBrightness(block.color, -20));
        
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 8;
        ctx.shadowColor = block.color;
        
        // Rounded rectangle
        roundRect(ctx, block.x, block.y, block.width, block.height, 6);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw pattern
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        if (block.pattern === 'multiball') {
          // Draw two small circles for multiball icon
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(block.x + block.width / 2 - 5, block.y + block.height / 2, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(block.x + block.width / 2 + 5, block.y + block.height / 2, 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Show hit indicator for multi-hit blocks
        if (block.hits > 1) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.font = 'bold 14px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(block.hits.toString(), block.x + block.width / 2, block.y + block.height / 2);
        }
      });
    };

    const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    const adjustBrightness = (color: string, amount: number) => {
      const hex = color.replace('#', '');
      const num = parseInt(hex, 16);
      const r = Math.max(0, Math.min(255, (num >> 16) + amount));
      const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
      const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    // Collision detection
    const detectCollisions = () => {
      const { balls, paddle, blocks } = gameStateRef.current;

      // Wall collisions
      balls.forEach(ball => {
        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
          ball.dx = -ball.dx;
        }
        if (ball.y + ball.dy < ball.radius) {
          ball.dy = -ball.dy;
        }

        // Paddle collision
        if (
          ball.y + ball.dy > paddle.y - ball.radius &&
          ball.x > paddle.x &&
          ball.x < paddle.x + paddle.width &&
          ball.dy > 0
        ) {
          // Add spin based on where the ball hits the paddle, but maintain speed
          const hitPosition = (ball.x - paddle.x) / paddle.width;
          const speed = 4; // Reduced to 4 for slower gameplay
          ball.dx = (hitPosition - 0.5) * speed * 1.5;
          ball.dy = -speed;
          
          // Normalize to maintain consistent speed
          const magnitude = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
          ball.dx = (ball.dx / magnitude) * speed;
          ball.dy = (ball.dy / magnitude) * speed;
        }

        // Block collision
        blocks.forEach(block => {
          if (!block.visible) return;

          if (
            ball.x > block.x &&
            ball.x < block.x + block.width &&
            ball.y > block.y &&
            ball.y < block.y + block.height
          ) {
            ball.dy = -ball.dy;
            
            if (block.pattern === 'multiball') {
              // Spawn a second ball
              const speed = 4; // Reduced to 4 to match main ball speed
              const angle = -Math.PI / 3 + (Math.random() * Math.PI / 3);
              balls.push({
                x: ball.x,
                y: ball.y,
                dx: Math.sin(angle) * speed,
                dy: -Math.cos(angle) * speed,
                radius: 8,
                active: true
              });
              block.visible = false;
              setScore(s => s + 10);
            } else {
              block.hits--;
              if (block.hits <= 0) {
                block.visible = false;
                setScore(s => s + 10);
              }
            }
          }
        });

        // Bottom collision (deactivate ball)
        if (ball.y + ball.dy > canvas.height - ball.radius) {
          ball.active = false;
        }
      });

      // Check if all balls are inactive
      const activeBalls = balls.filter(b => b.active);
      if (activeBalls.length === 0 && gameStateRef.current.isPlaying) {
        gameStateRef.current.isPlaying = false;
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameOver(true);
            setGameStarted(false);
          } else {
            // Reset to single ball
            gameStateRef.current.balls = [{
              x: canvas.width / 2,
              y: canvas.height - 50,
              dx: 0,
              dy: 0,
              radius: 8,
              active: true
            }];
            setGameStarted(false);
          }
          return newLives;
        });
      }

      // Check win condition
      const hasVisibleBlocks = blocks.some(b => b.visible);
      if (hasVisibleBlocks === false && gameStateRef.current.isPlaying) {
        gameStateRef.current.isPlaying = false;
        setGameWon(true);
        setGameStarted(false);
      }
    };

    // Game loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBlocks();
      drawPaddle();
      drawBall();

      const { balls } = gameStateRef.current;
      
      if (gameStateRef.current.isPlaying) {
        detectCollisions();
        balls.forEach(ball => {
          if (ball.active) {
            ball.x += ball.dx;
            ball.y += ball.dy;
          }
        });
      }

      gameStateRef.current.animationId = requestAnimationFrame(draw);
    };

    draw();

    // Mouse/touch controls
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      
      const { paddle, balls } = gameStateRef.current;
      paddle.x = Math.max(0, Math.min(canvas.width - paddle.width, x - paddle.width / 2));
      
      // Move ball with paddle if not started
      if (!gameStateRef.current.isPlaying && !gameOver && !gameWon) {
        balls[0].x = paddle.x + paddle.width / 2;
      }
    };

    const handlePointerDown = () => {
      if (!gameStateRef.current.isPlaying && !gameOver && !gameWon && lives > 0) {
        const { balls } = gameStateRef.current;
        const speed = 4; // Reduced to 4 for slower gameplay
        const angle = -Math.PI / 3 + (Math.random() * Math.PI / 3);
        balls[0].dx = Math.sin(angle) * speed;
        balls[0].dy = -Math.cos(angle) * speed;
        gameStateRef.current.isPlaying = true;
        setGameStarted(true);
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove);
    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('touchstart', handlePointerDown);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('touchstart', handlePointerDown);
      
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId);
      }
    };
  }, []); // Only run once on mount

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameStarted(false);
    setGameOver(false);
    setGameWon(false);
    
    // Reset game state
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const state = gameStateRef.current;
    state.balls[0].x = canvas.width / 2;
    state.balls[0].y = canvas.height - 50;
    state.balls[0].dx = 0;
    state.balls[0].dy = 0;
    state.isPlaying = false;
    state.currentLevel = 1;
    state.blocks = createLevel(1, canvas);
  };

  const handleNextLevel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const nextLevel = level + 1;
    setLevel(nextLevel);
    setGameWon(false);
    setGameStarted(false);
    
    // Reset game state for next level
    const state = gameStateRef.current;
    state.balls[0].x = canvas.width / 2;
    state.balls[0].y = canvas.height - 50;
    state.balls[0].dx = 0;
    state.balls[0].dy = 0;
    state.isPlaying = false;
    state.currentLevel = nextLevel;
    
    // Increase ball speed slightly with each level
    const speedBonus = Math.min(nextLevel * 0.2, 3);
    
    // Create new blocks for next level
    state.blocks = createLevel(nextLevel, canvas);
  };

  return (
    <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex flex-col items-center gap-6">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl">Block Break</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Are you a hiring manager bored of looking through portfolios?<br />Use this as a sign to take a little break. Stay a while 😎
        </p>
      </div>

      {/* Score and Lives */}
      <div className="flex items-center gap-6 sm:gap-8 text-white">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Level:</span>
          <span className="font-mono text-xl sm:text-2xl">{level}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Score:</span>
          <span className="font-mono text-xl sm:text-2xl">{score.toString().padStart(5, '0')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Lives:</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < lives ? 'bg-white' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ touchAction: 'none' }}
        />
        
        {/* Overlay messages */}
        {!gameStarted && !gameOver && !gameWon && lives > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-white text-sm sm:text-base">Click or tap to start</p>
            </div>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/80 backdrop-blur-sm px-8 py-6 rounded-lg text-center space-y-4">
              <h2 className="text-white text-2xl font-bold">Game Over</h2>
              <p className="text-gray-300">Final Score: {score}</p>
              <button
                onClick={handleRestart}
                className="bg-[#18a0fb] hover:bg-[#0d8ae6] text-white px-6 py-2 rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {gameWon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/80 backdrop-blur-sm px-8 py-6 rounded-lg text-center space-y-4">
              <h2 className="text-white text-2xl font-bold">You Won! 🎉</h2>
              <p className="text-gray-300">Final Score: {score}</p>
              <button
                onClick={handleNextLevel}
                className="bg-[#18a0fb] hover:bg-[#0d8ae6] text-white px-6 py-2 rounded-lg transition-colors"
              >
                Next Level
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-500 text-xs sm:text-sm max-w-md">
        <p>Use your mouse or finger to move the paddle. Break all blocks to win!</p>
      </div>
    </div>
  );
}