import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Enemy from './components/Enemy';
import DefenseButtons from './components/DefenseButtons';
import GameOverModal from './components/GameOverModal';
import { getRandomDevice, deviceTypes } from './data/rhetoricalDevices';
import './App.css';

function App() {
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const enemyIdRef = useRef(0);
  const baseX = 50; // Base position (left side)
  const levelUpScoreRef = useRef(0); // Track score when level up

  // Calculate enemy speed based on level
  const getEnemySpeed = useCallback(() => {
    const baseSpeed = 0.5; // pixels per frame (increased from 0.3)
    const speedPerLevel = 0.3; // Speed increase per level
    return baseSpeed + (level - 1) * speedPerLevel;
  }, [level]);

  // Check for level up
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const pointsNeededForNextLevel = 50; // Fixed 50 points per level
    const currentLevelScore = levelUpScoreRef.current;
    const nextLevelThreshold = currentLevelScore + pointsNeededForNextLevel;
    
    if (score >= nextLevelThreshold) {
      setLevel(prev => prev + 1);
      levelUpScoreRef.current = score;
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
  }, [score, level, gameStarted, gameOver]);

  // Spawn new enemy
  const spawnEnemy = useCallback(() => {
    const device = getRandomDevice();
    const deviceType = deviceTypes.find(dt => dt.type === device.type);
    const speed = getEnemySpeed();
    
    // Generate vertical position avoiding overlap with existing enemies
    const gameAreaHeight = window.innerHeight - 120;
    const enemyHeight = 80; // Enemy visual height (approximate)
    const enemyBuffer = 40; // Buffer zone around enemy
    const totalEnemySpace = enemyHeight + enemyBuffer * 2; // Total space needed per enemy
    const minTop = 100; // Top padding (below header)
    const maxTop = gameAreaHeight - totalEnemySpace - 20; // Bottom padding
    
    // Use fixed lanes - calculate how many lanes fit
    const availableHeight = maxTop - minTop;
    const numLanes = Math.max(3, Math.floor(availableHeight / totalEnemySpace)); // At least 3 lanes
    const laneSpacing = availableHeight / numLanes;
    
    // Get current enemies' positions (synchronously)
    setEnemies(prev => {
      const activeEnemies = prev.filter(e => !e.destroyed && e.position > window.innerWidth - 400);
      
      // Find available lanes
      const availableLanes = [];
      for (let i = 0; i < numLanes; i++) {
        const laneCenter = minTop + i * laneSpacing + laneSpacing / 2;
        const laneTop = laneCenter - totalEnemySpace / 2;
        const laneBottom = laneCenter + totalEnemySpace / 2;
        
        // Check if this lane overlaps with any existing enemy
        const hasOverlap = activeEnemies.some(enemy => {
          const enemyTop = enemy.top - totalEnemySpace / 2;
          const enemyBottom = enemy.top + totalEnemySpace / 2;
          
          // Check if lanes overlap
          return !(laneBottom <= enemyTop || laneTop >= enemyBottom);
        });
        
        if (!hasOverlap) {
          availableLanes.push(i);
        }
      }
      
      // Choose a lane (prefer available, otherwise random)
      let chosenLane;
      if (availableLanes.length > 0) {
        chosenLane = availableLanes[Math.floor(Math.random() * availableLanes.length)];
      } else {
        // If all lanes occupied, choose the lane with the furthest enemy
        const laneEnemyCounts = Array(numLanes).fill(0).map((_, i) => {
          const laneCenter = minTop + i * laneSpacing + laneSpacing / 2;
          return activeEnemies.filter(e => {
            const dist = Math.abs(e.top - laneCenter);
            return dist < laneSpacing / 2;
          }).length;
        });
        const minCount = Math.min(...laneEnemyCounts);
        const leastOccupiedLanes = laneEnemyCounts
          .map((count, i) => count === minCount ? i : -1)
          .filter(i => i !== -1);
        chosenLane = leastOccupiedLanes[Math.floor(Math.random() * leastOccupiedLanes.length)];
      }
      
      const laneCenter = minTop + chosenLane * laneSpacing + laneSpacing / 2;
      const verticalPosition = laneCenter;

      const newEnemy = {
        id: enemyIdRef.current++,
        sentence: device.sentence,
        type: device.type,
        chinese: device.chinese,
        color: deviceType.color,
        speed: speed,
        position: window.innerWidth + 100,
        top: Math.max(minTop + totalEnemySpace / 2, Math.min(verticalPosition, maxTop + totalEnemySpace / 2)),
      };

      return [...prev, newEnemy];
    });
  }, [getEnemySpeed]);

  // Update enemy positions
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setEnemies(prev => {
        return prev.map(enemy => {
          const newPosition = enemy.position - enemy.speed;
          
          // Check if enemy reached base
          if (newPosition <= baseX && !enemy.destroyed) {
            setGameOver(true);
            return { ...enemy, destroyed: true };
          }
          
          return { ...enemy, position: newPosition };
        }).filter(enemy => enemy.position > -200 && !enemy.destroyed);
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, baseX]);

  // Spawn enemies periodically
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    // Spawn interval decreases with level
    const baseInterval = 2000;
    const intervalDecrease = Math.min((level - 1) * 150, 1200); // Max 1200ms decrease
    const spawnInterval = baseInterval - intervalDecrease;

    const timer = setInterval(() => {
      spawnEnemy();
    }, spawnInterval);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, level, spawnEnemy]);

  // Handle button click
  const handleButtonClick = useCallback((clickedType) => {
    if (gameOver) return;

    // Find the closest enemy with matching type
    const matchingEnemy = enemies
      .filter(e => e.type === clickedType && !e.destroyed)
      .sort((a, b) => a.position - b.position)[0];

    if (matchingEnemy) {
      // Destroy the enemy
      setEnemies(prev =>
        prev.map(e =>
          e.id === matchingEnemy.id ? { ...e, destroyed: true } : e
        )
      );
      setScore(prev => prev + 10);
    } else {
      // Wrong answer - small penalty
      setScore(prev => Math.max(0, prev - 5));
    }
  }, [enemies, gameOver]);

  // Handle enemy destroy animation
  const handleEnemyDestroy = useCallback((id) => {
    setEnemies(prev =>
      prev.map(e =>
        e.id === id ? { ...e, destroyed: true } : e
      )
    );
  }, []);

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setShowLevelUp(false);
    setEnemies([]);
    enemyIdRef.current = 0;
    levelUpScoreRef.current = 0;
    spawnEnemy();
  };

  // Restart game
  const restartGame = () => {
    startGame();
  };

  return (
    <div className="app">
      {/* Chinese Ink Wash Painting Background */}
      <div className="ink-wash-background">
        <div className="ink-wash-layer layer-1"></div>
        <div className="ink-wash-layer layer-2"></div>
        <div className="ink-wash-layer layer-3"></div>
      </div>

      {/* Game UI */}
      <div className="game-container">
        {/* Header */}
        <div className="game-header">
          <h1 className="game-title">修辭防衛戰</h1>
          <div className="header-info">
            <div className="level-display">
              <span className="level-label">等級：</span>
              <span className="level-value">{level}</span>
            </div>
            <div className="score-display">
              <span className="score-label">分數：</span>
              <span className="score-value">{score}</span>
            </div>
          </div>
        </div>

        {/* Level Up Message */}
        {showLevelUp && (
          <motion.div
            className="level-up-message"
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="level-up-content">
              <span className="level-up-icon">🎉</span>
              <span className="level-up-text">進級！等級 {level}</span>
            </div>
          </motion.div>
        )}

        {/* Base Line */}
        <div className="base-line" style={{ left: `${baseX}px` }}></div>

        {/* Game Area */}
        <div className="game-area">
          <AnimatePresence>
            {enemies.map(enemy => (
              !enemy.destroyed && (
                <Enemy
                  key={enemy.id}
                  enemy={enemy}
                  position={enemy.position}
                  top={enemy.top}
                  onDestroy={handleEnemyDestroy}
                />
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Defense Buttons */}
        <DefenseButtons
          deviceTypes={deviceTypes}
          onButtonClick={handleButtonClick}
          disabled={gameOver || !gameStarted}
        />

        {/* Start Screen */}
        {!gameStarted && (
          <div className="start-screen">
            <motion.div
              className="start-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="start-title">修辭防衛戰</h2>
              <p className="start-description">
                點擊正確的修辭手法按鈕來擊敗敵人！<br />
                如果敵人到達左側基地，遊戲就會結束。
              </p>
              <motion.button
                className="start-button"
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                開始遊戲
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Game Over Modal */}
        {gameOver && (
          <GameOverModal score={score} level={level} onRestart={restartGame} />
        )}
      </div>
    </div>
  );
}

export default App;
