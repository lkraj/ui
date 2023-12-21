import React, { useState } from 'react';
import { Card, Modal, Grid, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import './FeaturedModelCard.css';
import ImageFeedCard from '../ImageFeedCard/ImageFeedCard';
import colors from "assets/theme/base/colors.js";
import Divider from "@mui/material/Divider";
import Masonry from 'react-masonry-css';

import {
  useVisionUIController
} from "context";
import image1 from '../../../assets/images/Image (1).jpeg';
import image7 from '../../../assets/images/Image (7).jpg';
const FeaturedModelCard = ({ image, heading, text, fullText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [controller, dispatch] = useVisionUIController();
  const getGridListCols = () => {
  if (window.innerWidth >= 1100) {
    return 4;
  }
  if (window.innerWidth >= 768) {
    return 3;
  }
  return 2; // For smaller devices
};
  const generatedImages = [
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    { src: image1, alt: 'Image 1' },
    { src: image7, alt: 'Image 1' },
    
    // ... add paths to other local images
  ];
  const breakpointColumnsObj = {
    default: 4,
    1680:4,
    1440:4,
    
    1100: 4,
    900:3,
    768:3,
    700: 3,
    650:2,
    500: 2,
    425:2,
    375:2
  };
  const displayedImages = generatedImages.slice(0, 12);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <VuiBox>
      <Card 
        onClick={handleOpen}
        sx={{
         
          height: "280px",
          width: {
            xs: '95%', // full width on extra-small screens
            sm: '95%', // half width on small screens
            md: '95%', // third width on medium screens
            lg: '95%', // quarter width on large screens
            xl: '95%', // one fifth width on extra-large screens
          },
          margin: "0 10px 10px 10px",
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

    
        <Modal
        open={isOpen}
        onClose={handleClose}
      >
          <VuiBox className="modal" onClick={handleClose}>
          <Grid container  className="modal-content" onClick={e => e.stopPropagation()}>
              
              <VuiBox className="modal-top"  >
              <Grid item xs={12} md={6} className="modal-image">
                  <img src={image} alt={heading} />
                </Grid>
                <Grid item xs={12} md={6} className="image-caption">
                  
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
                </Grid>
              </VuiBox>
              
             <Grid mt={3} item xs={12}>
              <div mb={3} className="parent-container"><h3 className="gradient-text">Images created using this model</h3></div>
             
          <VuiBox className="grid-container">
  {generatedImages.map((imgSrc, index) => (
    <div key={index} className="grid-item">
      
      <ImageFeedCard
        image={imgSrc}
        disableOverlay={true}
        customClass="modal-image-card"
      />
    </div>
  ))}
</VuiBox>

<div className="parent-container">
<VuiButton  sx = {({ palette: { gradients }, functions: { linearGradient } }) => ({
          background: linearGradient("#e4bebc", "#9d97d1", 137),
          alignItems: "center",
              justifySelf: "flex-end",
              cursor: "pointer",

              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translate(2px, -0.5px)`,
                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
              },

              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                transform: `translate(6px, -0.5px)`,
              },
          })}>View More<Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon></VuiButton>
       </div> </Grid>
              <span className="close" onClick={handleClose}>&times;</span>

            </Grid>
          </VuiBox>
       
      </Modal>
    </VuiBox>
  );
};

export default FeaturedModelCard;
