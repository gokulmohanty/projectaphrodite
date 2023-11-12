import React, { useState } from 'react';
import ImageBank from './ImageBank';
import TextureBank from './TextureBank';
import OutlineBank from './OutlineBank';
import Canvas from './Canvas';
import ControlPanel from './ControlPanel';
import ColorBank from './ColorBank';

const Customize = () => {
  const [images, setImages] = useState([]);
  const [textures, setTextures] = useState([]);
  const [outlines, setOutlines] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedTexture, setSelectedTexture] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const colors = ['#ff0000', '#00ff00', '#0000ff', /* other hex color codes */];

  const addImage = (newImage) => {
    setImages([...images, newImage]);
  };

  const addTexture = (newTexture) => {
    setTextures([...textures, newTexture]);
  };

  const addOutline = (newOutline) => {
    setOutlines([...outlines, newOutline]);
  };

  const onSelectImage = (index) => {
    setSelectedIndex(index);
  };

  const onSelectTexture = (texture) => {
    setSelectedTexture(texture);
  };

  const onSelectColor = (color) => {
    setSelectedColor(color);
  };

  const selectedImage = images[selectedIndex];
  const selectedOutline = outlines[selectedIndex];

  return (
    <div>
      <ImageBank images={images} onSelectImage={onSelectImage} selectedIndex={selectedIndex} />
      <TextureBank textures={textures} onSelectTexture={onSelectTexture} />
      <OutlineBank outlines={outlines} onSelectOutline={onSelectImage} selectedIndex={selectedIndex} />
      <Canvas selectedImage={selectedImage} selectedTexture={selectedTexture} selectedOutline={selectedOutline} selectedColor={selectedColor} />
      <ControlPanel onAddImage={addImage} onAddTexture={addTexture} onAddOutline={addOutline} />
      <ColorBank colors={colors} onSelectColor={onSelectColor} selectedColor={selectedColor} />
    </div>
  );
};

export default Customize;
