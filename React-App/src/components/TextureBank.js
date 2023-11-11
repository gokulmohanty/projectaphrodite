import React from 'react';

const TextureBank = ({ textures, onSelectTexture }) => {
  return (
    <div>
      <h2>Texture Bank</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {textures.map((texture, index) => (
          <img
            key={index}
            src={texture}
            alt={`texture-${index}`}
            style={{ margin: '10px', width: '100px', height: '100px', cursor: 'pointer' }}
            onClick={() => onSelectTexture(texture)}
          />
        ))}
      </div>
    </div>
  );
};

export default TextureBank;
