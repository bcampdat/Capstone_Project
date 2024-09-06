import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { IoIosTrash } from "react-icons/io";
import { ImSpinner } from "react-icons/im";
import { CiCirclePlus } from "react-icons/ci";

import BlogModal from "../components/modals/Blog-Modal";
import BlogItem from "../components/Blog/blog-item";

import { UserContext } from "../components/auth/userContext";

const Blog = () => {
  const { user } = useContext(UserContext);
  const [blogItems, setBlogItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [blogModalIsOpen, setBlogModalIsOpen] = useState(false);

  const getBlogItems = useCallback(() => {
       setCurrentPage((prevPage) => prevPage + 1);
    axios
      .get(`http://localhost:3001/api/posts?page=${currentPage + 1}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("getting", response.data);
        setBlogItems((prevItems) => prevItems.concat(response.data));
        console.log("blogItems", blogItems);
        setTotalCount(response.data.length);
        console.log("totalCount", totalCount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("getBlogItems error", error);
      });
  }, [currentPage]);

  useEffect(() => {
    getBlogItems();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        isLoading ||
        blogItems.length === totalCount ||
        window.innerHeight + window.scrollY <
          document.documentElement.offsetHeight
      ) {
        return;
      }

      getBlogItems();
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isLoading, blogItems, totalCount, getBlogItems]);

  const handleDeleteClick = (post) => {
    console.log("delete blog", post);
    axios
      .delete(`http://localhost:3001/api/posts/delete/${post.id}`, {
        withCredentials: true,
      })
      .then(() => {
        setBlogItems((prevItems) =>
          prevItems.filter((blogItem) => post.id !== blogItem.id)
        );
      })
      .catch((error) => {
        console.log("delete blog error", error);
      });
  };

  const handleSuccessfulNewBlogSubmission = (post) => {
    setBlogModalIsOpen(false);
    setBlogItems((prevItems) => [post, ...prevItems]);
  };

  const handleModalClose = () => {
    setBlogModalIsOpen(false);
  };

  const handleNewBlogClick = () => {
    setBlogModalIsOpen(true);
  };

  const blogRecords = blogItems.map((blogItem,i) => (
    <div className="admin-blog-wrapper" key={i} >
      <BlogItem blogItem={blogItem} />
      {user && (
        <a onClick={() => handleDeleteClick(blogItem)}>
          <IoIosTrash size={39} />
        </a>
      )}
    </div>
  ));

  return (
    <div className="blog-container">
      <BlogModal
        handleSuccessfulNewBlogSubmission={handleSuccessfulNewBlogSubmission}
        handleModalClose={handleModalClose}
        modalIsOpen={blogModalIsOpen}
      />

      {user && (
        <div className="new-blog-link">
          <a onClick={handleNewBlogClick}>
            <CiCirclePlus size={50} />
          </a>
        </div>
      )}

      <div className="content-container">{blogRecords}</div>

      {isLoading && (
        <div className="content-loader">
          <ImSpinner size={39} />
        </div>
      )}
    </div>
  );
};

export default Blog;
