import React from 'react';

const ControlPanel = ({ onAddImage, onAddTexture }) => {
  const handleImageUpload = (event, isTexture) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target.result;
        isTexture ? onAddTexture(newImage) : onAddImage(newImage);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Control Panel</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, false)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, true)}
      />
    </div>
  );
};

export default ControlPanel;
