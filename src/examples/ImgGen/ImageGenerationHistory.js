import React from 'react';
import VuiBox from 'components/VuiBox';
import VuiButton from 'components/VuiButton'; 
 import VuiTypography from 'components/VuiTypography';
 import {AiOutlineHistory} from "react-icons/ai";
 import Icon from "@mui/material/Icon";
const ImageGenerationHistory = ({ history }) => {
  return (
    <VuiBox>
   
        <VuiTypography
          
            fontWeight="medium"
            color= "white">
    <h3>Generation history </h3>
        </VuiTypography>
        <Icon><AiOutlineHistory size="25px" color="inherit" /></Icon>
    {history.slice(-5).map((generation, index) => (
      <VuiBox key={index} mb={3}>
        <VuiBox mb={2}  style={{ padding: '5px' }}>
        <VuiTypography
                      variant="h6"
                      fontWeight="medium"
                      color= "white"

                      >
                    "{generation.prompt}" 
                    </VuiTypography> 
        </VuiBox>
        <VuiBox style={{ display: 'flex', gap: '10px' }}>
          {generation.images.map((imageSrc, imgIndex) => (
            <div key={imgIndex} >
              <img src={imageSrc} alt={`Generated from: ${generation.prompt}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </VuiBox>
      </VuiBox>
    ))}
    <VuiButton >Load More</VuiButton>
  </VuiBox>
);
};

export default ImageGenerationHistory;
