import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { IoIosTrash } from "react-icons/io";
import { ImSpinner } from "react-icons/im";
import { CiCirclePlus } from "react-icons/ci";

import BlogModal from "../components/modals/Blog-Modal";
import BlogItem from "../components/Blog/blog-item";
import { UserContext } from "../components/auth/userContext";

const Blog = () => {
  const [blogItems, setBlogItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [blogModalIsOpen, setBlogModalIsOpen] = useState(false);

  const { user, token } = useContext(UserContext);

  const getBlogItems = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);

    axios
      .get(`http://localhost:3001/api/posts?page=${currentPage}`, {
        // withCredentials: true,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        console.log("Response from server:", response); // Debugging log

        const posts = response.data?.posts || [];

        if (Array.isArray(posts)) {
          // blogItems: this.state.blogItems.concat(response.data.posts)
          setBlogItems((prevItems) => [...prevItems, ...posts]);
          console.log("BlogItems posts:", posts);
          setTotalCount(response.data.meta?.total_records);
          setCurrentPage((prevPage) => prevPage + 1);
          setIsLoading(false);
        }
        console.log("Current page:", currentPage);
      })
      .catch((error) => {
        console.error("Error fetching blog items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, isLoading, token]);

  const handleDeleteClick = (post) => {
    if (!user) return;
    axios
      .delete(`http://localhost:3001/api/posts/delete/${post.id}`, {
        // withCredentials: true,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then(() => {
        updateBlogItems(post);
      })
      .catch((error) => {
        console.log("Delete post error", error);
      });
  };

  const updateBlogItems = (post) => {
    setBlogItems((prevItems) =>
      prevItems.filter((blogItem) => blogItem.id !== post.id)
    );
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

  const onScroll = useCallback(() => {
    if (isLoading || blogItems.length === totalCount) return;

    const isScrollAtBottom =
      innerHeight + window.scrollY >= document.documentElement.offsetHeight;

    if (isScrollAtBottom) {
      getBlogItems();
    }
  }, [isLoading, blogItems.length, totalCount, getBlogItems]);

  useEffect(() => {
    getBlogItems();
  }, [getBlogItems]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const blogRecords = blogItems.map((blogItem) => (
    <div className="admin-blog-wrapper" key={blogItem.id}>
      {" "}
      {/* Assign unique key here */}
      <BlogItem blogItem={blogItem} />
      {user && (
        <button onClick={() => handleDeleteClick(blogItem)}>
          <IoIosTrash />
        </button>
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
          <button onClick={handleNewBlogClick}>
            <CiCirclePlus size="50px" />
          </button>
        </div>
      )}

      <div className="content-container">{blogRecords}</div>
      {isLoading && (
        <div className="content-loader">
          <ImSpinner size="30px" />
        </div>
      )}
    </div>
  );
};

export default Blog;
