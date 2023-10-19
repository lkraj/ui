import React from 'react';
import './Loading.css';
import { LineWobble } from '@uiball/loaders'
import image8 from '../../assets/images/logo.png';
import VuiBox from "components/VuiBox";
import VuiProgress from 'components/VuiProgress';

const Loading = () => {
 
  return <div className="loading-container">
    <img src= {image8} alt="Overlay" className="overlay-image" />
      <div className="LineWobble">
      <LineWobble size={40} color="#b462e2"  />
      
      </div>
        
  </div>;
};

export default Loading;
