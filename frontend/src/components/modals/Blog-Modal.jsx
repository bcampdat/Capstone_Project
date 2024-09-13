import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import BlogForm from '../Blog/blog-form';
import Modal from 'react-modal';

const BlogModal = ({ modalIsOpen, handleModalClose, post, handleSuccessfulNewBlogSubmission }) => {
  const [isEdit, setIsEdit] = useState(false);

  // Estilos personalizados para el modal
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "750px",
      maxHeight: "90vh",
      overflowY: "auto",
      zIndex: 1000, // Aseguramos que el modal esté por encima de otros elementos
      backgroundColor: "transparent", // Fondo blanco para asegurar visibilidad
      padding: "20px", // Añadir padding para evitar que los elementos toquen los bordes
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" // Añadir una sombra para mejor visibilidad
    },
    overlay: {
      backgroundColor: "rgba(1, 1, 1, 0.75)",
      zIndex: 999, // Asegurar que el overlay esté por detrás del modal
    },
  };

  useEffect(() => {
    if (post) {
      setIsEdit(true); // Si hay un post, es edición
    } else {
      setIsEdit(false); // Si no, es un nuevo post
    }
  }, [post]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
      shouldCloseOnOverlayClick={true}
      style={customStyles} // Aplica los estilos personalizados
      ariaHideApp={false} // Si es necesario, evita ocultar la app
    >
      <div style={{ position: "relative" }}>
        <h2>{isEdit ? 'Editar Post' : 'Nuevo Post'}</h2>
        {modalIsOpen && (
          <BlogForm
            post={post}
            isEdit={isEdit}
            handleSuccessfulNewBlogSubmission={handleSuccessfulNewBlogSubmission}
          />
        )}
        <button onClick={handleModalClose} style={closeButtonStyle}>
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

// Validación de los props
BlogModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired, // Requerido y debe ser booleano
  handleModalClose: PropTypes.func.isRequired, // Función requerida
  post: PropTypes.object, // Puede ser un objeto o null
  handleSuccessfulNewBlogSubmission: PropTypes.func.isRequired // Función requerida
};

// Estilos del botón de cerrar
const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#c7a732",
  color: "black",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "4px",
};

export default BlogModal;
