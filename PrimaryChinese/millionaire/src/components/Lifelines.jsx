import React, { useState } from 'react'
import './Lifelines.css'

function Lifelines({ usedLifelines, onUseLifeline, currentQuestion, selectedAnswer }) {
  const [showPhoneFriend, setShowPhoneFriend] = useState(false)
  const [showAudience, setShowAudience] = useState(false)

  const handleFiftyFifty = () => {
    if (!usedLifelines.fiftyFifty) {
      onUseLifeline('fiftyFifty')
    }
  }

  const handlePhoneFriend = () => {
    if (!usedLifelines.phoneAFriend) {
      onUseLifeline('phoneAFriend')
      setShowPhoneFriend(true)
      setTimeout(() => setShowPhoneFriend(false), 5000)
    }
  }

  const handleAskAudience = () => {
    if (!usedLifelines.askAudience) {
      onUseLifeline('askAudience')
      setShowAudience(true)
      setTimeout(() => setShowAudience(false), 5000)
    }
  }

  const getPhoneFriendAdvice = () => {
    // Phone friend suggests the correct answer 70% of the time
    const isCorrect = Math.random() < 0.7
    if (isCorrect) {
      return `我認為答案是 ${String.fromCharCode(65 + currentQuestion.correct)}`
    } else {
      const wrongOptions = currentQuestion.options
        .map((_, idx) => idx)
        .filter(idx => idx !== currentQuestion.correct)
      const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)]
      return `我認為答案是 ${String.fromCharCode(65 + randomWrong)}`
    }
  }

  const getAudiencePoll = () => {
    // Generate fake audience percentages
    const percentages = [0, 0, 0, 0]
    const correctIndex = currentQuestion.correct
    
    // Give correct answer highest percentage (40-60%)
    percentages[correctIndex] = 40 + Math.random() * 20
    
    // Distribute remaining percentage
    const remaining = 100 - percentages[correctIndex]
    for (let i = 0; i < 4; i++) {
      if (i !== correctIndex) {
        percentages[i] = remaining / 3 + (Math.random() - 0.5) * 10
      }
    }
    
    // Normalize to 100%
    const sum = percentages.reduce((a, b) => a + b, 0)
    percentages.forEach((_, i) => {
      percentages[i] = Math.round((percentages[i] / sum) * 100)
    })
    
    return percentages
  }

  return (
    <div className="lifelines">
      <h3 className="lifelines-title">生命線</h3>
      
      <div className="lifeline-item">
        <button
          className={`lifeline-button ${usedLifelines.fiftyFifty ? 'used' : ''}`}
          onClick={handleFiftyFifty}
          disabled={usedLifelines.fiftyFifty || selectedAnswer !== null}
        >
          <span className="lifeline-icon">50:50</span>
          <span className="lifeline-label">50/50</span>
        </button>
        {usedLifelines.fiftyFifty && (
          <span className="used-label">已使用</span>
        )}
      </div>

      <div className="lifeline-item">
        <button
          className={`lifeline-button ${usedLifelines.phoneAFriend ? 'used' : ''}`}
          onClick={handlePhoneFriend}
          disabled={usedLifelines.phoneAFriend || selectedAnswer !== null}
        >
          <span className="lifeline-icon">📞</span>
          <span className="lifeline-label">打電話</span>
        </button>
        {usedLifelines.phoneAFriend && (
          <span className="used-label">已使用</span>
        )}
        {showPhoneFriend && (
          <div className="lifeline-result phone-result">
            <div className="result-title">朋友建議：</div>
            <div className="result-content">{getPhoneFriendAdvice()}</div>
          </div>
        )}
      </div>

      <div className="lifeline-item">
        <button
          className={`lifeline-button ${usedLifelines.askAudience ? 'used' : ''}`}
          onClick={handleAskAudience}
          disabled={usedLifelines.askAudience || selectedAnswer !== null}
        >
          <span className="lifeline-icon">👥</span>
          <span className="lifeline-label">問觀眾</span>
        </button>
        {usedLifelines.askAudience && (
          <span className="used-label">已使用</span>
        )}
        {showAudience && (
          <div className="lifeline-result audience-result">
            <div className="result-title">觀眾投票：</div>
            <div className="audience-poll">
              {getAudiencePoll().map((percentage, index) => (
                <div key={index} className="poll-item">
                  <div className="poll-label">{String.fromCharCode(65 + index)}</div>
                  <div className="poll-bar-container">
                    <div 
                      className="poll-bar"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lifelines

