import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import striptags from "striptags";
import Truncate from "react-truncate";

const BlogItem = ({ blogItem }) => {
  const { id, content, title, featured_image } = blogItem;

  return (
    <article className="blog-item">
      <header>
        <Link to={`/p/${id}`}>
          <h1>{title}</h1>
        </Link>
      </header>

      {featured_image && (
        <figure className="featured-image-wrapper">
          <img 
            src={featured_image} 
            alt={title || 'Blog featured image'} 
            className="featured-image" 
          />
        </figure>
      )}

      <div className="blog-content">
        <Truncate
          lines={5}
          ellipsis={
            <span>
              ... <Link to={`/p/${id}`}>Read more</Link>
            </span>
          }
        >
          {striptags(content)}
        </Truncate>
      </div>
    </article>
  );
};

BlogItem.propTypes = {
  blogItem: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featured_image: PropTypes.string,
  }).isRequired,
};

export default BlogItem;
