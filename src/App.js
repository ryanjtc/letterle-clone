import './App.css';
import Keyboard from './components/Keyboard/Keyboard';
import Grid from './components/Grid/Grid';
import Help from './components/Help/Help';
import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [clickedKeys, setClickedKeys] = useState([]);
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [answerFound, setAnswerFound] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setAnswer(randomLetter);
  }, []);

  const handleKeyClick = useCallback((key) => {
    if (!answerFound && !clickedKeys.includes(key)) {
      setClickedKeys((prevClickedKeys) => [...prevClickedKeys, key]);
      setAttempts((prevAttempts) => prevAttempts + 1);
      if (key === answer) {
        setAnswerFound(true);
      }
    }
  }, [answerFound, clickedKeys, answer]);

  const handleKeyDown = useCallback((event) => {
    const key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      handleKeyClick(key);
    }
  }, [handleKeyClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleCopyClick = () => {
    const maxCols = 6;
    let grid = '';
    for (let i = 0; i < attempts; i++) {
      if (i > 0 && i % maxCols === 0) {
        grid = grid.trim();
        grid += '\n \n';
      }
      grid += (i === attempts - 1) ? '🟩 ' : '⬜ ';
    }
    grid = grid.trim(); // Removes the trailing space at the end of the grid
    const url = "https://ryanjtc.github.io/letterle-clone/";
    const textToCopy = `Attempts: ${attempts}/26\n${grid}\n${url}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess('Copied to clipboard!');
    }, (err) => {
      setCopySuccess('Failed to copy!');
      console.error('Could not copy text: ', err);
    });
  };
  
  return (
    <div className="App">
      <div className="App-header">
        <div className='titleContainer'>
          <h2>
            { "Guess The Letter!".split(' ').map((word, index) => (
              <div key={index} className={index === 0 ? 'first-word' : ''}>
                {word.split('').map((char, charIndex) => (
                  <span key={charIndex} className={charIndex === 0 + 1 ? 'first-letter' : ''}>
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </h2>
          <p className='subTitle'>Press any letter on the keyboard to begin.</p>
        </div>
        <br/>
        <Grid keys={clickedKeys} answer={answer} />
        <Keyboard onKeyClick={handleKeyClick} clickedKeys={clickedKeys} disabled={answerFound} answer={answer} />
        {answerFound && <p>Attempts: {attempts}/26</p>}
        {answerFound && (
          <div>
            <button className='shareButton' onClick={handleCopyClick}>Share</button>
            {copySuccess && <p>{copySuccess}</p>}
          </div>
        )}
        <Help />
      </div>
    </div>
  );
}

export default App;
