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
      width: "90%", 
      maxWidth: "750px", 
      maxHeight: "90vh",
      overflowY: "auto",
      zIndex: 1000,
      backgroundColor: "transparent", 
      padding: "20px", 
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" 
    },
    overlay: {
      backgroundColor: "rgba(1, 1, 1, 0.75)",
      zIndex: 999, 
    },
  };

  useEffect(() => {
    if (post) {
      setIsEdit(true); 
    } else {
      setIsEdit(false); 
    }
  }, [post]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
      shouldCloseOnOverlayClick={true}
      style={customStyles} 
      ariaHideApp={false} 
    >
      <div className="blog-modal "  style={{ position: "relative" }}>
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


BlogModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired, 
  handleModalClose: PropTypes.func.isRequired, 
  post: PropTypes.object, 
  handleSuccessfulNewBlogSubmission: PropTypes.func.isRequired 
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
