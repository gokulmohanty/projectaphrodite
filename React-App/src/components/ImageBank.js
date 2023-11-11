import React from 'react';

const ImageBank = ({ images, onSelectImage }) => {
  return (
    <div>
      <h2>Image Bank</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`object-${index}`}
            style={{ margin: '10px', width: '100px', height: '100px', cursor: 'pointer' }}
            onClick={() => onSelectImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageBank;
