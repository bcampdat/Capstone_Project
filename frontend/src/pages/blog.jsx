import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { IoIosTrash } from "react-icons/io";
import { ImSpinner } from "react-icons/im";
import { CiCirclePlus } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";
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
  const [selectedPost, setSelectedPost] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  const getBlogItems = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
    axios
      .get(`http://localhost:3001/api/posts?page=${currentPage + 1}`, {
        withCredentials: true,
      })
      .then((response) => {
        setBlogItems((prevItems) => prevItems.concat(response.data));
        setTotalCount(response.data.length);
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
    axios
      .delete(`http://localhost:3001/api/posts/delete/${post.id}`, {
        data: { usuario_id: user.id_users },
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

  const handleNewBlogClick = () => {
    setSelectedPost(null);
    setBlogModalIsOpen(true);
  };

  const handleEditBlogClick = (post) => {
    setSelectedPost(post);
    setBlogModalIsOpen(true);
  };

  const handleModalClose = () => {
    setBlogModalIsOpen(false);
    setSelectedPost(null);
  };

  const handleSuccessfulNewBlogSubmission = (post) => {
    setBlogModalIsOpen(false);
    setBlogItems((prevItems) => [post, ...prevItems]);
  };

  const checkScrollTop = () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (!showScroll && window.scrollY >= scrollableHeight - 100) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY < scrollableHeight - 100) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const blogRecords = blogItems.map((blogItem, i) => (
    <div className="admin-blog-wrapper mx-auto p-4" key={i}>
      <BlogItem blogItem={blogItem} />
      {user && blogItem.usuario_id === user.id_users && (
        <div className="admin-blog-icons flex justify-center space-x-4 mt-4">
          <button
            className="edit"
            onClick={() => handleEditBlogClick(blogItem)}
            aria-label="Editar post"
          >
            <CiCirclePlus size={42} />
          </button>
          <button
            className="delete"
            onClick={() => handleDeleteClick(blogItem)}
            aria-label="Eliminar post"
          >
            <IoIosTrash size={42} />
          </button>
        </div>
      )}
    </div>
  ));

  return (
    <div className="blog-container mt-10">
      <BlogModal
        handleSuccessfulNewBlogSubmission={handleSuccessfulNewBlogSubmission}
        handleModalClose={handleModalClose}
        modalIsOpen={blogModalIsOpen}
        post={selectedPost}
      />

      {user && (
        <div className="new-blog-link fixed bottom-10 right-10">
          <button onClick={handleNewBlogClick} aria-label="Añadir nuevo post">
            <CiCirclePlus size={80} />
          </button>
        </div>
      )}

      <div className="content-container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogRecords}
      </div>

      {isLoading && (
        <div className="content-loader flex justify-center items-center mt-10">
          <ImSpinner size={40} className="animate-spin" />
        </div>
      )}

      {showScroll && (
        <FaArrowUp
          className="scrollTop fixed bottom-10 left-10 cursor-pointer p-2"
          onClick={scrollToTop}
          size={40}
          style={{
            backgroundColor: "rgba(255, 193, 7, 0.8)",
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default Blog;
