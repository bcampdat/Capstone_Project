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
  const [isLoading, setIsLoading] = useState(false);
  const [blogModalIsOpen, setBlogModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Agregar estado para la página actual

  const { user, token } = useContext(UserContext);
  
  const handleDeleteClick = (post) => {
    console.log("delete blog", post);
    axios
      .delete(`http://localhost:3001/api/posts/${post.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response from delete", response);
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
    setBlogItems((prevItems) => [post].concat(prevItems));
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
      window.innerHeight + window.scrollY >= document.documentElement.offsetHeight-100;

    if (isScrollAtBottom) {
      setCurrentPage((prevPage) => prevPage + 1); // Incrementa la página actual
    }
  }, [isLoading, blogItems.length, totalCount]);

 

  const getBlogItems = useCallback(() => {
    setIsLoading(true); // Muestra el spinner mientras se cargan los datos

    axios
      .get(`http://localhost:3001/api/posts?page=${currentPage}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response from get blog items", response);
        setBlogItems((prevItems) =>[...prevItems, ...response.data]);        
        setTotalCount(response.data.meta.total_records.posts);
        console.log("totalCount", totalCount);
        setIsLoading(false); // Deja de mostrar el spinner después de cargar
      })
      .catch((error) => {
        console.log("getBlogItems error", error);
        setIsLoading(false); // Deja de mostrar el spinner en caso de error
      });
  }, [currentPage]); // Agregamos currentPage como dependencia

   
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);


  useEffect(() => {
    getBlogItems();
  }, [getBlogItems]);

  const blogRecords = blogItems.map((blogItem) => (
    <div className="admin-blog-wrapper"key={blogItem.id}>
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
