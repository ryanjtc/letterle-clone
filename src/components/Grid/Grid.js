import React from 'react';

export default function Grid({ keys, answer }) {
  return (
    <div className="grid">
      {keys.map((key, index) => (
        <div 
          className={`grid-item ${key === answer ? 'correct' : ''}`} 
          key={index}
        >
          {key}
        </div>
      ))}
    </div>
  );
}
