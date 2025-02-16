import React from 'react';
import '../../css/TextDisplay.css'

const TextDisplay = ({ text, userinput }) => {
  const renderedText = text.split('').map((char, index) => {
    let color;
    if (index < userinput.length) {
      color = char === userinput[index] ? 'correct' : 'incorrect';
    }
    return (
      <span key={index} className={color} >
        {char}
      </span>
    );
  });

  return (
    <div className="text-2xl">
      {renderedText}
    </div>
  );
};

export default TextDisplay;