import React from 'react';

const BottomBank = ({ bottoms, onSelectBottom, selectedBottomIndex }) => {
  const imageContainerStyle = index => ({
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    border: index === selectedBottomIndex ? '2px solid green' : '1px solid #ccc',
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
      <h2>Bottom Bank</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {bottoms.map((bottom, index) => (
          <div key={index} style={imageContainerStyle(index)} onClick={() => onSelectBottom(index)}>
            <img src={bottom} alt={`bottom-${index}`} style={imageStyle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomBank;