import React, { useState } from 'react';

export default function Keyboard({ onKeyClick, disabled, answer }) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const [activeKeys, setActiveKeys] = useState([]);

  const handleClick = (key) => {
    if (!disabled && !activeKeys.includes(key)) {
      setActiveKeys([...activeKeys, key]);
      onKeyClick(key);
    }
  };

  const isKeyActive = (key) => {
    return activeKeys.includes(key);
  };

  const getKeyColor = (key) => {
    if (isKeyActive(key)) {
      if (key === answer) {
        return 'green';
      } else {
        return 'gray';
      }
    } else {
      return '#f0f0f0';
    }
  };

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => (
            <button 
              className="keyboard-key" 
              key={key}
              onClick={() => handleClick(key)}
              disabled={disabled}
              style={{ backgroundColor: getKeyColor(key) }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
