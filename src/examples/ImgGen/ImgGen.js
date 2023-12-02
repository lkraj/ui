import React, { useState, useRef } from "react";
import { Slider, Collapse } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import VuiTypography from "components/VuiTypography";
import VuiAlert from "components/VuiAlert";
import colors from "assets/theme/base/colors.js";
import Card from "@mui/material/Card";
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
import backgroundimg from "../../assets/images/upload-image.png";
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
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      borderColor: "#4A5568",
      boxShadow: "none", // Sets border color
      "&:hover": {
        borderColor: "#4A5568", // Sets border color on hover
      },
      height: "50px", // Increase the height of the select box
      minHeight: "50px", // Ensure minimum height is also increased
      borderRadius: "10px",
      // other styles you want to apply to the control
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#e4cac9",
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
  const handleDeleteImage = () => {
    // This will remove the image from the state and the input will no longer have a file selected
    setUploadedImage(null);

    // If you're also managing the file through a ref to an <input type="file" />,
    // you'll need to reset it as well
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Inline styles
  const styles = {
    // dashboardContainer: {
    //   display: 'flex',

    // },
    imggenContent: {
      flex: 1,
      padding: "20px",
      color: colors.text.main,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "20px",
    },
    sectionMargin: {
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      padding: "5px",
    },
    inputWithButton: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    marginTop: {
      display: "flex",
      gap: "10px",
      padding: "20px",
      flexDirection: "column",
    },

    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // backgroundColor: 'black',
      padding: "20px",
      borderRadius: "5px",
      width: "190px",
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
      justifyContent: "center", // This centers the items in the row
      alignItems: "center", // This centers the rows in the container vertically
      padding: "10px", // Add padding to ensure there's space around the items within the container
    },
    gridItem: {
      width: "calc(50% - 20px)", // Adjust width for desired size and spacing between items
      height: "40px", // Increase height as needed
      margin: "10px", // This margin creates space between the grid items
      display: "flex",
      minWidth: "30px",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      border: "1px solid transparent",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)", // Optional: adds a subtle shadow for depth
      transition: "all 0.3s ease", // Optional: smooth transition for hover effects
    },
    selectedGridItem: {
      border: "2px solid black",
    },
  };

  return (
    <VuiBox>
      <main style={styles.imggenContent}>
        <VuiBox>
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
        </VuiBox>

        <VuiBox display="flex" flexDirection="row" gap="15px">
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
          {/* <VuiButton variant="gradient" color={sidenavColor} style={{ backgroundColor: colors.primary.main }} onClick={() => setOpen(!open)}>
                      More settings
                    </VuiButton> */}
        </VuiBox>
        {/* <Collapse in={open} > */}
        <VuiBox display="flex" flexDirection="row" gap="35px">
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
                "#e4bebc",
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
                "#e4bebc",
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
                    backgroundImage: uploadedImage
                      ? `url(${URL.createObjectURL(uploadedImage)})`
                      : `url(${backgroundimg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() =>
                    imageInputRef.current && imageInputRef.current.click()
                  }
                >
                  {!uploadedImage && (
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
                  flex: 2,
                  marginLeft: "30px",
                  display: "flex",
                  flexDirection: "column",
                  width: "350px",
                }}
              >
                <VuiBox>
                  <VuiTypography
                  variant="caption"
                  fontWeight="medium"
                  color="white"
                  style={{
                    display: "inline-flex",
                    backgroundColor: "#9d97d1",
                    alignItems: "center",
                    padding: "5px", // Adjust space between text and icon if necessary
                    borderRadius:"10px"
                  }}
                >
                 Image to Image
                </VuiTypography>
                </VuiBox>
                
                <VuiBox width="160px">
                  <Select
                    options={imageeOptions}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    getOptionLabel={(option) => (
                      <VuiBox display="flex" alignItems="center">
                        <VuiTypography
                          variant="button"
                          fontWeight="regular"
                          color="white"
                        >
                          {option.label}
                        </VuiTypography>
                      </VuiBox>
                    )} // If you want to set a default value
                    // Define other props like onChange if needed
                  />
                </VuiBox>
                <VuiTypography
                  variant="h6"
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
                >
                  Detects the color pattern, and the overall entire look view of an input image, and will use this to guide your image
                  generations
                </VuiTypography>
                <VuiTypography
                  variant="h6"
                  fontWeight="medium"
                  color="white"
                  style={{
                    display: "inline-flex",

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
                <Slider
                  defaultValue={90}
                  // step={10}
                  marks
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  onChange={(e, val) => setControlNetWeight(val)}
                  sx={{
                    height: 8,
                    width: 150,
                  }}
                />
              </VuiBox>
            </VuiBox>
          </Card>

          {/* onClick={handleAspectRatio} */}
        </VuiBox>

        {/* </Collapse> */}
        <ImageGenerationHistory history={history} />
      </main>
    </VuiBox>
  );
};
export default ImgGen;
