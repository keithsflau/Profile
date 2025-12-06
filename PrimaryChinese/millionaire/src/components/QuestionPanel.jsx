import React from 'react'
import './QuestionPanel.css'

function QuestionPanel({
  question,
  selectedAnswer,
  onAnswerSelect,
  onConfirm,
  showResult,
  isCorrect,
  currentPrize,
  guaranteedPrize,
  onWalkAway,
  usedLifelines
}) {
  const getAnswerClass = (index) => {
    let className = 'answer-option'
    
    if (showResult) {
      if (index === question.correct) {
        className += ' correct'
      } else if (index === selectedAnswer && !isCorrect) {
        className += ' wrong'
      }
    } else if (index === selectedAnswer) {
      className += ' selected'
    }
    
    return className
  }

  const getAnswerLabel = (index) => {
    if (usedLifelines.fiftyFifty && index !== question.correct) {
      // Check if this answer should be hidden (50/50 lifeline)
      const wrongAnswers = question.options
        .map((_, idx) => idx)
        .filter(idx => idx !== question.correct)
      const hiddenAnswers = wrongAnswers.slice(0, 2)
      if (hiddenAnswers.includes(index)) {
        return null // Hide this answer
      }
    }
    return String.fromCharCode(65 + index) // A, B, C, D
  }

  return (
    <div className="question-panel">
      <div className="question-header">
        <div className="prize-info">
          <div className="current-prize">
            當前獎金: ${currentPrize.toLocaleString()}
          </div>
          {guaranteedPrize > 0 && (
            <div className="guaranteed-prize">
              保證獎金: ${guaranteedPrize.toLocaleString()}
            </div>
          )}
        </div>
        <button 
          className="walk-away-button"
          onClick={onWalkAway}
          disabled={showResult}
        >
          退出遊戲
        </button>
      </div>

      <div className="question-content">
        <h2 className="question-text">{question.question}</h2>
        
        <div className="answers-grid">
          {question.options.map((option, index) => {
            const label = getAnswerLabel(index)
            if (label === null) return null // Hidden by 50/50
            
            return (
              <button
                key={index}
                className={getAnswerClass(index)}
                onClick={() => onAnswerSelect(index)}
                disabled={showResult}
              >
                <span className="answer-label">{label}.</span>
                <span className="answer-text">{option}</span>
              </button>
            )
          })}
        </div>

        {selectedAnswer !== null && !showResult && (
          <button 
            className="confirm-button"
            onClick={onConfirm}
          >
            確認答案
          </button>
        )}

        {showResult && (
          <div className={`result-message ${isCorrect ? 'correct' : 'wrong'}`}>
            {isCorrect ? (
              <>
                <div className="result-icon">✓</div>
                <div className="result-text">答對了！</div>
                <div className="result-explanation">{question.explanation}</div>
              </>
            ) : (
              <>
                <div className="result-icon">✗</div>
                <div className="result-text">答錯了</div>
                <div className="result-explanation">
                  正確答案是: {question.options[question.correct]}
                </div>
                <div className="result-explanation">{question.explanation}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionPanel

