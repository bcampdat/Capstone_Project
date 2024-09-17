import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import striptags from "striptags";
import TextTruncate from "react-text-truncate";
import BlogFeaturedImage from "./blog-featured-image"; 

const BlogItem = ({ blogItem }) => {
  const { id, content, title, featured_image } = blogItem;

  return (
    <article className="blog-item p-5  mx-auto">
      <header>
        <Link to={`/p/${id}`}>
          <h1 className="mb-3">{title}</h1>
        </Link>
      </header>

      {featured_image && (
        <BlogFeaturedImage img={featured_image} altText={title} />
      )}

      <div className="blog-content p-5 mx-auto">
        <TextTruncate
          line={4}
          element="span"
          truncateText="…"
          text={striptags(content)}
          textTruncateChild={<Link to={`/p/${id}`}>Read more</Link>}
        />
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
