import React, { useState, useRef, useCallback } from "react";
import { Slider, Collapse } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import VuiTypography from "components/VuiTypography";
import VuiAlert from "components/VuiAlert";
import colors from "assets/theme/base/colors.js";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { FormControlLabel } from "@mui/material";

import ImageFeed from "examples/ImageFeed/ImageFeed";
import ImageGenerationHistory from "./ImageGenerationHistory";
import imageeOptions from "./imageOptions";
import modelOptions from "./modelOptions";
import {
  useVisionUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { FaExpand, FaUpload, FaTrashAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import backgroundimg from "../../assets/images/image-upload.jpg";
import image1 from "../../assets/images/Image (1).jpeg";
import image7 from "../../assets/images/Image (7).jpg";
import image8 from "../../assets/images/Image (8).jpg";
import image9 from "../../assets/images/Image (9).jpg";
import { FaQuestionCircle } from "react-icons/fa";
import Select from "react-select";
import { IconButton, Badge, Tooltip } from "@mui/material";

const ImgGen = () => {
  const [controller, dispatch] = useVisionUIController();
  const { sidenavColor } = controller;
  const [showInput, setShowInput] = useState(false);
  const [open, setOpen] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [negprompt, setNegPrompt] = useState("");
  const [seed, setSeed] = useState("");

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedModel, setSelectedModel] = useState(modelOptions[0]);
  const [selectedOption, setSelectedOption] = useState(imageeOptions[0]);
  const [selectedImageNumber, setSelectedImageNumber] = useState(null);
  const [numImages, setNumImages] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [controlNetSwitch, setControlNetSwitch] = useState(false);
  const [controlNetOption, setControlNetOption] = useState("");
  const [controlNetWeight, setControlNetWeight] = useState(0.5);
  const [guidance, setGuidance] = useState(7);
  const [imageLoading, setImageLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const imageInputRef = useRef(null);
  const imageOptions = [1, 2, 3, 4];

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true); // Start loading
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the uploaded image
        setImageLoading(false); // End loading
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleToggleSwitch = () => {
    setShowInput(!showInput); // This will toggle the state between true and false
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      // backgroundColor: "#beafce",
      background: `radial-gradient(circle at 49%,#eddbc7,#eddbc7 )`,
      borderWidth: "2px",
      borderColor: "#9d97d1",
      boxShadow: "none", // Sets border color
      "&:hover": {
        borderColor: "#4A5568", // Sets border color on hover
      },
      height: "50px", // Increase the height of the select box
      minHeight: "50px", // Ensure minimum height is also increased
      borderRadius: "15px",
      // other styles you want to apply to the control
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#e4cac9",
      borderRadius: "15px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#4A5568", // Sets color of the dropdown arrow
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "35px",
      padding: "0 6px",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "35px",
    }),
    option: (provided, state) => ({
      ...provided,

      backgroundColor: state.isDisabled ? "transparent" : "transparent",
      color: state.isDisabled ? "#ccc" : "black",
      cursor: state.isDisabled ? "not-allowed" : "default",
    }),
  };
  const handleSelectChange = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSelectedOption(selectedOption); // Update the state with the selected option
  };
  const formatOptionLabel = ({ label, icon }) => (
    <VuiBox style={{ display: "flex", alignItems: "center" }}>
      <img
        src={icon}
        alt={label}
        style={{
          marginRight: 10,
          width: "35px",
          height: "30px",
          borderRadius: "5px",
        }} // Adjust width and height as needed
      />

      <VuiTypography variant="button" fontWeight="medium" color="white">
        {label}
      </VuiTypography>
    </VuiBox>
  );

  const handleGenerateClick = async () => {
    console.log(prompt);
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-art", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // setImageUrl(data.image_url); // Update the state with the image URL
      setHistory([...history, { prompt: prompt, images: [data.image_url] }]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const handleDeleteImage = useCallback(() => {
    setImage(null); // Clear the image
    setImageLoading(false); // Ensure loading state is reset
    if (imageInputRef.current) {
      imageInputRef.current.value = ""; // Reset the file input
    }
  }, []);

  // Inline styles
  const styles = {
    // dashboardContainer: {
    //   display: 'flex',

    // },
    imggenContent: {
      flex: 1,
      // padding: "5px",
      color: colors.text.main,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "15px",
    },
    sectionMargin: {
      display: "flex",
      flexDirection: "row",
      // gap: "10px",t-
      padding: "5px",
    },
    inputWithButton: {
      flexGrow: 1,
      display: "flex",
      gap: "10px",
      alignItems: "center",
      justifyContent: "space-between",
    },

    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // backgroundColor: 'black',
      padding: "20px",
      borderRadius: "5px",
      //   width: "100%", // Use 100% width for responsiveness
      // maxWidth: "220px",

      gap: "10px",
    },
    title: {
      color: "white",
      marginBottom: "20px",
    },
    arrowUp: {
      marginLeft: "10px",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      marginTop:"20px",

      gap: "10px", // Adjust the space between grid items
    },
    gridItem: {
      minWidth: "30px", // Minimum width of the grid items
      minHeight: "30px", // Minimum height of the grid items
      flexBasis: "calc(50% - 25px)", // Adjust the width of grid items, accounting for gap
      flexGrow: 0,
      flexShrink: 0,
      aspectRatio: "1 / 1", // Keeps the item square
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      borderRadius: "10px",
      cursor: "pointer",
      boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      // Add any additional styling here
    },
    selectedGridItem: {
      border: "2px solid black",
    },
    // ..
    icon: {
      filter: "saturate(50%) hue-rotate(90deg)", // Example filter effect
      width: "20px",
      height: "20px",
    },
    flexContainer: {
      display: "flex",
      flexDirection: "row", // Change this to 'column' if you want vertical stacking
      justifyContent: "space-around", // This will space out the children evenly
      gap: "10px", // This adds space between the children
    },
  };

  return (
    <VuiBox>
      <main style={styles.imggenContent}>
        <VuiBox>
          <Card
            sx={({
              palette: { gradients, white },
              functions: { radialGradient },
            }) => ({
              background: radialGradient(
                "49%",
                "#e4bebc",
                colors.lightblue.main
              ),

              borderColor: "black",
              borderRadius: "25px",
            })}
          >
            {/* <Card sx={({
              palette: { gradients, white },
              functions: { radialGradient },
            }) => ({
              background: radialGradient(
                "49%",
                "#eddbc7",
                "#eddbc7",
               
                
              ),
              
              borderRadius: "25px",
            })}> */}

            <VuiBox style={styles.inputWithButton}>
              <VuiInput
                size="large"
                multiline
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
              />
              <VuiButton
                variant="gradient"
                color={sidenavColor}
                style={{ backgroundColor: colors.primary.main }}
                onClick={handleGenerateClick}
              >
                Generate
              </VuiButton>
              <VuiTypography
                variant="caption"
                fontWeight="regular"
                fontSize="5px"
                color="white"
              >
                This will use 14 credits.
              </VuiTypography>
            </VuiBox>
            {/* </Card> */}
          </Card>
        </VuiBox>
        <VuiBox display="flex" flexDirection="row" gap="45px" width="50%">
          {showInput && (
            <VuiInput
              size="large"
              multiline
              value={negprompt}
              onChange={(e) => setNegPrompt(e.target.value)}
              placeholder="Enter your prompt"
            />
          )}
        </VuiBox>
        <VuiBox display="flex" flexDirection="row" gap="45px">
          <VuiBox>
            <Select
              styles={customStyles}
              value={selectedModel}
              onChange={setSelectedModel}
              options={modelOptions}
              formatOptionLabel={formatOptionLabel}
              isSearchable={false}
            />
          </VuiBox>

          <VuiButton
            sx={{ width: "120px", minWidth: "100px", height: "50px" }}
            size="small"
            variant="gradient"
            color={sidenavColor}
            onClick={() => setOpen(!open)}
          >
            <VuiBox display="inherit" alignItems="center">
              <IconButton>
                <IoSettings size="20px" />
              </IconButton>
              <VuiTypography variant="button" fontWeight="medium" color="white">
                Settings
              </VuiTypography>
            </VuiBox>
          </VuiButton>

          <VuiBox style={styles.inputWithButton}>
            <VuiBox
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap="15px"
            >
              <VuiSwitch checked={showInput} onChange={handleToggleSwitch} />
              <VuiTypography
                variant="button"
                fontWeight="medium"
                color="white"
                padding="0px"
              >
                Add Negative Prompt
              </VuiTypography>
            </VuiBox>

            {/* Conditionally render the VuiInput based on the `showInput` state */}
          </VuiBox>
        </VuiBox>

        <Collapse in={open}>
          {/* <VuiBox style={styles.flexContainer}> */}
          <Grid
            container
            spacing={2}
            // style={{ display: 'flex', alignItems: 'stretch' }}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
            })}
          >
            <Grid
              item
              xs={12}
              md={6}
              xl={4.5}
              xxl={3.5}
              style={{ height: "100%" }}
              sx={({ breakpoints }) => ({
                // [breakpoints.only("xl")]: {
                //   gridArea: "2 / 1 / 3 / 3",
                // },
              })}
            >
              <Card
                variant="button"
                style={styles.sectionMargin}
                sx={({
                  breakpoints,
                  palette: { gradients, white },
                  functions: { radialGradient },
                }) => ({
                  background: radialGradient(
                    "69%",
                    colors.lightblue.main,
                    "#e4bebc"
                  ),
                  
                  
                  borderRadius: "25px",
                  // [breakpoints.only("xl")]: {
                  //   gridArea: "2 / 1 / 3 / 3",
                  // },
                })}
              >
                <VuiBox style={styles.container}>
                  <VuiTypography
                    variant="button"
                    fontWeight="regular"
                    color="white"
                    style={{
                      display: "inline-flex",

                      alignItems: "center",
                      marginRight: "0px", // Adjust space between text and icon if necessary
                    }}
                  >
                    Number of Images
                    <Tooltip title="Delete">
                      <IconButton
                        style={{
                          padding: "0px 0px 0px 10px",
                          display: "inline-flex",
                          verticalAlign: "bottom", // This aligns the icon with the baseline of the text
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
                          ...(selectedImageNumber === option &&
                            styles.selectedGridItem),
                        }}
                        sx={({
                          palette: { gradients, white },
                          functions: { linearGradient },
                        }) => ({
                          background: linearGradient("#e4bebc", "#9d97d1", 137),
                          borderRadius: "15px",
                        })}
                        onClick={() => setSelectedImageNumber(option)}
                      >
                        <VuiTypography
                          variant="button"
                          fontWeight="medium"
                          color="white"
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
                    color="white"
                    style={{
                      display: "inline-flex",

                      alignItems: "center",
                      marginRight: "0px", // Adjust space between text and icon if necessary
                    }}
                  >
                    Guidance Scale
                    <Tooltip title="Delete">
                      <IconButton
                        style={{
                          padding: "0px 0px 0px 10px",
                          display: "inline-flex",
                          verticalAlign: "bottom", // This aligns the icon with the baseline of the text
                        }}
                      >
                        <FaQuestionCircle size="15px" />
                      </IconButton>
                    </Tooltip>
                  </VuiTypography>
                  {/* <input
                        type="range"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(e.target.value)}
                      /> */}
                  <VuiBox
                    display="flex"
                    flexDirection="row"
                    gap="20px"
                    alignItems="center"
                  >
                    <Slider
                      defaultValue={7} // Set the default value to 7
                      step={1}
                      min={1}
                      max={12} // Set the maximum value to 12
                      valueLabelDisplay="auto"
                      onChange={(event, newValue) => setGuidance(newValue)}
                      sx={{
                        width: 120,
                        "& .MuiSlider-thumb": {
                          backgroundColor: "#e1eedc", // Change this to your preferred thumb color
                          border: "none",
                          "&:hover": {
                            boxShadow: "0px 0px 0px 8px rgba(0, 255, 0, 0.16)", // Optional: Adds a glow effect on thumb hover
                          },
                        },
                        "& .MuiSlider-track": {
                          height: "10px", // Adjust track thickness
                        },
                        "& .MuiSlider-rail": {
                          height: "10px", // Adjust rail thickness
                        },
                      }}
                    />
                    <VuiBox
                      display="flex"
                      sx={({
                        palette: { gradients, white },
                        functions: { linearGradient },
                      }) => ({
                        background: linearGradient("#e4bebc", "#9d97d1", 137),

                        padding: "5px",
                        borderRadius: "5px",
                      })}
                    >
                      <VuiTypography
                        variant="caption"
                        fontWeight="regular"
                        color="white"
                      >
                        {guidance}
                      </VuiTypography>
                    </VuiBox>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              xl={6}
              xxl={4.65}
              style={{ height: "100%" }}
              // sx={({ breakpoints }) => ({
              //   [breakpoints.only("xl")]: {
              //     gridArea: "2 / 1 / 3 / 3",
              //   },
              // })}
            >
              <Card
                variant="button"
                style={styles.sectionMargin}
                sx={({
                  palette: { gradients, white },
                  functions: { radialGradient },
                }) => ({
                  background: radialGradient(
                    "69%",
                    colors.lightblue.main,
                    "#e4bebc"
                  ),

                  borderRadius: "25px",
                })}
              >
                <VuiBox
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    padding: "15px",
                    alignItems: "start",
                  }}
                >
                  {/* Left-side Image Upload Section */}
                  <VuiBox
                    style={{
                      display: "flex",
                      flexDirection: "column", // Stack image upload and buttons vertically
                      alignItems: "flex-start",
                     
                      gap: "10px",
                    }}
                  >
                    <input
                      type="file"
                      ref={imageInputRef}
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                    <VuiBox
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "150px", // Larger square size
                        width: "150px", // Keep width and height the same for a square
                        margin: "0 auto",
                        backgroundImage: `url(${backgroundimg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={() =>
                        imageInputRef.current && imageInputRef.current.click()
                      }
                    >
                      {imageLoading && (
                        <VuiTypography>Loading...</VuiTypography>
                      )}
                      {!imageLoading && image && (
                        <>
                          <img
                            src={image}
                            alt="Uploaded"
                            style={{
                              height: "150px", // Larger square size
                              width: "150px", // Ensures image doesn't exceed container height
                              objectFit: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        </>
                      )}
                      {!imageLoading && !image && (
                        <VuiTypography
                          variant="button"
                          fontWeight="medium"
                          color="white"
                        >
                          Upload Image
                        </VuiTypography>
                      )}
                    </VuiBox>

                    {/* Smaller buttons for aspect ratio, upload, and delete at the bottom */}
                    <VuiBox
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <IconButton
                        style={{ fontSize: "0.8rem", marginRight: "25px" }}
                        sx={({
                          palette: { gradients, white },
                          functions: { linearGradient },
                        }) => ({
                          background: linearGradient("#e4bebc", "#9d97d1", 137),
                          borderRadius: "10px",
                        })}
                        title="Set Aspect Ratio"
                      >
                        <FaExpand size="1em" />
                      </IconButton>
                      <IconButton
                        onClick={() => imageInputRef.current.click()}
                        style={{ fontSize: "0.8rem", marginRight: "25px" }}
                        sx={({
                          palette: { gradients, white },
                          functions: { linearGradient },
                        }) => ({
                          background: linearGradient("#e4bebc", "#9d97d1", 137),
                          borderRadius: "1px",
                        })}
                        title="Upload New Image"
                      >
                        <FaUpload size="1em" />
                      </IconButton>
                      <IconButton
                        onClick={handleDeleteImage}
                        style={{ fontSize: "0.8rem" }}
                        sx={({
                          palette: { gradients, white },
                          functions: { linearGradient },
                        }) => ({
                          background: linearGradient("#e4bebc", "#9d97d1", 137),
                          borderRadius: "5px",
                        })}
                        title="Delete Image"
                      >
                        <FaTrashAlt size="1em" />
                      </IconButton>
                    </VuiBox>
                  </VuiBox>

                  {/* Right-side Control Panel Section */}
                  <VuiBox
                    style={{
                      
                      marginTop: "0px",
                      marginLeft: "30px",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "5px",
                      padding: "0px",
                    }}
                  >
                    <VuiBox
                      style={{
                        padding: "0px",
                        display: "flex", // Use flexbox layout
                        justifyContent: "flex-end", // Align children (VuiTypography) to the right
                        alignItems: "flex-start", // Align children to the top
                        width: "100%", // Take the full width of the parent container
                        // If VuiBox needs to be the full height of its container, uncomment the next line
                        // height: '100%',
                        // Ensure there's no other content in this VuiBox that might push the VuiTypography away from the corner
                      }}
                    >
                      <VuiTypography
                        variant="caption"
                        fontWeight="medium"
                        color="white"
                        sx={({
                          palette: { gradients, white },
                          functions: { linearGradient },
                        }) => ({
                          background: linearGradient("#e4bebc", "#9d97d1", 137),
                          fontSize: "10px",

                          padding: "6px", // Adjust space between text and icon if necessary
                          borderRadius: "5px",
                        })}
                      >
                        Image to Image
                      </VuiTypography>
                    </VuiBox>

                    {/* <VuiBox marginTop="0px" marginBottom="10px" width="140px">
                  <Select
                    
                    options={imageeOptions}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    getOptionLabel={(option) => (
                      <VuiBox display="flex"  alignItems="center">
                        <VuiTypography
                          variant="caption"
                          fontWeight="regular"
                          color="white"
                        >
                          {option.label}
                        </VuiTypography>
                      </VuiBox>
                    )} // If you want to set a default value
                    // Define other props like onChange if needed
                    
                  />
                  
                </VuiBox> */}
                    <VuiTypography
                      variant="button"
                      fontWeight="medium"
                      color="white"
                      style={{
                        display: "inline-flex",

                        alignItems: "center",
                        marginRight: "0px", // Adjust space between text and icon if necessary
                      }}
                    >
                      Description
                    </VuiTypography>
                    <VuiTypography
                      variant="caption"
                      fontWeight="regular"
                      color="white"
                      width="100%"
                      marginTop="5px"
                    >
                      Detects the color pattern, and the overall entire look
                      view of an input image, and will use this to guide your
                      image generations
                    </VuiTypography>
                    <VuiTypography
                      variant="button"
                      fontWeight="medium"
                      color="white"
                      style={{
                        display: "inline-flex",
                        marginTop: "10px",
                        alignItems: "center",
                        marginRight: "0px", // Adjust space between text and icon if necessary
                      }}
                    >
                      Strength
                      <Tooltip title="Delete">
                        <IconButton
                          style={{
                            padding: "0px 0px 0px 10px",
                            display: "inline-flex",
                            verticalAlign: "bottom", // This aligns the icon with the baseline of the text
                          }}
                        >
                          <FaQuestionCircle size="15px" />
                        </IconButton>
                      </Tooltip>
                    </VuiTypography>
                    <VuiBox
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap="15px"
                    >
                      <Slider
                        defaultValue={0.5}
                        // step={10}
                        step={0.01}
                        min={0}
                        max={1}
                        // valueLabelDisplay="auto"
                        onChange={(e, val) => setControlNetWeight(val)}
                        sx={{
                          width: 120,

                          "& .MuiSlider-thumb": {
                            backgroundColor: "#e1eedc", // Change this to your preferred thumb color
                            border: "none",
                            "&:hover": {
                              boxShadow:
                                "0px 0px 0px 8px rgba(0, 255, 0, 0.16)", // Optional: Adds a glow effect on thumb hover
                            },
                          },
                          "& .MuiSlider-track": {
                            height: "10px", // Adjust track thickness
                          },
                          "& .MuiSlider-rail": {
                            height: "10px", // Adjust rail thickness
                          },
                        }}
                      />
                      <VuiBox
                        display="flex"
                        sx={({
                          palette: { gradients, white },
                          functions: { linearGradient },
                        }) => ({
                          background: linearGradient("#e4bebc", "#9d97d1", 137),

                          padding: "5px",
                          borderRadius: "5px",
                        })}
                      >
                        <VuiTypography
                          variant="caption"
                          fontWeight="regular"
                          color="white"
                        >
                          {controlNetWeight}
                        </VuiTypography>
                      </VuiBox>
                    </VuiBox>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              xl={4.5}
              xxl={3.5}
              style={{ height: "100%" }}
            >
              <Card
                variant="button"
                style={styles.sectionMargin}
                sx={({
                  palette: { gradients, white },
                  functions: { radialGradient },
                }) => ({
                  background: radialGradient(
                    "69%",
                    colors.lightblue.main,
                    "#e4bebc"
                  ),

                  borderRadius: "25px",
                })}
              >
                <VuiBox style={styles.container}>
                  <VuiTypography
                    variant="button"
                    fontWeight="regular"
                    color="white"
                    style={{
                      display: "inline-flex",

                      alignItems: "center",
                      marginRight: "0px", // Adjust space between text and icon if necessary
                    }}
                  >
                    Seed
                    <Tooltip title="Delete">
                      <IconButton
                        style={{
                          padding: "0px 0px 0px 10px",
                          display: "inline-flex",
                          verticalAlign: "bottom", // This aligns the icon with the baseline of the text
                        }}
                      >
                        <FaQuestionCircle size="15px" />
                      </IconButton>
                    </Tooltip>
                  </VuiTypography>

                  <VuiInput
                    padding="10px 0px"
                    size="small"
                    placeholder="Fixed seed"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                  />
                  <VuiBox
                    padding="10px 0px"
                    display="flex"
                    flexDirection="row"
                    gap="10px"
                    alignItems="center"
                  >
                    <VuiTypography
                      variant="caption"
                      fontWeight="regular"
                      color="white"
                      padding="0px"
                    >
                      Randomize Seed
                    </VuiTypography>

                    <VuiBox
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      gap="15px"
                    >
                      <VuiSwitch
                        checked={showInput}
                        onChange={handleToggleSwitch}
                      />
                    </VuiBox>
                  </VuiBox>
                </VuiBox>
                <VuiBox style={styles.container}>
                  <VuiTypography
                    variant="button"
                    fontWeight="regular"
                    color="white"
                    style={{
                      display: "inline-flex",

                      alignItems: "center",
                      marginRight: "0px", // Adjust space between text and icon if necessary
                    }}
                  >
                    Scheduler
                    <Tooltip title="Delete">
                      <IconButton
                        style={{
                          padding: "0px 0px 0px 10px",
                          display: "inline-flex",
                          verticalAlign: "bottom", // This aligns the icon with the baseline of the text
                        }}
                      >
                        <FaQuestionCircle size="15px" />
                      </IconButton>
                    </Tooltip>
                  </VuiTypography>
                  {/* <input
                        type="range"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(e.target.value)}
                      /> */}
                  {/* <Slider
                defaultValue={5}
                step={1}
                marks
                min={1}
                max={5}
                valueLabelDisplay="auto"
                onChange={(event, newValue) => setNumColumns(newValue)}
              /> */}
                </VuiBox>
                <VuiBox style={styles.container}>
                  <VuiTypography
                    variant="button"
                    fontWeight="regular"
                    color="white"
                    style={{
                      display: "inline-flex",

                      alignItems: "center",
                      marginRight: "0px", // Adjust space between text and icon if necessary
                    }}
                  >
                    Scheduler
                    <Tooltip title="Delete">
                      <IconButton
                        style={{
                          padding: "0px 0px 0px 10px",
                          display: "inline-flex",
                          verticalAlign: "bottom", // This aligns the icon with the baseline of the text
                        }}
                      >
                        <FaQuestionCircle size="15px" />
                      </IconButton>
                    </Tooltip>
                  </VuiTypography>
                  {/* <input
                        type="range"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(e.target.value)}
                      /> */}
                  {/* <Slider
                defaultValue={5}
                step={1}
                marks
                min={1}
                max={5}
                valueLabelDisplay="auto"
                onChange={(event, newValue) => setNumColumns(newValue)}
              /> */}
                </VuiBox>
              </Card>
            </Grid>
            {/* onClick={handleAspectRatio} */}
          </Grid>
        </Collapse>
        <ImageGenerationHistory history={history} />
      </main>
    </VuiBox>
  );
};
export default ImgGen;
