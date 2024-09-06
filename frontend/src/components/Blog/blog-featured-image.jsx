import React from "react";
import PropTypes from "prop-types"; 

const BlogFeaturedImage = ({ img, altText = "Blog featured image" }) => {
  if (!img) {
    return null;
  }

  return (
    <div className="featured-image-wrapper">
      <img src={img} alt={altText} className="featured-image" />
    </div>
  );
};

// Validación de tipos con PropTypes
BlogFeaturedImage.propTypes = {
  img: PropTypes.string, 
  altText: PropTypes.string, 
};

export default BlogFeaturedImage;
