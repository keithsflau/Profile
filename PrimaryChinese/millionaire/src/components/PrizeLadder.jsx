import React from 'react'
import './PrizeLadder.css'

function PrizeLadder({ prizeLevels, currentLevel }) {
  return (
    <div className="prize-ladder">
      <h3 className="ladder-title">獎金等級</h3>
      <div className="ladder-list">
        {prizeLevels.slice().reverse().map((prize, index) => {
          const actualLevel = prizeLevels.length - index
          const isCurrent = actualLevel === currentLevel
          const isPassed = actualLevel < currentLevel
          
          return (
            <div
              key={prize.level}
              className={`ladder-item ${isCurrent ? 'current' : ''} ${isPassed ? 'passed' : ''} ${prize.safe ? 'safe' : ''}`}
            >
              <div className="level-number">{prize.level}</div>
              <div className="prize-amount">
                ${prize.amount.toLocaleString()}
              </div>
              {prize.safe && (
                <div className="safe-marker">安全線</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PrizeLadder

