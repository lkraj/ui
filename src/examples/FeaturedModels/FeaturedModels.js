import React, { useState } from 'react';
import FeaturedModelCard from '../Cards/FeaturedModelCard/FeaturedModelCard';
import './FeaturedModels.css';
import VuiButton from 'components/VuiButton';
import { MdNavigateNext } from 'react-icons/md';
import { MdNavigateBefore } from 'react-icons/md';
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import image1 from '../../assets/images/Image (5).png';
import image7 from '../../assets/images/Image (7).jpg';
import image8 from '../../assets/images/Image (8).jpg';
import image9 from '../../assets/images/Image (9).jpg';

const FeaturedModels = () => {
  const modelsData = [
    {
      image: image7,
      heading: 'Model Name 1',
      text: 'Model description 1'
    },
    {
      image: image8,
      heading: 'Model Name 2',
      text: 'Model description 2'
    },
    {
      image: image9,
      heading: 'Model Name 2',
      text: 'Model description 2'
    },
    {
      image: image1,
      heading: 'Model Name 3',
      text: 'Model description 2'
    },
    {
      image: image8,
      heading: 'Model Name 3',
      text: 'Model description 2'
    }, {
      image: image9,
      heading: 'Model Name 2',
      text: 'Model description 2'
    },
    {
      image: image1,
      heading: 'Model Name 3',
      text: 'Model description 2'
    },
    {
      image: image8,
      heading: 'Model Name 3',
      text: 'Model description 2'
    },
    
    // ... add other model data here
  ];
  const [controller, dispatch] = useVisionUIController();
  const {sidenavColor } = controller;
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToDisplay = 5; // Number of cards to display at once

  const displayedCards = modelsData.slice(currentIndex, currentIndex + cardsToDisplay);

  const modelCards = displayedCards.map((model, index) => (
    <FeaturedModelCard 
      key={index} 
      image={model.image} 
      heading={model.heading} 
      text={model.text} 
    />
  ));

  const handleNextClick = () => {
    if (currentIndex + 1 < modelsData.length) {
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
            disabled={currentIndex + cardsToDisplay - 1 >= modelsData.length}
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