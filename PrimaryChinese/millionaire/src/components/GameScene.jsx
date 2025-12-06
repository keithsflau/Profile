import React from 'react'
import './GameScene.css'


function GameScene({ currentLevel }) {
  return (
    <div className="game-scene-2d">
      <div className="scene-title">語文百萬富翁</div>
      <div className="scene-level">第 {currentLevel} 題</div>
    </div>
  )
}

export default GameScene

