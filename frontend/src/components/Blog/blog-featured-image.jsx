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

// Prop type validation
BlogFeaturedImage.propTypes = {
  img: PropTypes.string, 
  altText: PropTypes.string, 
};

// Default props
BlogFeaturedImage.defaultProps = {
  altText: "Blog featured image",
};

export default BlogFeaturedImage;
