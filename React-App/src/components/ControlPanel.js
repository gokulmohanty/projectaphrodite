const ControlPanel = ({ onAddImage, onAddTexture, onAddOutline }) => {
  const handleImageUpload = (event, uploadType) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile = e.target.result;
        if (uploadType === 'image') {
          onAddImage(newFile);
        } else if (uploadType === 'texture') {
          onAddTexture(newFile);
        } else if (uploadType === 'outline') {
          onAddOutline(newFile);
        }
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
        onChange={(e) => handleImageUpload(e, 'image')}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, 'texture')}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, 'outline')}
      />
    </div>
  );
};

export default ControlPanel;
