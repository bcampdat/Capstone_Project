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
  const [selectedPost, setSelectedPost] = useState(null); // Para manejar la edición de posts

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
        data: { usuario_id: user.id_users }, // Enviamos usuario_id para verificación
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
    setSelectedPost(null); // No hay post seleccionado para una nueva creación
    setBlogModalIsOpen(true); // Abre el modal para un nuevo post
  };

  const handleEditBlogClick = (post) => {
    setSelectedPost(post); // Pasamos el post seleccionado para edición
    setBlogModalIsOpen(true); // Abre el modal para edición
  };
  

  const handleModalClose = () => {
    setBlogModalIsOpen(false);
    setSelectedPost(null); // Resetea el post seleccionado al cerrar el modal
  };

  const handleSuccessfulNewBlogSubmission = (post) => {
    setBlogModalIsOpen(false);
    setBlogItems((prevItems) => [post, ...prevItems]);
  };

  const blogRecords = blogItems.map((blogItem, i) => (
    <div className="admin-blog-wrapper" key={i}>
      <BlogItem blogItem={blogItem} />
      {user && blogItem.usuario_id === user.id_users && ( // Verificar que el usuario sea el propietario
        <div>
          <a onClick={() => handleEditBlogClick(blogItem)}>
            <CiCirclePlus size={39} />
          </a>
          <a onClick={() => handleDeleteClick(blogItem)}>
            <IoIosTrash size={39} />
          </a>
        </div>
      )}
    </div>
  ));
  

  return (
    <div className="blog-container">
      <BlogModal
        handleSuccessfulNewBlogSubmission={handleSuccessfulNewBlogSubmission}
        handleModalClose={handleModalClose}
        modalIsOpen={blogModalIsOpen}
        post={selectedPost} // Pasamos el post seleccionado o null
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
