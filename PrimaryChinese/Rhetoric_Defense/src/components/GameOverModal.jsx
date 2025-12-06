import React from 'react';
import { motion } from 'framer-motion';
import './GameOverModal.css';

const GameOverModal = ({ score, level, onRestart }) => {
  return (
    <motion.div
      className="game-over-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="game-over-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <h2 className="game-over-title">遊戲結束</h2>
        <div className="final-stats">
          <div className="final-score">
            <span className="score-label">最終分數：</span>
            <span className="score-value">{score}</span>
          </div>
          <div className="final-level">
            <span className="level-label">達到等級：</span>
            <span className="level-value">{level}</span>
          </div>
        </div>
        <motion.button
          className="restart-button"
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          重新開始
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GameOverModal;
