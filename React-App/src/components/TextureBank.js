import React from 'react';

const TextureBank = ({ textures, onSelectTexture, selectedTexture }) => {
  const textureStyle = {
    margin: '10px', 
    width: '100px', 
    height: '100px', 
    cursor: 'pointer'
  };

  const naBoxStyle = {
    ...textureStyle,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Different background for N/A option
    fontSize: '16px',
    color: '#333',
    border: selectedTexture === null ? '2px solid red' : '1px solid #ccc', // Highlight if N/A is selected
  };

  return (
    <div>
      <h2>Texture Bank</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* N/A Option */}
        <div style={naBoxStyle} onClick={() => onSelectTexture(null)}>
          N/A
        </div>

        {/* Texture Options */}
        {textures.map((texture, index) => (
          <img
            key={index}
            src={texture}
            alt={`texture-${index}`}
            style={textureStyle}
            onClick={() => onSelectTexture(texture)}
          />
        ))}
      </div>
    </div>
  );
};

export default TextureBank;
