import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Enemy.css';

const Enemy = ({ enemy, onDestroy, position, top }) => {
  const [isDestroyed, setIsDestroyed] = useState(false);

  const handleClick = () => {
    setIsDestroyed(true);
    setTimeout(() => {
      onDestroy(enemy.id);
    }, 300);
  };

  return (
    <AnimatePresence>
      {!isDestroyed && (
        <motion.div
          className="enemy"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            scale: 1.5,
            filter: "blur(10px)"
          }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 }
          }}
          onClick={handleClick}
          style={{
            backgroundColor: 'rgba(70, 70, 90, 0.95)', // 統一深色，不顯示答案提示
            left: `${position}px`,
            top: `${top}px`,
          }}
        >
          <div className="enemy-content">
            <div className="enemy-sentence">{enemy.sentence}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Enemy;
