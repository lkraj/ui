import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import VuiTypography from "components/VuiTypography";
import './ImageFeedCard.css'; // Ensure this CSS file exists and is correctly styled
import VuiBox from "components/VuiBox";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // For the outlined heart
import FavoriteIcon from '@mui/icons-material/Favorite';
const ImageFeedCard = ({image}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const toggleLike = (event) => {
    event.stopPropagation();
    setLiked(!liked);
  };
  return (
    <>
      <VuiBox onClick={handleOpen} className={`image-card-overlay ${disableOverlay ? 'no-overlay' : ''}`}>
      <img src={image.src} alt={image.alt} className="feed-image" />
      {!disableOverlay && (<div className="overlay-content">
        <button className="like-button" onClick={toggleLike}>
          {liked ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
        </button>
        <p className="truncated-text">Some short text...</p>
      </div>
      )}
      </VuiBox>

      {isOpen && (
        <VuiBox sx = {({ palette: { gradients }, functions: { linearGradient } }) => ({
          backgroundColor: linearGradient(
            gradients.navbar.main,
            gradients.navbar.state,
            gradients.navbar.deg
          )})}>
        <VuiBox onClick={handleClose} className="modal">
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <VuiBox className="modal-left">
              <img src={image.src} alt={image.alt} className="modal-main-image" />
            </VuiBox>
            <VuiBox className="modal-right">
              {/* <div className="modal-related-images">
                {relatedImages.map((img, index) => (
                  <div key={index} className="modal-related-image">
                    {relatedImages.map((relatedImage, index) => (
                <ImageFeedCard key={index} image={relatedImage} relatedImages={[]} />
              ))}
                  </div>
                ))}
              </div> */}
              <h2 className="modal-title">Title or Heading</h2>
              <p className="modal-description">Some description or details about the image...</p>
            </VuiBox>
            <span className="close" onClick={handleClose}>&times;</span>
          </div>
        </VuiBox>
        </VuiBox>
      )}
    </>
  );
};

export default ImageFeedCard;
