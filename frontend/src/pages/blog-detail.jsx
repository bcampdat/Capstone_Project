import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogForm from "../components/Blog/blog-form";
import BlogFeaturedImage from "../components/Blog/blog-featured-image";
import { UserContext } from "../components/auth/userContext";
import { useParams } from "react-router-dom"; 

const BlogDetail = () => {
  const { user } = useContext(UserContext); 
  const { slug } = useParams(); 
  const [blogItem, setBlogItem] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getBlogItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${slug}`);
        setBlogItem(response.data);
      } catch (error) {
        console.log("getBlogItem error", error);
      }
    };

    getBlogItem();
  }, [slug]);

  const handleUpdateFormSubmission = (post) => {
    setBlogItem(post);
    setEditMode(false);
  };

  const handleFeaturedImageDelete = () => {
    setBlogItem((prevState) => ({
      ...prevState,
      featured_image: "",
    }));
  };

  const handleEditClick = () => {
    if (user) {
      setEditMode(true);
    }
  };

  const { title, content, featured_image } = blogItem;

  const contentManager = () => {
    if (editMode) {
      return (
        <BlogForm
          handleFeaturedImageDelete={handleFeaturedImageDelete}
          handleUpdateFormSubmission={handleUpdateFormSubmission}
          editMode={editMode}
          blog={blogItem}
        />
      );
    } else {
      return (
        <div className="content-container">
          <h1 onClick={handleEditClick}>{title}</h1>
          <BlogFeaturedImage img={featured_image} />
          <div className="content">{ReactHtmlParser(content)}</div>
        </div>
      );
    }
  };

  return <div className="blog-container">{contentManager()}</div>;
};

export default BlogDetail;
