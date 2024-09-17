import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import BlogForm from "../components/Blog/blog-form";
import BlogFeaturedImage from "../components/Blog/blog-featured-image";
import { UserContext } from "../components/auth/userContext";
import { useParams, useNavigate } from "react-router-dom";
import { FaReply } from "react-icons/fa";

const BlogDetail = () => {
  const { user } = useContext(UserContext);
  const { slug } = useParams();
  const [blogItem, setBlogItem] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Volver a la página anterior
  };

  useEffect(() => {
    const getBlogItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/posts/${slug}`
        );
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
        <div className="content-container text-center mt-10 max-w-4xl mx-auto">
          <h1
            onClick={handleEditClick}
            className="text-3xl md:text-4xl font-bold mb-6 cursor-pointer dark:text-white"
          >
            {title}
          </h1>
          <div className="featured-image mb-6">
            <BlogFeaturedImage img={featured_image} />
          </div>
          <div className="content mr-0 md:mr-20 my-auto text-justify p-7 text-lg font-medium dark:text-white">
            {ReactHtmlParser(content)}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="blog-container p-4">
      {contentManager()}
      <button
        onClick={handleGoBack}
        style={{
          display: "flex",
          alignItems: "center",
          border: "none",
          background: "none",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        <FaReply size={50} style={{ color: "#a4d8ec" }} />
      </button>
    </div>
  );
};

export default BlogDetail;
