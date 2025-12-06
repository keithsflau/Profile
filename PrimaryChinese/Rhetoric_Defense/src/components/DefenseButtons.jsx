import React from 'react';
import { motion } from 'framer-motion';
import './DefenseButtons.css';

const DefenseButtons = ({ deviceTypes, onButtonClick, disabled }) => {
  return (
    <div className="defense-buttons-container">
      {deviceTypes.map((device, index) => (
        <motion.button
          key={device.type}
          className="defense-button"
          onClick={() => onButtonClick(device.type)}
          disabled={disabled}
          style={{ backgroundColor: device.color }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="button-text">{device.chinese}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default DefenseButtons;
