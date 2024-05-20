import React, { useState } from 'react';


export default function Help() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div>
      <h4 className='helpTitle' onClick={() => setShowMessage(!showMessage)}>
        How to play {showMessage ? '\u2191' : '\u2193'}
      </h4>
      {showMessage && 
        <p className='helpParagraph'>
          This is a clone of the online game 'LetterLe'.
          <br/>
          <br/>
          A random letter is chosen each time the page refreshes.
          <br/>
          <br/>
          You'll be given a score based on the number of click(s) it takes to find.
        </p>
      }
    </div>
  );
}
