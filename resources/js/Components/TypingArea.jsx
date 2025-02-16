import React from 'react';

const TypingArea = ({ input, onInputChange }) => {
  const handleChange = (e) => {
    onInputChange(e.target.value);
  };

  return (
    <textarea value={input} onChange={handleChange} rows="5" cols="60" />
  );
};

export default TypingArea;