import React from 'react';
import FeaturedModelCard from '../Cards/FeaturedModelCard/FeaturedModelCard';
import './AllModels.css'; // You might want to create a new CSS file for this component
import image1 from '../../assets/images/Image (1).jpeg';
import image7 from '../../assets/images/Image (7).jpg';
import image8 from '../../assets/images/Image (8).jpg';
import image9 from '../../assets/images/Image (9).jpg';
import modelData from '../FeaturedModels/modelData';
const AllModels = () => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
  const modelCards = modelData.map((model, index) => (
    <FeaturedModelCard 
      key={index} 
      image={model.image} 
      heading={model.heading} 
      text={truncateText(model.text, 50)} // Truncate text to 100 characters (or your preferred length)
      fullText={model.text}
     
    />
  ));

  return (
    <div className="models">
      <h2>Finetuned Models</h2>
      <div className="cards-grid">
        {modelCards}
      </div>
    </div>
  );
}

export default AllModels;
