import React from "react";
import PropTypes from "prop-types";

const BlogFeaturedImage = ({ img, altText = "Blog featured image" }) => {
  if (!img) {
    return null;
  }
 
  const imgUrl = img.startsWith("/MyUploads")
    ? `http://localhost:3001${img}` // Ajusta esta URL a la de tu servidor
    : img;

  return (
    <div className="featured-image-wrapper">
      <img src={imgUrl} alt={altText} className="featured-image" />
    </div>
  );
};

// Validación de tipos con PropTypes
BlogFeaturedImage.propTypes = {
  img: PropTypes.string, // La URL de la imagen
  altText: PropTypes.string, // Texto alternativo para la imagen
};

export default BlogFeaturedImage;
