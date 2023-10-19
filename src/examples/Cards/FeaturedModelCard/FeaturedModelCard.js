import React, { useState } from 'react';
import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import './FeaturedModelCard.css';
import image1 from '../../../assets/images/Image (1).jpeg';
import image7 from '../../../assets/images/Image (7).jpg';
const FeaturedModelCard = ({ image, heading, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [generatedImages] = useState([
    image1,
    image7,
    image1,
    image7,
    image1,
    image7,
    image1,
    image7,
    image1,
    image7,
    // ... add paths to other local images
  ]);

  const handleOpen = () => {
    setIsOpen(true);
    document.body.classList.add('no-scroll');
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <div>
      <Card 
        onClick={handleOpen}
        sx={{
          height: "280px",
          width:"280px",
          margin: "0 10px 20px 10px",
        }}
      >
       <VuiBox height="70%" width="100%">
          <img src={image} alt={heading} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </VuiBox>
        <VuiBox height="50%" display="flex" flexDirection="column" justifyContent="space-between">
          <VuiBox>
            <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
              {heading}
            </VuiTypography>
            <VuiTypography color="white" variant="h6" fontWeight="regular" mb="auto">
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
          <div className="modal" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              
              <div className="model-header">
                {/* <div className="model-logo">L</div>
                <span className="model-name">Leonardo</span>
                <span className="model-tag">Finetuned Model</span> */}
              </div>
              
              <div className="modal-top">
                <div className="modal-image">
                  <img src={image} alt={heading} />
                </div>
                <div className="image-caption">
                  <h2>{heading}</h2>
                  <p>{text}</p>
                  <button className="generate-btn">Generate with this Model</button>
                </div>
              </div>
              
              <div className="divider"></div>
              <h3 className= "gradient-text">Images created using this model</h3>
              <div className="modal-bottom">
                <div className="image-grid">
                  {generatedImages.map((imgSrc, index) => (
                    <div key={index} className="image-item">
                      <img src={imgSrc} alt={`Generated Image ${index}`} />
                    </div>
                  ))}
                </div>
                <button className="view-more-btn">View More</button>
              </div>

              <span className="close" onClick={handleClose}>&times;</span>

            </div>
          </div>
        </VuiBox>
      )}
    </div>
  );
};

export default FeaturedModelCard;
