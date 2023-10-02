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
          height: "280px",
          width:"280px",
          margin: "0 10px 20px 10px"
        }}
      >
        <VuiBox height="70%" width="100%">
          <img src={image} alt={heading} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: "" }} />
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
