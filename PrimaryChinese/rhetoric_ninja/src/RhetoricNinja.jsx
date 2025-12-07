import { useEffect, useRef, useState, useCallback } from 'react'

// Scroll class for physics and rendering
class Scroll {
  constructor(x, y, text, isMetaphor, isBomb = false) {
    this.x = x
    this.y = y
    this.text = text
    this.isMetaphor = isMetaphor
    this.isBomb = isBomb
    this.velocityX = (Math.random() - 0.5) * 0.12 // Random horizontal velocity (5x slower)
    this.velocityY = -4.5 - Math.random() * 1.5 // Upward velocity to bounce up to at least half screen height
    this.gravity = 0.016 // 5x slower gravity
    this.width = 120
    this.height = 80
    this.sliced = false
    this.splitParts = [] // For visual effect when sliced
    this.opacity = 1
  }

  update() {
    if (this.sliced) {
      // Handle split parts
      this.splitParts.forEach(part => {
        part.velocityY += this.gravity
        part.y += part.velocityY
        part.x += part.velocityX
        part.opacity -= 0.02
      })
      return
    }

    this.velocityY += this.gravity
    this.x += this.velocityX
    this.y += this.velocityY
  }

  getBounds() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    }
  }

  slice() {
    if (this.sliced) return false
    this.sliced = true
    
    // Create split parts for visual effect
    this.splitParts = [
      {
        x: this.x,
        y: this.y,
        velocityX: -0.1,
        velocityY: -0.1,
        opacity: 1
      },
      {
        x: this.x,
        y: this.y,
        velocityX: 0.1,
        velocityY: -0.1,
        opacity: 1
      }
    ]
    return true
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight + 100 || this.x < -100 || this.x > window.innerWidth + 100
  }
}

// Blade trail point
class TrailPoint {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.life = 1.0
  }

  update() {
    this.life -= 0.05
  }

  isDead() {
    return this.life <= 0
  }
}

