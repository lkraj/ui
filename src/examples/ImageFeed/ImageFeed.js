import React, { useState } from 'react';
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
  
  const images = [                              
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image8, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },
    { src: image9, alt: 'Image 1' },                        
    { src: image8, alt: 'Image 1' },
    
    // ... more images
  ];

  const breakpointColumnsObj = {
    default: numColumns,
    1100: numColumns,
    700: numColumns > 2 ? 2 : numColumns,
    500: 1
  };

  return (
    <div className="image-feed-wrapper">
      <div className="slider-container">
        <Slider
          value={numColumns}
          onChange={(event, newValue) => setNumColumns(newValue)}
          defaultValue={3}
          step={1}
          marks
          min={1}
          max={5}
          valueLabelDisplay="auto"
        />
      </div>
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
