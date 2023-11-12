import React, { useState } from 'react';
import ImageBank from './ImageBank';
import TextureBank from './TextureBank';
import OutlineBank from './OutlineBank';
import Canvas from './Canvas';
import ControlPanel from './ControlPanel';

const Customize = () => {
  const [images, setImages] = useState([]);
  const [textures, setTextures] = useState([]);
  const [outlines, setOutlines] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedTexture, setSelectedTexture] = useState(null);

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

  const selectedImage = images[selectedIndex];
  const selectedOutline = outlines[selectedIndex];

  return (
    <div>
      <ImageBank images={images} onSelectImage={onSelectImage} selectedIndex={selectedIndex} />
      <TextureBank textures={textures} onSelectTexture={onSelectTexture} />
      <OutlineBank outlines={outlines} onSelectOutline={onSelectImage} selectedIndex={selectedIndex} />
      <Canvas selectedImage={selectedImage} selectedTexture={selectedTexture} selectedOutline={selectedOutline} />
      <ControlPanel onAddImage={addImage} onAddTexture={addTexture} onAddOutline={addOutline} />
    </div>
  );
};

export default Customize;
