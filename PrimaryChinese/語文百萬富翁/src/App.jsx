import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, PerspectiveCamera } from '@react-three/drei'
import GameScene from './components/GameScene'
import QuestionPanel from './components/QuestionPanel'
import PrizeLadder from './components/PrizeLadder'
import Lifelines from './components/Lifelines'
import GameOverModal from './components/GameOverModal'
import { questions } from './data/questions'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('menu') // menu, playing, gameOver
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [usedLifelines, setUsedLifelines] = useState({
    fiftyFifty: false,
    phoneAFriend: false,
    askAudience: false
  })
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameOverReason, setGameOverReason] = useState('')

  const prizeLevels = [
    { level: 1, amount: 100, safe: false },
    { level: 2, amount: 200, safe: false },
    { level: 3, amount: 300, safe: false },
    { level: 4, amount: 500, safe: true },
    { level: 5, amount: 1000, safe: false },
    { level: 6, amount: 2000, safe: false },
    { level: 7, amount: 4000, safe: false },
    { level: 8, amount: 8000, safe: true },
    { level: 9, amount: 16000, safe: false },
    { level: 10, amount: 32000, safe: false },
    { level: 11, amount: 64000, safe: false },
    { level: 12, amount: 125000, safe: true },
    { level: 13, amount: 250000, safe: false },
    { level: 14, amount: 500000, safe: false },
    { level: 15, amount: 1000000, safe: false }
  ]

  const startGame = () => {
    setGameState('playing')
    setCurrentQuestion(0)
    setScore(0)
    setUsedLifelines({
      fiftyFifty: false,
      phoneAFriend: false,
      askAudience: false
    })
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return

    const question = questions[currentQuestion]
    const correct = selectedAnswer === question.correct

    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const newScore = prizeLevels[currentQuestion].amount
      setScore(newScore)
      
      setTimeout(() => {
        if (currentQuestion === questions.length - 1) {
          // Won the game!
          setGameState('gameOver')
          setGameOverReason('win')
        } else {
          // Move to next question
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setShowResult(false)
        }
      }, 3000)
    } else {
      // Wrong answer - game over
      // Check if we're at a safe level
      const isSafeLevel = prizeLevels[currentQuestion].safe
      if (isSafeLevel) {
        // At safe level, player gets guaranteed prize
        setScore(getGuaranteedPrize())
      } else {
        // Not at safe level, player gets previous safe level prize or 0
        const previousSafeLevels = prizeLevels.filter(p => p.safe && p.level < currentQuestion + 1)
        if (previousSafeLevels.length > 0) {
          setScore(previousSafeLevels[previousSafeLevels.length - 1].amount)
        } else {
          setScore(0)
        }
      }
      setTimeout(() => {
        setGameState('gameOver')
        setGameOverReason('wrong')
      }, 3000)
    }
  }

  const handleWalkAway = () => {
    // When walking away, player gets current prize (the one they're playing for)
    setScore(getCurrentPrize())
    setGameState('gameOver')
    setGameOverReason('walk')
  }

  const handleLifeline = (lifelineType) => {
    if (usedLifelines[lifelineType]) return
    
    setUsedLifelines(prev => ({
      ...prev,
      [lifelineType]: true
    }))
  }

  const getCurrentPrize = () => {
    // Show the prize for the current question being answered
    return prizeLevels[currentQuestion].amount
  }

  const getGuaranteedPrize = () => {
    // Find the highest safe level that is at or before the current question
    // If current question is a safe level, include it (player is playing for it)
    const safeLevels = prizeLevels.filter(p => p.safe && p.level <= currentQuestion + 1)
    if (safeLevels.length === 0) return 0
    // Return the highest safe prize level
    return safeLevels[safeLevels.length - 1].amount
  }

  return (
    <div className="app">
      {gameState === 'menu' && (
        <div className="menu-screen">
          <div className="menu-content">
            <h1 className="menu-title">語文百萬富翁</h1>
            <p className="menu-subtitle">中一中文學習遊戲</p>
            <button className="start-button" onClick={startGame}>
              開始遊戲
            </button>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <>
          <div className="game-container">
            <div className="left-panel">
              <PrizeLadder 
                prizeLevels={prizeLevels} 
                currentLevel={currentQuestion + 1}
              />
            </div>

            <div className="center-panel">
              <Canvas className="canvas-container">
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <GameScene currentLevel={currentQuestion + 1} />
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>

            <div className="right-panel">
              <Lifelines 
                usedLifelines={usedLifelines}
                onUseLifeline={handleLifeline}
                currentQuestion={questions[currentQuestion]}
                selectedAnswer={selectedAnswer}
              />
            </div>
          </div>

          <div className="bottom-panel">
            <QuestionPanel
              question={questions[currentQuestion]}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              onConfirm={handleConfirmAnswer}
              showResult={showResult}
              isCorrect={isCorrect}
              currentPrize={getCurrentPrize()}
              guaranteedPrize={getGuaranteedPrize()}
              onWalkAway={handleWalkAway}
              usedLifelines={usedLifelines}
            />
          </div>
        </>
      )}

      {gameState === 'gameOver' && (
        <GameOverModal
          reason={gameOverReason}
          finalScore={score}
          guaranteedPrize={getGuaranteedPrize()}
          onRestart={startGame}
        />
      )}
    </div>
  )
}

export default App

