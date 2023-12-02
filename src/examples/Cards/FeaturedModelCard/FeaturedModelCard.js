import React, { useState } from 'react';
import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import './FeaturedModelCard.css';
import ImageFeedCard from '../ImageFeedCard/ImageFeedCard';
import colors from "assets/theme/base/colors.js";
import Divider from "@mui/material/Divider";
import {
  useVisionUIController
} from "context";
import image1 from '../../../assets/images/Image (1).jpeg';
import image7 from '../../../assets/images/Image (7).jpg';
const FeaturedModelCard = ({ image, heading, text, fullText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [controller, dispatch] = useVisionUIController();
  const generatedImages = [
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    
    // ... add paths to other local images
  ];

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <Card 
        onClick={handleOpen}
        sx={{
          height: "280px",
          width:"280px",
          margin: "0 10px 20px 10px",
        }}
        className='card'
      >
       <VuiBox height="70%" width="100%">
          <img src={image} alt={heading} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </VuiBox>
        <VuiBox height="50%" display="flex" flexDirection="column" lineHeight={1} >
          <VuiBox className="card-text">
            <VuiTypography color="text" variant="h6" fontWeight="medium" mt="5px">
              {heading}
            </VuiTypography>
            <VuiTypography color="white" variant="caption" fontWeight="regular" >
              {text}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </Card>

      {isOpen && (
        <VuiBox sx = {({ palette: { gradients }, functions: { linearGradient } }) => ({
          backgroundColor: linearGradient(
            gradients.navbar.main,
            gradients.navbar.state,
            gradients.navbar.deg
          )})}>
          <VuiBox className="modal" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              
              <VuiBox className="modal-top"  >
                <VuiBox className="modal-image">
                  <img src={image} alt={heading} />
                </VuiBox>
                <VuiBox className="image-caption">
                  
                <VuiTypography
                      variant="h3"
                      fontWeight="bold"
                      color="white"
                      style={{ marginBottom: '1rem' }} 
                    >
                      {heading}
                    </VuiTypography>
                    <VuiBox mb={2} lineHeight={1}>
          <VuiTypography variant="button" color="text" fontWeight="regular">
          {fullText}
          </VuiTypography>
        </VuiBox>
                    
                  <VuiButton  sx = {({ palette: { gradients }, functions: { linearGradient } }) => ({
          background: linearGradient("#e4bebc", "#9d97d1", 137)
          })}>Generate with this Model</VuiButton>
                </VuiBox>
              </VuiBox>
 
              <h3 className= "gradient-text">Images created using this model</h3>
              <div className="modal-bottom">
                <div className="image-grid">
                  {generatedImages.map((imgSrc, index) => (
                    
                    <ImageFeedCard
                    key={index}
                    image={imgSrc}
                    customClass="modal-image-card"
                  />
                  ))}
                </div>
                <VuiButton className="view-more-btn">View More</VuiButton>
              </div>

              <span className="close" onClick={handleClose}>&times;</span>

            </div>
          </VuiBox>
        </VuiBox>
      )}
    </div>
  );
};

export default FeaturedModelCard;
