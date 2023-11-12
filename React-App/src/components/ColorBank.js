import React from 'react';

const ColorBank = ({ onSelectColor, selectedColor }) => {
    const colors = ['#e8dff5', '#fce1e4', '#fcf4dd', '#ddedea', '#daeaf6'];

  const colorStyle = color => ({
    margin: '10px',
    width: '50px',
    height: '50px',
    backgroundColor: color,
    cursor: 'pointer',
    border: selectedColor === color ? '2px solid red' : '1px solid #ccc'
  });

  const naBoxStyle = {
    ...colorStyle('#fff'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    color: '#333',
  };

  return (
    <div>
      <h2>Color Bank</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={naBoxStyle} onClick={() => onSelectColor(null)}>
          N/A
        </div>
        {colors.map((color, index) => (
          <div
            key={index}
            style={colorStyle(color)}
            onClick={() => onSelectColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorBank;
