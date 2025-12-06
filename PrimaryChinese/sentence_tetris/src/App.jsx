import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Game Data
const levels = [
  {
    id: 1,
    sentence: '雖然今天下著大雨，但是他依然準時上學。',
    fragments: ['雖然', '今天下著大雨，', '但是', '他依然', '準時上學。'],
    type: '轉折複句',
    difficulty: 'Easy'
  },
  {
    id: 2,
    sentence: '與其在家無所事事，不如到圖書館看書。',
    fragments: ['與其', '在家無所事事，', '不如', '到圖書館看書。'],
    type: '選擇複句',
    difficulty: 'Easy'
  },
  {
    id: 3,
    sentence: '他不但學習成績優秀，而且樂於助人。',
    fragments: ['他不但', '學習成績優秀，', '而且', '樂於助人。'],
    type: '遞進複句',
    difficulty: 'Hard'
  }
]

// Sound effect placeholders
const playClickSound = () => {
  // Placeholder for click sound
  console.log('Click sound')
}

const playClearSound = () => {
  // Placeholder for clear sound
  console.log('Clear sound')
}

const playErrorSound = () => {
  // Placeholder for error sound
  console.log('Error sound')
}

// Color themes for each level
const levelColors = [
  'border-cyan-400 bg-cyan-400/20', // Level 1 - 轉折複句
  'border-pink-400 bg-pink-400/20', // Level 2 - 選擇複句
  'border-purple-400 bg-purple-400/20', // Level 3 - 遞進複句
  'border-yellow-400 bg-yellow-400/20',
  'border-green-400 bg-green-400/20',
  'border-blue-400 bg-blue-400/20'
]

