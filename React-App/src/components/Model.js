import React, { useState } from 'react';

const Model = () => {
  // State for the mannequin and clothing images
  const [mannequinImage, setMannequinImage] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [bottomImage, setBottomImage] = useState(null);

  // Styles for the mannequin container and images
  const containerStyle = {
    position: 'relative',
    width: '150%', // Set width to 150% for scaling up
    maxWidth: '600px', // Adjust this value based on your preference
    margin: 'auto', // Center align the container
  };

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%', // Image will scale with the container
    height: 'auto', // Height will adjust automatically to maintain aspect ratio
  };

  // Handlers for file uploads
  const handleMannequinUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMannequinImage(imageUrl);
    }
  };

  const handleTopUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTopImage(imageUrl);
    }
  };

  const handleBottomUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBottomImage(imageUrl);
    }
  };

  // Render the mannequin and selected clothing
  const renderMannequin = () => {
    return (
      <div style={containerStyle}>
        <img src={require("../images/Female.png")} alt="Mannequin" style={imageStyle} />
        {bottomImage && <img src={bottomImage} alt="Bottom" style={imageStyle} />}
        {topImage && <img src={topImage} alt="Top" style={imageStyle} />}
      </div>
    );
  };

  return (
    <div>
      <h2>Customize Your Mannequin</h2>
      <div>
        <label>
          Upload Mannequin:
          <input type="file" accept="image/*" onChange={handleMannequinUpload} />
        </label>
      </div>
      <div>
        <label>
          Upload Bottom Clothing:
          <input type="file" accept="image/*" onChange={handleBottomUpload} />
        </label>
      </div>
      <div>
        <label>
          Upload Top Clothing:
          <input type="file" accept="image/*" onChange={handleTopUpload} />
        </label>
      </div>
      {renderMannequin()}
    </div>
  );
};

export default Model;