import React from 'react'
import './GameOverModal.css'

function GameOverModal({ reason, finalScore, guaranteedPrize, onRestart }) {
  const getMessage = () => {
    switch (reason) {
      case 'win':
        return {
          title: '🎉 恭喜！',
          subtitle: '你贏得了語文百萬富翁！',
          message: `你成功回答了所有問題，獲得了 $${finalScore.toLocaleString()}！`
        }
      case 'wrong':
        return {
          title: '😔 遊戲結束',
          subtitle: '答錯了！',
          message: `你獲得了保證獎金 $${guaranteedPrize.toLocaleString()}`
        }
      case 'walk':
        return {
          title: '👋 退出遊戲',
          subtitle: '你選擇退出',
          message: `你帶走了 $${finalScore.toLocaleString()}`
        }
      default:
        return {
          title: '遊戲結束',
          subtitle: '',
          message: `你獲得了 $${finalScore.toLocaleString()}`
        }
    }
  }

  const message = getMessage()

  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        <h1 className="game-over-title">{message.title}</h1>
        <h2 className="game-over-subtitle">{message.subtitle}</h2>
        <p className="game-over-message">{message.message}</p>
        <button className="restart-button" onClick={onRestart}>
          再玩一次
        </button>
      </div>
    </div>
  )
}

export default GameOverModal

