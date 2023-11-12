import React from 'react';

const MannequinBank = ({ mannequins, onSelectMannequin, selectedMannequinIndex }) => {
  const imageContainerStyle = index => ({
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    border: index === selectedMannequinIndex ? '2px solid red' : '1px solid #ccc',
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
      <h2>Mannequin Bank</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {mannequins.map((mannequin, index) => (
          <div key={index} style={imageContainerStyle(index)} onClick={() => onSelectMannequin(index)}>
            <img src={mannequin} alt={`mannequin-${index}`} style={imageStyle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MannequinBank;