import React, {useState} from 'react';
import ImageBank from './ImageBank';
import TextureBank from './TextureBank';
import Canvas from './Canvas';
import ControlPanel from './ControlPanel';

const Customize = () => {
// This is a base64 encoded 1x1 white pixel image
  const whiteTexture = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAusB9VFOTwAAAABJRU5ErkJggg==';
  const lightGrayTexture = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8DwQACf8B/wj8Sw0AAAAASUVORK5CYII=';



  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [textures, setTextures] = useState([lightGrayTexture]);
  const [selectedTexture, setSelectedTexture] = useState(lightGrayTexture);


  const addImage = (newImage) => {
    setImages([...images, newImage]);
  };

  const addTexture = (newTexture) => {
    setTextures([...textures, newTexture]);
  };

  return (
    <div>
        <ImageBank images={images} onSelectImage={setSelectedImage} />
        <TextureBank textures={textures} onSelectTexture={setSelectedTexture} />
        <Canvas selectedImage={selectedImage} selectedTexture={selectedTexture} />
        <ControlPanel onAddImage={addImage} onAddTexture={addTexture} />
    </div>
  );
};

export default Customize;
