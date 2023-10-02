import React, { useState, useEffect, useRef } from "react";
import { Modal, Slider } from "@mui/material";

import image1 from '../../assets/images/Image (1).jpeg';
import image2 from '../../assets/images/Image (1).jpg';
import image3 from '../../assets/images/Image (1).png';
import image4 from '../../assets/images/Image (2).png';
import image5 from '../../assets/images/Image (3).png';

const ImageFeed = () => {
  const [images, setImages] = useState([image1, image2, image3, image4, image5, image3, image4, image5]);
  const [numColumns, setNumColumns] = useState(4);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          // User has scrolled to the bottom, load more images
          setImages(prevImages => [...prevImages, ...images]); // Duplicate the images for demonstration
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
  }, [images]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
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
        defaultValue={4}
        step={1}
        marks
        min={1}
        max={5}
        valueLabelDisplay="auto"
        onChange={(event, newValue) => setNumColumns(newValue)}
      />

      <div ref={containerRef} style={{ display: 'flex', gap: '16px', height: '80vh', overflowY: 'scroll' }}>
        {imageChunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} style={{ flex: 1 }}>
            {chunk.map((image, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <img
                  src={image}
                  alt="Image"
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '5px' }}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '90%', maxHeight: '90%' }} />
        </div>
      </Modal>
    </div>
  );
};

export default ImageFeed;
