import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import html2canvas from 'html2canvas';

const ImageEditor = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
    }

    reader.readAsDataURL(file);
  }

  const handleSave = () => {
    const canvas = document.getElementById('canvas');

    html2canvas(canvas).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // Send imgData to backend or do further processing here
    });
  }

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      {imageSrc && (
        <div>
          <h2>Image Preview:</h2>
          <img src={imageSrc} alt="Preview" />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
}

export default ImageEditor;
