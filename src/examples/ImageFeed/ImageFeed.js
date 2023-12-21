import React, { useState, useEffect } from 'react';
import { Slider, Modal, Box } from '@mui/material';
import Masonry from 'react-masonry-css';
import './ImageFeed.css';
import image1 from '../../assets/images/Image (5).png';
import image7 from '../../assets/images/Image (7).jpg';
import image8 from '../../assets/images/Image (8).jpg';
import image9 from '../../assets/images/Image (9).jpg';
import ImageFeedCard from '../Cards/ImageFeedCard/ImageFeedCard'; // Adjust the path as necessary
import './ImageFeed.css'; // Ensure this CSS file exists and is correctly styled

const ImageFeed = () => {
  const [numColumns, setNumColumns] = useState(5);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setViewportWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const images = [                              
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image8, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },                        
    { src: image8, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image8, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },                        
    { src: image8, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image8, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },                        
    { src: image8, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image8, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },                        
    { src: image8, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image8, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },                        
    { src: image8, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image8, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },                        
    { src: image8, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image8, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },                        
    { src: image8, alt: 'Image 1' },
    
    // ... more images
  ];
  const getMaxColumns = () => {
    if (viewportWidth <= 500) return 1;
    if (viewportWidth <= 700) return 2;
    return 5;
  };

  const maxColumns = getMaxColumns();
  const sliderVisible = maxColumns > 1;
  const breakpointColumnsObj = {
    default: numColumns,
    1100: numColumns,
    700: numColumns > 2 ? 2 : numColumns,
    500: 1
  };

  return (
    <div className="image-feed-wrapper">
      {sliderVisible && (
        <div className="slider-container">
          <Slider
            value={numColumns}
            onChange={(event, newValue) => setNumColumns(newValue)}
            defaultValue={3}
            step={1}
            marks
            min={1}
            max={maxColumns}
            valueLabelDisplay="auto"
          sx={{
            

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
      </div>
      
      )}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          <ImageFeedCard
            key={index}
            image={image}
            
          />
        ))}
      </Masonry>
    </div>
  );
};

export default ImageFeed;
