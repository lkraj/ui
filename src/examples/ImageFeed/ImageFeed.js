import React, { useState, useEffect, useRef } from "react";
import { Modal, Slider } from "@mui/material";
import VuiBox from 'components/VuiBox';
import VuiInput from 'components/VuiInput';
import VuiButton from 'components/VuiButton';
import VuiSwitch from 'components/VuiSwitch';
import image1 from '../../assets/images/Image (1).jpeg';
import image2 from '../../assets/images/Image (1).jpg';
import image3 from '../../assets/images/Image (1).png';
import image4 from '../../assets/images/Image (2).png';
import image5 from '../../assets/images/Image (3).png';
import './ImageFeed.css';

const imageTexts = {
  image1: 'Image 1 Description',
  image2: 'Image 2 Description',
  // ... other image texts
};


const ImageFeed = ({ hideScrollbar = false }) => {
  const [images, setImages] = useState([image1, image2, image3, image4, image5]);
  const [numColumns, setNumColumns] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const [hoverText, setHoverText] = useState("Default hover text");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          // User has scrolled to the bottom, load more images
          setImages(prevImages => [...prevImages, ...prevImages.slice(0, numColumns)]); // Load more images
        }
      }
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [images, numColumns]);

  const handleImageClick = (image,text) => {
    setSelectedImage(image);
    setOpenModal(true);
    setHoverText(text);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const imageChunks = chunkArray(images, Math.ceil(images.length / numColumns));

  return (
    <div>
      <Slider
        defaultValue={5}
        step={1}
        marks
        min={1}
        max={5}
        valueLabelDisplay="auto"
        onChange={(event, newValue) => setNumColumns(newValue)}
      />

<VuiBox className={`image-feed-container ${hideScrollbar ? 'hide-scrollbar' : ''}`} ref={containerRef} sx={{ display: 'flex', gap: '16px', height: '80vh', overflowY: 'scroll' }}>
{imageChunks.map((chunk, chunkIndex) => (
      <VuiBox key={chunkIndex} sx={{ flex: 1 }}>
        {chunk.map((image, index) => (
          <div className="image-container" key={index} onClick={() => handleImageClick(image, "Your specific text for this image")}>
            <img
              src={image}
              alt="Image"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '5px' }}
            />
            <div className="image-text">{hoverText}</div>
          </div>
        ))}
      </VuiBox>
        ))}
      </VuiBox>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <VuiBox sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          outline: 'none'
        }}>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', borderRadius: '5px' }}
          />
          {hoverText && (
            <VuiBox sx={{ mt: 2 }}>
              <h2>Prompt</h2>
              <p>{hoverText}</p>
            </VuiBox>
          )}
        </VuiBox>
      </Modal>
    </div>
  );
};

export default ImageFeed;
