import React, { useState } from 'react';
import FeaturedModelCard from '../Cards/FeaturedModelCard/FeaturedModelCard';
import './FeaturedModels.css';
import VuiButton from 'components/VuiButton';
import { MdNavigateNext } from 'react-icons/md';
import { MdNavigateBefore } from 'react-icons/md';
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import modelData from './modelData'; // Import the modelData
const FeaturedModels = () => {
  
  const [controller, dispatch] = useVisionUIController();
  const {sidenavColor } = controller;
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToDisplay = 5; // Number of cards to display at once

  const displayedCards = modelData.slice(currentIndex, currentIndex + cardsToDisplay);
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
  const modelCards = displayedCards.map((model, index) => (
    <FeaturedModelCard 
      key={index} 
      image={model.image} 
      heading={model.heading}  
      text={truncateText(model.text, 50)} // Truncate text to 100 characters (or your preferred length)
      fullText={model.text} 
      isTextTruncated={true}
    />
  ));

  const handleNextClick = () => {
    if (currentIndex + 1 < modelData.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="featured-models">
      <div className="featured-models-header">
        <h3>Featured Models</h3>
        <div className="buttons-container">
          <VuiButton 
            size="small"
            variant="gradient" 
            iconOnly 
            color={sidenavColor}
            onClick={handlePrevClick} 
            disabled={currentIndex <= 0}
          >
            <MdNavigateBefore size="35px" color="inherit"/>
          </VuiButton>
          <VuiButton 
            size="small"
            variant="gradient"
            circular 
            iconOnly 
            color={sidenavColor} 
            onClick={handleNextClick} 
            disabled={currentIndex + cardsToDisplay - 1 >= modelData.length}
          >
            <MdNavigateNext size="35px" color="inherit"/>
          </VuiButton>
        </div>
      </div>
      <div className="cards-container">
        {modelCards}
      </div>
    </div>
  );
  
  
}

export default FeaturedModels;