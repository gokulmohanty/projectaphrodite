import React from 'react';

const OutlineBank = ({ outlines, onSelectOutline, selectedIndex }) => {
  const imageContainerStyle = index => ({
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    border: index === selectedIndex ? '2px solid green' : '1px solid #ccc', // Highlight selected outline
    boxSizing: 'border-box',
    cursor: 'pointer',
    overflow: 'hidden'
  });

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  };

  return (
    <div>
      <h2>Outline Bank</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {outlines.map((outline, index) => (
          <div key={index} style={imageContainerStyle(index)} onClick={() => onSelectOutline(index)}>
            <img src={outline} alt={`outline-${index}`} style={imageStyle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutlineBank;