const RhetoricNinja = () => {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const scrollsRef = useRef([])
  const trailRef = useRef([])
  const lastMousePosRef = useRef({ x: 0, y: 0 })
  const isMouseDownRef = useRef(false)
  const spawnTimerRef = useRef(null)

  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [flashEffect, setFlashEffect] = useState(false)

  // Rhetorical device data
  const metaphors = [
    '月亮像個大玉盤',
    '時間是金錢',
    '她的笑容如陽光般燦爛',
    '知識是海洋',
    '生活是一場旅程',
    '書本是知識的鑰匙',
    '友誼是一座橋樑',
    '夢想是翅膀',
    '記憶是時光的河流',
    '希望是黑暗中的明燈'
  ]

  const regularSentences = [
    '今天天氣很好',
    '我喜歡讀書',
    '學校在市中心',
    '他正在做作業',
    '我們一起去公園',
    '這本書很有趣',
    '她會彈鋼琴',
    '明天要考試',
    '我們吃午飯吧',
    '他跑得很快'
  ]

  const faultySentences = [
    '月亮很圓很圓',
    '我喜歡我喜歡',
    '今天今天很好',
    '書本書本知識',
    '跑步跑步很快'
  ]

  const spawnScroll = useCallback(() => {
    if (gameOver || isPaused) return

    const canvas = canvasRef.current
    if (!canvas) return

    const spawnX = Math.random() * canvas.width
    const spawnY = canvas.height - 50 // Spawn from bottom

    // 70% chance for metaphor, 20% for regular sentence, 10% for bomb
    const rand = Math.random()
    let text, isMetaphor, isBomb

    if (rand < 0.7) {
      // Metaphor (target)
      text = metaphors[Math.floor(Math.random() * metaphors.length)]
      isMetaphor = true
      isBomb = false
    } else if (rand < 0.9) {
      // Regular sentence (neutral)
      text = regularSentences[Math.floor(Math.random() * regularSentences.length)]
      isMetaphor = false
      isBomb = false
    } else {
      // Bomb (faulty sentence)
      text = faultySentences[Math.floor(Math.random() * faultySentences.length)]
      isMetaphor = false
      isBomb = true
    }

    scrollsRef.current.push(new Scroll(spawnX, spawnY, text, isMetaphor, isBomb))
  }, [gameOver, isPaused, metaphors, regularSentences, faultySentences])

  // Line-segment intersection detection
  const lineIntersectsRect = (x1, y1, x2, y2, rect) => {
    // Check if line segment intersects with rectangle
    const { x, y, width, height } = rect
    
    // Check if line segment intersects any of the rectangle's edges
    const edges = [
      { x1: x, y1: y, x2: x + width, y2: y }, // top
      { x1: x + width, y1: y, x2: x + width, y2: y + height }, // right
      { x1: x + width, y1: y + height, x2: x, y2: y + height }, // bottom
      { x1: x, y1: y + height, x2: x, y2: y } // left
    ]

    for (const edge of edges) {
      if (lineIntersectsLine(x1, y1, x2, y2, edge.x1, edge.y1, edge.x2, edge.y2)) {
        return true
      }
    }

    // Check if line is completely inside rectangle
    if (x1 >= x && x1 <= x + width && y1 >= y && y1 <= y + height &&
        x2 >= x && x2 <= x + width && y2 >= y && y2 <= y + height) {
      return true
    }

    return false
  }

  const lineIntersectsLine = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if (Math.abs(denom) < 0.0001) return false

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom

    return t >= 0 && t <= 1 && u >= 0 && u <= 1
  }

  const handleMouseMove = useCallback((e) => {
    if (gameOver || isPaused) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (isMouseDownRef.current) {
      // Add trail point
      trailRef.current.push(new TrailPoint(x, y))

      // Check collision with scrolls
      const lastPos = lastMousePosRef.current
      scrollsRef.current.forEach(scroll => {
        if (!scroll.sliced) {
          const bounds = scroll.getBounds()
          if (lineIntersectsRect(lastPos.x, lastPos.y, x, y, bounds)) {
            if (scroll.slice()) {
              if (scroll.isBomb) {
                // Hit a bomb - lose life
                setLives(prev => {
                  const newLives = prev - 1
                  if (newLives <= 0) {
                    setGameOver(true)
                  }
                  return newLives
                })
                setFlashEffect(true)
                setTimeout(() => setFlashEffect(false), 200)
              } else if (scroll.isMetaphor) {
                // Hit a metaphor - score!
                setScore(prev => prev + 10)
              }
            }
          }
        }
      })
    }

    lastMousePosRef.current = { x, y }
  }, [gameOver, isPaused])

  const handleMouseDown = useCallback((e) => {
    if (gameOver || isPaused) return
    isMouseDownRef.current = true
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    lastMousePosRef.current = { x, y }
    trailRef.current.push(new TrailPoint(x, y))
  }, [gameOver, isPaused])

  const handleMouseUp = useCallback(() => {
    isMouseDownRef.current = false
  }, [])

  const handleTouchMove = useCallback((e) => {
    e.preventDefault()
    if (gameOver || isPaused) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    if (isMouseDownRef.current) {
      trailRef.current.push(new TrailPoint(x, y))

      const lastPos = lastMousePosRef.current
      scrollsRef.current.forEach(scroll => {
        if (!scroll.sliced) {
          const bounds = scroll.getBounds()
          if (lineIntersectsRect(lastPos.x, lastPos.y, x, y, bounds)) {
            if (scroll.slice()) {
              if (scroll.isBomb) {
                setLives(prev => {
                  const newLives = prev - 1
                  if (newLives <= 0) {
                    setGameOver(true)
                  }
                  return newLives
                })
                setFlashEffect(true)
                setTimeout(() => setFlashEffect(false), 200)
              } else if (scroll.isMetaphor) {
                setScore(prev => prev + 10)
              }
            }
          }
        }
      })
    }

    lastMousePosRef.current = { x, y }
  }, [gameOver, isPaused])

  const handleTouchStart = useCallback((e) => {
    e.preventDefault()
    if (gameOver || isPaused) return
    isMouseDownRef.current = true
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    
    lastMousePosRef.current = { x, y }
    trailRef.current.push(new TrailPoint(x, y))
  }, [gameOver, isPaused])

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault()
    isMouseDownRef.current = false
  }, [])

  const drawScroll = (ctx, scroll) => {
    if (scroll.sliced && scroll.splitParts.length > 0) {
      // Draw split parts
      scroll.splitParts.forEach(part => {
        ctx.save()
        ctx.globalAlpha = part.opacity
        ctx.translate(part.x, part.y)
        
        // Draw half scroll
        ctx.fillStyle = scroll.isBomb ? '#ff4444' : (scroll.isMetaphor ? '#4CAF50' : '#FFA500')
        ctx.fillRect(-scroll.width / 4, -scroll.height / 2, scroll.width / 2, scroll.height)
        
        ctx.strokeStyle = '#8B4513'
        ctx.lineWidth = 2
        ctx.strokeRect(-scroll.width / 4, -scroll.height / 2, scroll.width / 2, scroll.height)
        
        ctx.restore()
      })
      return
    }

    if (scroll.sliced) return

    ctx.save()
    ctx.translate(scroll.x, scroll.y)

    // Draw scroll background
    const gradient = ctx.createLinearGradient(-scroll.width / 2, 0, scroll.width / 2, 0)
    if (scroll.isBomb) {
      gradient.addColorStop(0, '#ff6666')
      gradient.addColorStop(1, '#ff4444')
    } else if (scroll.isMetaphor) {
      gradient.addColorStop(0, '#66ff66')
      gradient.addColorStop(1, '#4CAF50')
    } else {
      gradient.addColorStop(0, '#ffcc99')
      gradient.addColorStop(1, '#FFA500')
    }
    
    ctx.fillStyle = gradient
    ctx.fillRect(-scroll.width / 2, -scroll.height / 2, scroll.width, scroll.height)

    // Draw scroll border
    ctx.strokeStyle = '#8B4513'
    ctx.lineWidth = 3
    ctx.strokeRect(-scroll.width / 2, -scroll.height / 2, scroll.width, scroll.height)

    // Draw scroll ends (rolled paper effect)
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(-scroll.width / 2 - 5, -scroll.height / 2, 5, scroll.height)
    ctx.fillRect(scroll.width / 2, -scroll.height / 2, 5, scroll.height)

    // Draw text
    ctx.fillStyle = '#000'
    ctx.font = 'bold 14px "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Wrap text if too long
    const maxWidth = scroll.width - 20
    const words = scroll.text.split('')
    let line = ''
    let y = -scroll.height / 2 + 15
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i]
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, 0, y)
        line = words[i]
        y += 18
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, 0, y)

    ctx.restore()
  }

  const drawTrail = (ctx) => {
    if (trailRef.current.length < 2) return

    ctx.save()
    ctx.strokeStyle = '#ffff00'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    for (let i = 0; i < trailRef.current.length - 1; i++) {
      const point = trailRef.current[i]
      const nextPoint = trailRef.current[i + 1]
      
      ctx.globalAlpha = point.life
      ctx.lineWidth = 8 * point.life
      ctx.beginPath()
      ctx.moveTo(point.x, point.y)
      ctx.lineTo(nextPoint.x, nextPoint.y)
      ctx.stroke()

      // Add glow effect
      ctx.shadowBlur = 15
      ctx.shadowColor = '#ffff00'
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    ctx.restore()
  }

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    bgGradient.addColorStop(0, '#87CEEB')
    bgGradient.addColorStop(1, '#E0F6FF')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (!isPaused && !gameOver) {
      // Update scrolls
      scrollsRef.current.forEach(scroll => scroll.update())

      // Remove off-screen scrolls
      scrollsRef.current = scrollsRef.current.filter(scroll => {
        if (scroll.sliced) {
          const allPartsDead = scroll.splitParts.every(part => part.opacity <= 0)
          return !allPartsDead
        }
        return !scroll.isOffScreen(canvas.height)
      })

      // Update trail
      trailRef.current.forEach(point => point.update())
      trailRef.current = trailRef.current.filter(point => !point.isDead())
    }

    // Draw trail
    drawTrail(ctx)

    // Draw scrolls
    scrollsRef.current.forEach(scroll => drawScroll(ctx, scroll))

    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [isPaused, gameOver])

  const resetGame = useCallback(() => {
    // Clear existing spawn timer
    if (spawnTimerRef.current) {
      clearInterval(spawnTimerRef.current)
      spawnTimerRef.current = null
    }

    // Reset game state
    setScore(0)
    setLives(3)
    setGameOver(false)
    setIsPaused(false)
    setFlashEffect(false)
    
    // Clear game objects
    scrollsRef.current = []
    trailRef.current = []
    isMouseDownRef.current = false
    lastMousePosRef.current = { x: 0, y: 0 }

    // Start spawning
    spawnTimerRef.current = setInterval(spawnScroll, 1500)
  }, [spawnScroll])

  const startGame = () => {
    resetGame()
  }

  const togglePause = () => {
    setIsPaused(prev => !prev)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false })

    // Start game loop
    gameLoop()

    // Start spawning
    spawnTimerRef.current = setInterval(spawnScroll, 1500)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current)
      }
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleTouchMove, handleTouchStart, handleTouchEnd, gameLoop, spawnScroll])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Flash effect overlay */}
      {flashEffect && (
        <div className="absolute inset-0 bg-white opacity-80 z-50 pointer-events-none animate-pulse" />
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{ touchAction: 'none' }}
      />

      {/* Game Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">修辭忍者</h1>
        </div>
      </div>

      {/* Instructions Panel - Left Side */}
      <div className="absolute top-20 left-4 z-10">
        <div className="bg-black bg-opacity-70 text-white px-6 py-4 rounded-lg max-w-xs shadow-lg">
          <h2 className="text-xl font-bold mb-3 text-yellow-400">遊戲說明</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>切開<strong className="text-green-400">綠色</strong>卷軸（比喻）得分</span>
            </div>
            <div className="flex items-start">
              <span className="text-orange-400 mr-2">○</span>
              <span><strong className="text-orange-400">橙色</strong>卷軸（普通句子）無影響</span>
            </div>
            <div className="flex items-start">
              <span className="text-red-400 mr-2">✗</span>
              <span>避開<strong className="text-red-400">紅色</strong>炸彈（錯誤句子）</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-600">
              <p className="text-xs text-gray-300">用滑鼠或手指劃過螢幕來切開卷軸</p>
            </div>
          </div>
        </div>
      </div>

      {/* Score and Lives - Top Right */}
      <div className="absolute top-20 right-4 z-10">
        <div className="bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg">
          <div className="text-lg font-bold">分數: {score}</div>
          <div className="text-lg font-bold">生命: {'❤️'.repeat(lives)}</div>
        </div>
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md">
            <h2 className="text-4xl font-bold mb-4 text-red-600">遊戲結束!</h2>
            <p className="text-2xl mb-6">最終分數: {score}</p>
            <button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors"
            >
              重新開始
            </button>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      {!gameOver && (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={resetGame}
            className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white px-4 py-2 rounded-lg transition-colors font-bold"
            title="重設遊戲"
          >
            重設
          </button>
          <button
            onClick={togglePause}
            className="bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            {isPaused ? '繼續' : '暫停'}
          </button>
        </div>
      )}

    </div>
  )
}

export default RhetoricNinja

