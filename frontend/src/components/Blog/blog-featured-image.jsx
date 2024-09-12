import React from "react";
import PropTypes from "prop-types"; 

const BlogFeaturedImage = ({ img, altText = "Blog featured image" }) => {
  if (!img) {
    return null;
  }

  // Asegúrate de que si la URL es relativa, se le añade el host del servidor
  const imgUrl = img.startsWith("/MyUploads")
    ? `http://localhost:3001${img}` // Asegúrate de que esta URL coincida con la de tu servidor
    : img;

  return (
    <div className="featured-image-wrapper">
      <img src={imgUrl} alt={altText} className="featured-image" />
    </div>
  );
};

// Validación de tipos con PropTypes
BlogFeaturedImage.propTypes = {
  img: PropTypes.string, 
  altText: PropTypes.string, 
};

export default BlogFeaturedImage;
