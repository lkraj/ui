  import React, { useState, useRef } from 'react';
  import { Slider, Collapse } from "@mui/material";
  import VuiBox from 'components/VuiBox';
  import VuiInput from 'components/VuiInput';
  import VuiButton from 'components/VuiButton';
  import VuiSwitch from 'components/VuiSwitch';
  import VuiTypography from 'components/VuiTypography';
  import VuiAlert from 'components/VuiAlert';
  import colors from 'assets/theme/base/colors.js';
  import Card from "@mui/material/Card";
  import ImageFeed from "examples/ImageFeed/ImageFeed";
  import ImageGenerationHistory from './ImageGenerationHistory';
  import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
  import backgroundimg from "../../assets/images/upload-image.png";
  import image1 from '../../assets/images/Image (1).jpeg';
  import image7 from '../../assets/images/Image (7).jpg';
  import image8 from '../../assets/images/Image (8).jpg';
  import image9 from '../../assets/images/Image (9).jpg';
  import { FaQuestionCircle } from "react-icons/fa";
  import { IconButton, Badge,Tooltip } from '@mui/material';
  
  const ImgGen = () => {
      const [controller, dispatch] = useVisionUIController();
      const {sidenavColor } = controller;
      const [open, setOpen] = useState(false);
      const [prompt, setPrompt] = useState('');
      const [imageUrl, setImageUrl] = useState(null);
      const [history, setHistory] = useState([]);
      const [selectedModel, setSelectedModel] = useState('');
      const [selectedImageNumber, setSelectedImageNumber] = useState(null);
      const [numImages, setNumImages] = useState(1);
      const [sliderValue, setSliderValue] = useState(0);
      const [uploadedImage, setUploadedImage] = useState(null);
      const [controlNetSwitch, setControlNetSwitch] = useState(false);
      const [controlNetOption, setControlNetOption] = useState('');
      const [controlNetWeight, setControlNetWeight] = useState(0);
      const [showAlert, setShowAlert] = useState(false);

      const imageInputRef = useRef(null);
      const imageOptions = [1, 2, 3, 4];

      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          setUploadedImage(file);
        }
        setShowAlert(false);
      };

      const handleGenerateClick = async () => {
        console.log(prompt);
        try {
            const response = await fetch('http://127.0.0.1:8000/generate-art', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            // setImageUrl(data.image_url); // Update the state with the image URL
            setHistory([...history, { prompt: prompt, images: [data.image_url] }]);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    
      
    
      const handleControlNetToggle = () => {
        if (!uploadedImage) {
          setShowAlert(true);
          return;
        }
        setControlNetSwitch(!controlNetSwitch);
      };
      const sampleHistory = [
        {
          prompt:{prompt},
          images: [{imageUrl}]
        },
        {
          prompt: "A serene lakeside view",
          images: ["path/to/image3.jpg"]
        },
        {
          prompt: "A serene lakeside view",
          images: ["path/to/image3.jpg"]
        },
        {
          prompt: "A serene lakeside view",
          images: ["path/to/image3.jpg"]
        },
        {
          prompt: "A serene lakeside view",
          images: ["path/to/image3.jpg"]
        },
        // ... up to five generations
      ];
      // Inline styles
      const styles = {
        
        // dashboardContainer: {
        //   display: 'flex',
          
        // },
        imggenContent: {
          flex: 1,
          padding: '20px',
          color: colors.text.main,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px'
        },
        sectionMargin: {
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          padding: '5px',
        },
        inputWithButton: {
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        marginTop: {
          display: 'flex',
          gap: '10px',
          padding: '20px',
          flexDirection:"column"
        },
        
        modelSelect: {
        padding: '10px',
        // fontSize: '16px',
        // fontWeight: '500',
        border: '1px solid #4A5568',
        borderRadius: '10px',
        // appearance: 'none', // to remove default styling
        backgroundColor: "transparent",
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // light shadow for depth
        outline: 'none', // remove focus outline
        transition: 'border-color 0.3s, box-shadow 0.3s', // transition for a smoother effect
        ':hover': {
          borderColor: '#00000',
        },
        ':focus': {
          borderColor: '#555',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', // deeper shadow on focus
        },
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: 'black',
        padding: '20px',
        borderRadius: '5px',
        width: '190px',
        gap: '10px',

      },
      title: {
        color: 'white',
        marginBottom: '20px'
      },
      arrowUp: {
        marginLeft: '10px'
      },
      grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      },
      gridItem: {
        width: '40px',
        height: '40px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        border: '1px solid transparent',
        borderRadius: '5px',
        cursor: 'pointer'
      },
      selectedGridItem: {
        
        border: '2px solid black'
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
        },
        optionIcon: {
          width: '16px',
          height: '16px',
          marginRight: '5px',
          verticalAlign: 'middle'  // to align it with the text
      }
      };
    
      return (
        
        <VuiBox>
          <main style={styles.imggenContent}>
            <VuiBox >
              <VuiBox style={styles.inputWithButton}>
              <VuiInput
                size="large"
                multiline 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
              />
              <VuiButton variant="gradient" color={sidenavColor} style={{ backgroundColor: colors.primary.main }} onClick={handleGenerateClick}>
                Generate
              </VuiButton>
              <VuiTypography
                      variant="caption"
                      fontWeight="regular"
                      fontSize= "5px"
                      color= "white"
                      >
                      This will use 14 credits.
                    </VuiTypography>
              </VuiBox>
            </VuiBox>
    
            <VuiBox display="flex" flexDirection="row" gap="15px">
      
              <VuiBox>
              <select style={styles.modelSelect} value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                {/* Populate with your model names */}
                {/* ... */}
                <option value="option1"> 
                <VuiTypography
                      variant="button"
                      fontWeight="regular"
                      color= "white"
                      >
                      <img src= '../../assets/images/Image (7).jpg' alt="icon" style={styles.optionIcon} />
                    Option 1
                    </VuiTypography></option>
                <option value="option2"> 
                <VuiTypography
                      variant="button"
                      fontWeight="regular"
                      color= "white"
                      >
                    <img src= '../../assets/images/Image (8).jpg' alt="icon" style={styles.optionIcon} />
                    Option 2
                    </VuiTypography>
                    </option>
              </select>
              </VuiBox>
              {/* <VuiButton variant="gradient" color={sidenavColor} style={{ backgroundColor: colors.primary.main }} onClick={() => setOpen(!open)}>
                More settings
              </VuiButton> */}
            </VuiBox>
            {/* <Collapse in={open} > */}
              <VuiBox display="flex" flexDirection="row" gap="35px">
            <Card variant="button" style={styles.sectionMargin} sx={({ palette: { gradients, white }, functions: { radialGradient } }) => ({
              
               background: radialGradient(
                "69%",
                colors.lightblue.main ,
                "#e4bebc",
                
                 
               ),
            
              borderRadius: '25px',
              })}>
              
              <VuiBox style={styles.container}>
              
              <VuiTypography
  variant="button"
  fontWeight="regular"
  color="white"
  style={{ 
    display: 'inline-flex', 
    
    alignItems: 'center', 
    marginRight: '0px' // Adjust space between text and icon if necessary
  }}
>
  Number of Images
  <Tooltip title="Delete">
  <IconButton 
    style={{ 
      
      padding: '0px 0px 0px 10px', 
      display: 'inline-flex', 
      verticalAlign: 'bottom' // This aligns the icon with the baseline of the text
    }}
  >
   <FaQuestionCircle size="15px" />
  </IconButton>
</Tooltip>
</VuiTypography>

                  <VuiBox style={styles.grid}>
                    {imageOptions.map((option, index) => (
                      <VuiBox 
                        key={index}
                        style={{
                          ...styles.gridItem, 
                          ...(selectedImageNumber === option && styles.selectedGridItem)
                        }} 
                        sx={({ palette: { gradients, white }, functions: { linearGradient } }) => ({
              
                          background: linearGradient(
                            "#e4bebc",
                            "#9d97d1",
                            137
                          ),
                          borderRadius: '15px' 
                        })}
                        onClick={() => setSelectedImageNumber(option)}
                      >
                        <VuiTypography
                      variant="button"
                      fontWeight="medium"
                      color= "white"
                      >
                    {option}
                    </VuiTypography>
                      </VuiBox>
                    ))}
                  </VuiBox>
                </VuiBox>
              <VuiBox style={styles.container}>
              <VuiTypography
                      variant="button"
                      fontWeight="regular"
                      color= "white"
                      >
                    Guidance Scale
                    </VuiTypography>
                {/* <input
                  type="range"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(e.target.value)}
                /> */}
                <Slider 
                  defaultValue={5}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                  onChange={(event, newValue) => setNumColumns(newValue)}
                  
                />

              </VuiBox>
              </Card>
              <Card variant="button" style={styles.sectionMargin} sx={({ palette: { gradients, white }, functions: { linearGradient } }) => ({
              background: linearGradient(
                 colors.lightblue.main ,
                "transparent",
                75
              ),
             borderColor:"#fffff",
             borderRadius: '25px' })}>
              <VuiBox style={styles.container}>
            
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  style={{ display: 'none' }} 
                />
                <VuiButton variant="gradient"  color={sidenavColor} onClick={() => imageInputRef.current.click()} sx={{
                  backgroundImage: `url(${backgroundimg})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height: "100%",
                }}>
                  <VuiTypography color="white" variant="button" fontWeight="medium"  mb="1px">
                  Upload Image
            </VuiTypography>
                  
                </VuiButton>
    
                {/* Display uploaded image */}
                {uploadedImage && (
                  <VuiBox style={styles.uploadedImageBox}>
                    <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Preview" style={styles.uploadedImage} />
                  </VuiBox>
                )}
             </VuiBox>
    
              <VuiBox style={styles.container}>
                <VuiBox display="inline" gap="10px" >
                <VuiTypography
                      variant="button"
                      fontWeight="regular"
                      color= "white"
                      marginRight="10px"
                      >
                    Control Net   
                    </VuiTypography>
                    
                    <VuiSwitch color={sidenavColor} checked={controlNetSwitch} onChange={handleControlNetToggle} />
                    {showAlert && (
                      <VuiAlert display="flex" flexWrap="wrap" color="error" onClose={() => setShowAlert(false)}>
                        <VuiTypography
                      variant="caption"
                      fontWeight="regular"
                      color= "white"
                      marginRight="10px"
                      >
                    Please upload an image before toggling.  
                    </VuiTypography>
                      </VuiAlert>
                    )}
                </VuiBox>
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
              </VuiBox>
            </Card>
            
            </VuiBox>
            
            {/* </Collapse> */}
            <ImageGenerationHistory history={history} />
          </main>
          </VuiBox>
          
    
      );
    };
  export default ImgGen;
