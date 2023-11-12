import React, { useState } from 'react';
import MannequinBank from './MannequinBank';
import TopBank from './TopBank';
import BottomBank from './BottomBank';

const Model = () => {
  // State for the mannequin and clothing images
  const [mannequinImage, setMannequinImage] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [bottomImage, setBottomImage] = useState(null);

  // Banks' states
  const [mannequins, setMannequins] = useState([]);
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);

  // Styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to flex-start
    gap: '30px',
    marginTop: '30px',
    fontFamily: '"Arial", sans-serif',
    color: '#333',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '80%', // Adjust width as needed
    margin: 'auto', // Center the container
    minHeight: '2000px' // Minimum height to cover images, adjust as needed
  };

  const imageContainerStyle = {
    position: 'relative', // Positioning context for absolute children
    width: '100%', // Container width
    height: '500px', // Adjust height as needed
    marginTop: '20px'
  };

  const imageStyle = {
    position: 'absolute', // Absolute positioning
    top: 0, // Align to top of the container
    left: '50%', // Center horizontally
    transform: 'translateX(-50%)', // Adjust for centered alignment
    maxWidth: '100%', // Responsive width
    height: 'auto',
    borderRadius: '10px'
  };

  const labelStyle = {
    backgroundColor: '#e7e7e7',
    padding: '15px 25px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '10px 0',
    cursor: 'pointer',
    color: '#333',
    border: '1px solid #ddd'
  };

  const inputStyle = {
    margin: '0 5px'
  };

  const titleStyle = {
    color: '#4a4a4a',
    paddingBottom: '10px',
    borderBottom: '2px solid #ddd'
  };

  // Handlers for file uploads and bank selections
  const handleMannequinUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMannequinImage(imageUrl);
      setMannequins([...mannequins, imageUrl]); // Add to mannequin bank
    }
  };

  const handleTopUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTopImage(imageUrl);
      setTops([...tops, imageUrl]); // Add to top bank
    }
  };

  const handleBottomUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBottomImage(imageUrl);
      setBottoms([...bottoms, imageUrl]); // Add to bottom bank
    }
  };

  const onSelectMannequin = (index) => {
    const selectedMannequin = mannequins[index];
    setMannequinImage(selectedMannequin);
  };

  const onSelectTop = (index) => {
    const selectedTop = tops[index];
    setTopImage(selectedTop);
  };

  const onSelectBottom = (index) => {
    const selectedBottom = bottoms[index];
    setBottomImage(selectedBottom);
  };

  // Render the mannequin and selected clothing
  const renderMannequin = () => {
    return (
      <div style={imageContainerStyle}>
        {mannequinImage && <img src={mannequinImage} alt="Mannequin" style={imageStyle} />}
        {bottomImage && <img src={bottomImage} alt="Bottom" style={imageStyle} />}
        {topImage && <img src={topImage} alt="Top" style={imageStyle} />}
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Customize Your Mannequin</h2>
      <div>
        <label style={labelStyle}>
          Upload Mannequin:
          <input type="file" accept="image/*" onChange={handleMannequinUpload} style={inputStyle} />
        </label>
      </div>
      <div>
        <label style={labelStyle}>
          Upload Bottom Clothing:
          <input type="file" accept="image/*" onChange={handleBottomUpload} style={inputStyle} />
        </label>
      </div>
      <div>
        <label style={labelStyle}>
          Upload Top Clothing:
          <input type="file" accept="image/*" onChange={handleTopUpload} style={inputStyle} />
        </label>
      </div>
      <MannequinBank mannequins={mannequins} onSelectMannequin={onSelectMannequin} />
      <TopBank tops={tops} onSelectTop={onSelectTop} />
      <BottomBank bottoms={bottoms} onSelectBottom={onSelectBottom} />
      {renderMannequin()}
    </div>
  );
};

export default Model;