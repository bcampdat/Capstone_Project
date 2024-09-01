import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags"; 
import TruncateMarkup from "react-truncate-markup"; 

const BlogItem = ({ blogItem }) => {
  const { id, content, title, featured_image } = blogItem;

  return (
    <div>
      {/* Enlace al detalle del blog */}
      <Link to={`/p/${id}`}>
        <h1>{title}</h1>
      </Link>
      {/* Imagen destacada del blog, si existe
      {featured_image && (
        <div>
          <img src={featured_image} alt={`Imagen destacada de ${title}`} />
        </div>
      )} */}
      <div>
        <TruncateMarkup
          lines={6} 
          ellipsis={
            <span>
              ...<Link to={`/p/${id}`}>Read more</Link>
            </span>
          }
        >
          <span>{striptags(content)}</span>
        </TruncateMarkup>
      </div>
    </div>
  );
};

export default BlogItem;
