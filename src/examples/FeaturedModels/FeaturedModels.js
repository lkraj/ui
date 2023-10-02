import React, { useState } from 'react';
import FeaturedModelCard from '../Cards/FeaturedModelCard/FeaturedModelCard';
import './FeaturedModels.css';
import image1 from '../../assets/images/Image (1).jpeg';
import image7 from '../../assets/images/Image (7).jpg';
import image8 from '../../assets/images/Image (8).jpg';
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
      image: image1,
      heading: 'Model Name 2',
      text: 'Model description 2'
    },
    {
      image: image1,
      heading: 'Model Name 3',
      text: 'Model description 2'
    },
    {
      image: image1,
      heading: 'Model Name 3',
      text: 'Model description 2'
    },
    {
      image: image1,
      heading: 'Model Name 4',
      text: 'Model description 2'
    },
    {
      image: image1,
      heading: 'Model Name 4',
      text: 'Model description 2'
    },
    // ... add other model data here
  ];

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
    if (currentIndex + cardsToDisplay < modelsData.length) {
      setCurrentIndex(currentIndex + cardsToDisplay);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - cardsToDisplay);
    }
  };

  return (
    <div className="featured-models">
      <h2>Featured Models</h2>
      <div className="cards-container">
        {modelCards}
      </div>
      {currentIndex > 0 && <button className="prev-button" onClick={handlePrevClick}>Previous</button>}
      {currentIndex + cardsToDisplay < modelsData.length && <button className="next-button" onClick={handleNextClick}>Next</button>}
    </div>
  );
}

export default FeaturedModels;
