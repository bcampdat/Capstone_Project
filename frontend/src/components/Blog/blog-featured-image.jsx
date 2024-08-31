import React from "react";

const BlogFeaturedImage = () => {
  // Si no hay imagen, no renderizar nada
  if (!img) {
    return null;
  }

  return (
    <div className="featured-image-wrapper">
      <img src={img} alt="Featured" />
    </div>
  );
};

export default BlogFeaturedImage;
