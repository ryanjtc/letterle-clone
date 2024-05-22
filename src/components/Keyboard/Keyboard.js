import React from 'react';

export default function Keyboard({ onKeyClick, clickedKeys, disabled, answer }) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const handleClick = (key) => {
    if (!disabled && !clickedKeys.includes(key)) {
      onKeyClick(key);
    }
  };

  const getKeyColor = (key) => {
    if (clickedKeys.includes(key)) {
      if (key === answer) {
        return '#4caf50'; // green color for correct answer
      } else {
        return 'gray'; // gray color for incorrect answer
      }
    } else {
      return '#f0f0f0'; // default color for untouched keys
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
