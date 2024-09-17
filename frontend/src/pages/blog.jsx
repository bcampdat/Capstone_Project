import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { IoIosTrash } from "react-icons/io";
import { ImSpinner } from "react-icons/im";
import { CiCirclePlus } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa"; // Importamos el ícono de flecha para subir
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

  // Estado para mostrar u ocultar el botón de "volver arriba"
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

  // Función para detectar el scroll y mostrar el botón si se ha scrolleado hacia abajo
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  // Añadir el event listener al hacer scroll
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  // Función para volver al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const blogRecords = blogItems.map((blogItem, i) => (
    <div className="admin-blog-wrapper mx-auto" key={i}>
      <BlogItem blogItem={blogItem} />
      {user && blogItem.usuario_id === user.id_users && ( // Verificar que el usuario sea el propietario
        <div className="admin-blog-icons ">
          <a className="edit" onClick={() => handleEditBlogClick(blogItem)}>
            <CiCirclePlus size={39} />
          </a>
          <a className="delete" onClick={() => handleDeleteClick(blogItem)}>
            <IoIosTrash size={39} />
          </a>
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
        post={selectedPost} // Pasamos el post seleccionado o null
      />

      {user && (
        <div className="new-blog-link">
          <a onClick={handleNewBlogClick}>
            <CiCirclePlus size={80} />
          </a>
        </div>
      )}

      <div className="content-container">{blogRecords}</div>

      {isLoading && (
        <div className="content-loader">
          <ImSpinner size={40} />
        </div>
      )}

      {/* Botón de volver arriba */}
      {showScroll && (
        <FaArrowUp
          className="scrollTop"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "30px",
            height: "40px",
            width: "40px",
            backgroundColor: "rgba(255, 193, 7, 0.8)",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            transition: "opacity 0.5s",
          }}
        />
      )}
    </div>
  );
};

export default Blog;
