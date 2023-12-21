// ImageUpload.js
import React, { useState, useCallback } from 'react';
import VuiTypography from "components/VuiTypography";

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageLoading(false);
        onImageUpload(reader.result); // callback to pass data to parent
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  return (
    <div>
      <input type="file" onChange={handleImageChange} style={{ display: "none" }} />
      <div style={{ /* styles for your image container */ }}>
        {imageLoading && <VuiTypography>Loading...</VuiTypography>}
        {!imageLoading && image && (
          <img src={image} alt="Uploaded" style={{ /* styles for your image */ }} />
        )}
        {!imageLoading && !image && (
          <VuiTypography>Upload Image</VuiTypography>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
