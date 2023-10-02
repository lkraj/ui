import React from 'react';
import PropTypes from 'prop-types';
import image1 from '../../assets/images/logo.png';
function Logo({ size, altText }) {
  return (
    <img
      src={image1} // Replace with the path to your image
      width={size}
      height={size}
      alt={altText}
    />
  );
}

// Setting default values for the props of Logo
Logo.defaultProps = {
  size: "100px", // Default size
  altText: "Your Company Logo", // Default alt text
};

// Typechecking props for the Logo
Logo.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  altText: PropTypes.string,
};

export default Logo;
