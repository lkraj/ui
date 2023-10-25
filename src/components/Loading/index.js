import React from 'react';
import './Loading.css';
import { Wobble } from '@uiball/loaders'
import image8 from '../../assets/images/logo.png';
import VuiBox from "components/VuiBox";
import VuiProgress from 'components/VuiProgress';

const Loading = () => {
 
  return <div className="loading-container">
    <img src= {image8} alt="Overlay" className="overlay-image" />
      <div className="LineWobble">
      <Wobble size={50} color="#df9c9d"  />
      
      </div>
        
  </div>;
};

export default Loading;
