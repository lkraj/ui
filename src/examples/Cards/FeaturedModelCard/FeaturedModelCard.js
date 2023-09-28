import React, { useState } from 'react';
import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import './FeaturedModelCard.css';

const FeaturedModelCard = ({ image, heading, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Card 
        onClick={handleOpen}
        sx={{
          height: "340px",
          py: "32px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "50%"
        }}
      >
        <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
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
        <div className="modal" onClick={handleClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={handleClose}>&times;</span>
            <img src={image} alt={heading} />
            <h3>{heading}</h3>
            <p>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedModelCard;
