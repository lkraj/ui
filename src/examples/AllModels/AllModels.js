import React from 'react';
import FeaturedModelCard from '../Cards/FeaturedModelCard/FeaturedModelCard';
import './AllModels.css'; // You might want to create a new CSS file for this component
import image1 from '../../assets/images/Image (1).jpeg';
import image7 from '../../assets/images/Image (7).jpg';
import image8 from '../../assets/images/Image (8).jpg';
import image9 from '../../assets/images/Image (9).jpg';

const AllModels = () => {
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
      }, {
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
    // ... add other model data here
  ];

  const modelCards = modelsData.map((model, index) => (
    <FeaturedModelCard 
      key={index} 
      image={model.image} 
      heading={model.heading} 
      text={model.text} 
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
