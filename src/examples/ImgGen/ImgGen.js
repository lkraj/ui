import React, { useState, useRef } from 'react';
import VuiBox from 'components/VuiBox';
import VuiInput from 'components/VuiInput';
import VuiButton from 'components/VuiButton';
import VuiSwitch from 'components/VuiSwitch';

const ImgGen = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [numImages, setNumImages] = useState(1);
    const [sliderValue, setSliderValue] = useState(0);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [controlNetSwitch, setControlNetSwitch] = useState(false);
    const [controlNetOption, setControlNetOption] = useState('');
    const [controlNetWeight, setControlNetWeight] = useState(0);
  
    const imageInputRef = useRef(null);
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUploadedImage(file);
      }
    };
  
    const handleControlNetToggle = () => {
      if (!uploadedImage) {
        alert('Please upload an image first.');
        return;
      }
      setControlNetSwitch(!controlNetSwitch);
    };
  
    // Inline styles
    const styles = {
      dashboardContainer: {
        display: 'flex'
      },
      sidenav: {
        width: '250px',
        backgroundColor: '#f5f5f5',
        padding: '20px'
      },
      imggenContent: {
        flex: 1,
        padding: '20px'
      },
      sectionMargin: {
        marginBottom: '20px'
      },
      marginTop: {
        marginTop: '10px'
      },
      uploadedImageBox: {
        marginTop: '10px',
        width: '100px',
        height: '100px',
        overflow: 'hidden',
        borderRadius: '8px'
      },
      uploadedImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    };
  
    return (
      <div style={styles.dashboardContainer}>
        
        <main style={styles.imggenContent}>
          <VuiBox style={styles.sectionMargin}>
            <VuiInput
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt"
            />
            <VuiButton onClick={() => { /* Generate logic here */ }}>
              Generate
            </VuiButton>
            <p>This will use 14 credits</p>
          </VuiBox>
  
          <VuiBox style={styles.sectionMargin}>
            <label>Select Model:</label>
            <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
              {/* Populate with your model names */}
              {/* ... */}
            </select>
          </VuiBox>
  
          <VuiBox style={styles.sectionMargin}>
            <div style={styles.marginTop}>
              <label>Number of Images:</label>
              {[1, 2, 3, 4].map((num) => (
                <VuiButton key={num} onClick={() => setNumImages(num)}>
                  {num}
                </VuiButton>
              ))}
            </div>
  
            <div style={styles.marginTop}>
              <small>Adjust based on your prompt:</small>
              <input
                type="range"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
              />
            </div>
  
            <div style={styles.marginTop}>
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <VuiButton onClick={() => imageInputRef.current.click()}>
                Upload Image
              </VuiButton>
  
              {/* Display uploaded image */}
              {uploadedImage && (
                <VuiBox style={styles.uploadedImageBox}>
                  <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Preview" style={styles.uploadedImage} />
                </VuiBox>
              )}
            </div>
  
            <div style={styles.marginTop}>
              <VuiSwitch checked={controlNetSwitch} onChange={handleControlNetToggle} />
              <label>Control Net</label>
              {controlNetSwitch && (
                <VuiBox>
                  <select value={controlNetOption} onChange={(e) => setControlNetOption(e.target.value)}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                    {/* Populate with your options */}
                    {/* ... */}
                  </select>
                  <div>
                    <label>ControlNet Weight:</label>
                    <input
                      type="range"
                      value={controlNetWeight}
                      onChange={(e) => setControlNetWeight(e.target.value)}
                    />
                  </div>
                </VuiBox>
              )}
            </div>
          </VuiBox>
        </main>
      </div>
    );
  };
export default ImgGen;