// Block Component
const Block = ({ fragment, index, onDragStart, onDragEnd, isInConstruction, isWrong, x, y, isFalling, isPiled, blockId, levelId }) => {
  // Use level color - all blocks from same level have same color
  const colorClass = levelColors[(levelId - 1) % levelColors.length]
  const wrongClass = isWrong ? 'border-red-500 bg-red-500/30' : ''
  
  const blockContent = (
    <div
      className={`
        px-4 py-2 rounded-lg border-2 font-semibold text-white text-sm
        cursor-move select-none shadow-lg
        ${isWrong ? wrongClass : colorClass}
        ${isInConstruction ? 'opacity-100' : 'opacity-90'}
        transition-all duration-200
      `}
      style={{
        textShadow: '0 0 10px rgba(255,255,255,0.5)',
        boxShadow: isWrong 
          ? '0 0 20px rgba(239, 68, 68, 0.8)' 
          : '0 0 15px currentColor'
      }}
    >
      {fragment}
    </div>
  )

  if (isInConstruction) {
    return (
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={(e) => onDragStart(e, { fragment, index, id: blockId })}
        onDragEnd={(e) => onDragEnd(e, { fragment, index, id: blockId })}
        whileDrag={{ scale: 1.1, zIndex: 50 }}
        animate={isWrong ? {
          x: [0, -10, 10, -10, 10, 0],
          rotate: [0, -5, 5, -5, 5, 0]
        } : {}}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        {blockContent}
      </motion.div>
    )
  }

  // Falling or piled block
  const style = isPiled 
    ? { 
        position: 'absolute' as const, 
        left: `${x}%`, 
        bottom: `${y}px`,
        transform: 'translateX(-50%)' // Center the block on x position
      }
    : { 
        position: 'absolute' as const, 
        left: `${x}%`, 
        top: `${y}px`,
        transform: 'translateX(-50%)' // Center the block on x position
      }

  return (
    <motion.div
      key={blockId} // Add key to force re-render when position changes
      style={style}
      initial={isFalling ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      drag
      dragMomentum={false}
      onDragStart={(e) => onDragStart(e, { fragment, index, id: blockId })}
      onDragEnd={(e) => onDragEnd(e, { fragment, index, id: blockId })}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
    >
      {blockContent}
    </motion.div>
  )
}

// Main App Component
function App() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [constructionZone, setConstructionZone] = useState([])
  const [piledBlocks, setPiledBlocks] = useState([])
  const [fallingBlocks, setFallingBlocks] = useState([])
  const [combo, setCombo] = useState(0)
  const [isWrong, setIsWrong] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [usedFragments, setUsedFragments] = useState(new Set())
  
  const gameAreaRef = useRef(null)
  const constructionZoneRef = useRef(null)
  const spawnIntervalRef = useRef(null)
  const fallIntervalRef = useRef(null)
  const level = levels[currentLevel]
  
  const fallSpeed = level?.difficulty === 'Hard' ? 3000 : 5000
  const spawnRate = level?.difficulty === 'Hard' ? 2500 : 4000
  const GRID_HEIGHT = 600

  // Initialize construction zone
  useEffect(() => {
    if (level) {
      setConstructionZone(new Array(level.fragments.length).fill(null))
      setPiledBlocks([])
      setFallingBlocks([])
      setUsedFragments(new Set())
      setIsWrong(false)
      setCombo(0)
    }
  }, [currentLevel, level])

  // Continuous spawning of blocks (Tetris style) - Multiple levels at once
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const spawnRandomBlock = () => {
      // Randomly pick a level (all levels can spawn blocks)
      const randomLevel = levels[Math.floor(Math.random() * levels.length)]
      
      // Randomly pick a fragment from that level
      const randomIndex = Math.floor(Math.random() * randomLevel.fragments.length)
      const fragment = randomLevel.fragments[randomIndex]
      
      const xPosition = Math.random() * 80 + 10 // 10% to 90% of width
      
      const newBlock = {
        id: Date.now() + Math.random(),
        fragment,
        index: randomIndex,
        levelId: randomLevel.id, // Use the random level's ID for color
        x: xPosition,
        y: 0,
        isFalling: true
      }

      setFallingBlocks(prev => [...prev, newBlock])
    }

    // Spawn first block immediately
    spawnRandomBlock()
    
    // Then spawn at intervals (faster for more variety)
    spawnIntervalRef.current = setInterval(spawnRandomBlock, spawnRate)

    return () => {
      clearInterval(spawnIntervalRef.current)
    }
  }, [gameStarted, spawnRate, gameOver])

  // Continuous falling animation
  useEffect(() => {
    if (!gameStarted || !level || gameOver) {
      if (fallIntervalRef.current) {
        clearInterval(fallIntervalRef.current)
        fallIntervalRef.current = null
      }
      return
    }
    
    // Start the falling animation immediately
    fallIntervalRef.current = setInterval(() => {
      setFallingBlocks(prevFalling => {
        if (prevFalling.length === 0) return prevFalling
        
        const gameAreaRect = gameAreaRef.current?.getBoundingClientRect()
        if (!gameAreaRect || gameAreaRect.height <= 100) {
          // If game area not ready, return current state but don't update
          return prevFalling
        }
        
        const gameAreaHeight = gameAreaRect.height
        const blocksToPile = []
        
        // Calculate the stop line - bottom of game area (where purple border is)
        // Falling blocks use 'top' positioning, so we need to stop before reaching the bottom
        const BLOCK_HEIGHT = 50 // Approximate visible block height
        const stopLine = gameAreaHeight - BLOCK_HEIGHT // Stop when block would be at bottom
        
        const updatedFalling = prevFalling.map(block => {
          const newY = block.y + 3 // Move down 3px per frame
          
          // Check if reached the stop line (bottom of game area)
          if (newY >= stopLine) {
            // Mark for piling - stop at the bottom line
            blocksToPile.push(block)
            return null // Remove from falling
          }
          
          // Return updated block with new y position
          return { ...block, y: newY }
        }).filter(Boolean) // Remove nulls

        // Move blocks to piled if any reached bottom
        if (blocksToPile.length > 0) {
          setPiledBlocks(prevPiled => {
            const newPiled = [...prevPiled]
            
            blocksToPile.forEach(block => {
              // Find blocks in the same column (similar x position, within 8% width)
              const sameColumnBlocks = newPiled.filter(p => Math.abs(p.x - block.x) < 8)
              
              // Piled blocks use 'bottom' positioning
              // y=0 means at the bottom, higher y means higher up
              // If no blocks in this column, start at 0 (bottom)
              // Otherwise, stack on top of the highest block
              const maxBottomY = sameColumnBlocks.length > 0 
                ? Math.max(...sameColumnBlocks.map(p => p.y)) 
                : 0
              
              // Block height with spacing
              const STACK_HEIGHT = 60
              
              // Calculate new y position from bottom
              const newY = maxBottomY + STACK_HEIGHT
              
              newPiled.push({
                ...block,
                levelId: block.levelId || (level?.id || 1),
                y: newY, // Distance from bottom (y=0 is bottom, increases upward)
                isFalling: false,
                isPiled: true
              })
            })
            
            // Check game over - if blocks reach top
            // Only check if we have a valid game area height and blocks are actually stacked
            if (newPiled.length > 0 && gameAreaHeight > 200) {
              const maxBottomY = Math.max(...newPiled.map(p => p.y))
              const CONSTRUCTION_ZONE_HEIGHT = 112
              // maxBottomY is distance from bottom, so check if blocks reach near the top
              // Only trigger game over if blocks are stacked significantly high (at least 200px from bottom)
              const topThreshold = gameAreaHeight - CONSTRUCTION_ZONE_HEIGHT - 100
              if (maxBottomY > topThreshold && maxBottomY > 200) {
                setGameOver(true)
                clearInterval(spawnIntervalRef.current)
                clearInterval(fallIntervalRef.current)
              }
            }
            
            return newPiled
          })
        }

        return updatedFalling
      })
    }, 50) // Update every 50ms

    return () => {
      clearInterval(fallIntervalRef.current)
    }
  }, [gameStarted, level, gameOver])

  // Handle drag start
  const handleDragStart = useCallback((event, block) => {
    playClickSound()
  }, [])

  // Handle drag end
  const handleDragEnd = useCallback((event, block) => {
    if (!constructionZoneRef.current) return

    const rect = constructionZoneRef.current.getBoundingClientRect()
    const x = event.clientX
    const y = event.clientY

    // Check if dropped in construction zone
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      const zoneWidth = rect.width
      const slotWidth = zoneWidth / constructionZone.length
      const slotIndex = Math.floor((x - rect.left) / slotWidth)
      const clampedIndex = Math.max(0, Math.min(slotIndex, constructionZone.length - 1))

      setConstructionZone(prev => {
        const newZone = [...prev]
        
        // Remove from old position if exists
        const oldIndex = newZone.findIndex(slot => slot && slot.fragment === block.fragment && slot.index === block.index)
        if (oldIndex !== -1) {
          newZone[oldIndex] = null
        }

        // Place in new position
        if (newZone[clampedIndex] === null) {
          newZone[clampedIndex] = {
            ...block,
            levelId: block.levelId || level?.id // Ensure levelId is preserved
          }
        } else {
          // Swap if slot is occupied
          const temp = newZone[clampedIndex]
          newZone[clampedIndex] = {
            ...block,
            levelId: block.levelId || level?.id
          }
          if (oldIndex !== -1) {
            newZone[oldIndex] = temp
          }
        }

        return newZone
      })

      // Remove from falling or piled blocks (match by id if available, otherwise by fragment and index)
      setFallingBlocks(prev => prev.filter(b => {
        if (block.id && b.id) return b.id !== block.id
        return !(b.fragment === block.fragment && b.index === block.index)
      }))
      setPiledBlocks(prev => prev.filter(b => {
        if (block.id && b.id) return b.id !== block.id
        return !(b.fragment === block.fragment && b.index === block.index)
      }))
    }
  }, [constructionZone.length])

  // Handle submit
  const handleSubmit = () => {
    if (!level) return

    const submitted = constructionZone.map(slot => slot?.fragment || '').join('')
    const correct = level.sentence

    if (submitted === correct) {
      // Correct! Clear the sentence
      playClearSound()
      const comboBonus = combo * 100
      const levelBonus = (currentLevel + 1) * 500
      const totalPoints = 1000 + comboBonus + levelBonus
      
      setScore(prev => prev + totalPoints)
      setCombo(prev => prev + 1)

      // Remove blocks from construction zone (they're cleared)
      setConstructionZone(new Array(level.fragments.length).fill(null))

      // Check if all levels completed
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(prev => prev + 1)
          setGameStarted(false)
        } else {
          // All levels completed
          setGameOver(true)
        }
      }, 500)
    } else {
      // Wrong! Return blocks to piled area
      playErrorSound()
      setIsWrong(true)
      setCombo(0)
      
      // Shake and return blocks to piled area
      setTimeout(() => {
        const blocksToReturn = constructionZone.filter(slot => slot !== null)
        
        if (blocksToReturn.length > 0) {
          setPiledBlocks(prev => {
            const newPiled = [...prev]
            const gameAreaHeight = gameAreaRef.current?.clientHeight || window.innerHeight - 200
            const CONSTRUCTION_ZONE_HEIGHT = 112
            
            blocksToReturn.forEach((block, i) => {
              // Find blocks in the same column (within 8% width)
              const sameColumnBlocks = newPiled.filter(p => Math.abs(p.x - block.x) < 8)
              const maxBottomY = sameColumnBlocks.length > 0 
                ? Math.max(...sameColumnBlocks.map(p => p.y)) 
                : 0
              
              // Use original x position or random if not available
              const xPos = block.x || Math.random() * 80 + 10
              const blockHeight = 60
              
              newPiled.push({
                ...block,
                levelId: block.levelId || (level?.id || 1), // Ensure levelId is preserved
                x: xPos,
                y: maxBottomY + blockHeight, // Stack on top
                isFalling: false,
                isPiled: true
              })
            })
            
            return newPiled
          })
        }
        
        setConstructionZone(new Array(level.fragments.length).fill(null))
        setIsWrong(false)
      }, 1000)
    }
  }

  // Start game
  const handleStart = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setCurrentLevel(0)
  }

  // Reset game
  const handleReset = () => {
    setGameStarted(false)
    setGameOver(false)
    setScore(0)
    setCurrentLevel(0)
    setConstructionZone([])
    setPiledBlocks([])
    setFallingBlocks([])
    setCombo(0)
    setIsWrong(false)
    setUsedFragments(new Set())
    clearInterval(spawnIntervalRef.current)
    clearInterval(fallIntervalRef.current)
  }

  if (!gameStarted && !gameOver) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 p-8 bg-black/50 rounded-2xl border-2 border-purple-500"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 mb-4">
            重組句子俄羅斯方塊
          </h1>
          <p className="text-white text-xl mb-8">中一中文學習遊戲</p>
          <div className="text-white text-left mb-6 space-y-2">
            <p>• 句子片段會持續從頂部落下</p>
            <p>• 拖動片段到底部組合區</p>
            <p>• 按正確順序排列後點擊「發射」</p>
            <p>• 如果片段堆積到頂部，遊戲結束！</p>
          </div>
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-xl rounded-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/50"
          >
            開始遊戲
          </button>
        </motion.div>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 p-8 bg-black/50 rounded-2xl border-2 border-red-500"
        >
          <h1 className="text-4xl font-bold text-red-400 mb-4">遊戲結束</h1>
          <p className="text-white text-2xl mb-4">最終分數: {score.toLocaleString()}</p>
          <p className="text-white text-xl mb-8">
            {currentLevel >= levels.length ? '恭喜完成所有關卡！' : '方塊堆積過高！'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:scale-105 transition-transform"
            >
              重新開始
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden relative">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm border-b-2 border-purple-500 p-4">
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-sm text-gray-400">分數</div>
              <div className="text-2xl font-bold text-cyan-400">{score.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">關卡</div>
              <div className="text-2xl font-bold text-pink-400">{currentLevel + 1} / {levels.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">類型</div>
              <div className="text-lg font-semibold text-purple-400">{level?.type}</div>
            </div>
            {combo > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-yellow-400 font-bold text-xl"
              >
                COMBO x{combo}!
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Game Area - Tetris Grid */}
      <div 
        ref={gameAreaRef}
        className="absolute top-24 bottom-28 left-0 right-0 overflow-visible relative"
      >
        {/* Piled Blocks */}
        <AnimatePresence>
          {piledBlocks.map((block) => (
            <Block
              key={`piled-${block.id}`}
              fragment={block.fragment}
              index={block.index}
              blockId={block.id}
              levelId={block.levelId || level?.id}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              isInConstruction={false}
              isWrong={false}
              x={block.x}
              y={block.y}
              isFalling={false}
              isPiled={true}
            />
          ))}
        </AnimatePresence>

        {/* Falling Blocks */}
        <AnimatePresence>
          {fallingBlocks.map((block) => (
            <Block
              key={`falling-${block.id}`}
              fragment={block.fragment}
              index={block.index}
              blockId={block.id}
              levelId={block.levelId || level?.id}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              isInConstruction={false}
              isWrong={false}
              x={block.x}
              y={block.y}
              isFalling={true}
              isPiled={false}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Construction Zone */}
      <div 
        ref={constructionZoneRef}
        className="absolute bottom-0 left-0 right-0 h-28 bg-black/60 backdrop-blur-sm border-t-2 border-purple-500 p-4 z-20"
      >
        <div className="text-white text-sm mb-2 text-center">句子組合區</div>
        <div className="flex gap-2 justify-center items-center h-16">
          {constructionZone.map((slot, index) => (
            <motion.div
              key={index}
              className="flex-1 max-w-[150px] h-full flex items-center justify-center border-2 border-dashed border-purple-400/50 rounded-lg bg-purple-900/20"
              whileHover={{ borderColor: 'rgba(168, 85, 247, 0.8)' }}
            >
              {slot ? (
                <Block
                  fragment={slot.fragment}
                  index={slot.index}
                  blockId={slot.id}
                  levelId={slot.levelId || level?.id}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  isInConstruction={true}
                  isWrong={isWrong}
                />
              ) : (
                <div className="text-purple-400/30 text-xs">位置 {index + 1}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="absolute bottom-32 right-4 z-30">
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={constructionZone.some(slot => slot === null)}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          發射/消除
        </motion.button>
      </div>
    </div>
  )
}

export default App
