import React, { useState, useEffect } from 'react';
import FeaturedModelCard from '../Cards/FeaturedModelCard/FeaturedModelCard';
import VuiButton from 'components/VuiButton';
import VuiBox from 'components/VuiBox';
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import modelData from './modelData';
const getCardsToShow = (width) => {
  if (width > 1200) return 5;
  if (width > 992) return 4;
  if (width > 768) return 3;
  if (width > 576) return 2;
  return 1; // Default to 1 for smallest screens
};

const calculateTransform = (currentIndex, cardsToShow, cardCount) => {
  // Calculate the maximum index for which the last card is fully visible
  const maxIndex = cardCount - cardsToShow;
  // Ensure the current index does not exceed the maximum index
  return Math.min(currentIndex, maxIndex);
};
const FeaturedModels = () => {
  const [controller, dispatch] = useVisionUIController();
  const {sidenavColor } = controller;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow(window.innerWidth));
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setCardsToShow(getCardsToShow(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, modelData.length - cardsToShow));
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  

  // Function to truncate the text
  const truncateText = (text, length) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  // Function to handle next click
  const marginLeft = -(currentIndex * (100 / cardsToShow)) + "%";

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '20px' ,}}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Featured Models</h3>
        <div >
        <VuiButton 
            size="small"
            variant="gradient" 
            iconOnly 
            color={sidenavColor}
            onClick={handlePrevClick} 
            disabled={currentIndex === 0}
            style={{ marginRight: '5px' }}
          >
            <MdNavigateBefore size="35px" color="inherit"/>
          </VuiButton>
          <VuiButton 
            size="small"
            variant="gradient"
            iconOnly 
            color={sidenavColor}
            onClick={handleNextClick} 
            disabled={currentIndex >= modelData.length - cardsToShow}
          >
            <MdNavigateNext size="35px" color="inherit"/>
          </VuiButton>
        </div>
      </div>
      <div style={{
          display: 'flex',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
        
      }}>
        {modelData.map((model, index) => (
          <div key={index} style={{ flex: '0 0 auto', width: `${100 / cardsToShow}%`, boxSizing: 'border-box' }}>
            <FeaturedModelCard
              image={model.image}
              heading={model.heading}
              text={truncateText(model.text, 50)}
              fullText={model.text}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedModels;