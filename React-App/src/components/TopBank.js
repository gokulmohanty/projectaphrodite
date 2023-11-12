import React from 'react';

const TopBank = ({ tops, onSelectTop, selectedTopIndex }) => {
  const imageContainerStyle = index => ({
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    border: index === selectedTopIndex ? '2px solid blue' : '1px solid #ccc',
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
      <h2>Top Bank</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tops.map((top, index) => (
          <div key={index} style={imageContainerStyle(index)} onClick={() => onSelectTop(index)}>
            <img src={top} alt={`top-${index}`} style={imageStyle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBank;