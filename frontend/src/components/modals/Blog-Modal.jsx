import React from 'react';
import Modal from 'react-modal';
import BlogForm from '../Blog/blog-form';

Modal.setAppElement('#app-wrapper');

const BlogModal = (props) => {
  // Estilos personalizados para el modal
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto', 
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '750px',
    },
    overlay: {
      backgroundColor: 'rgba(1, 1, 1, 0.75)',
    },
  };

  const handleSuccessfulFormSubmission = (blog) => {
    props.handleSuccessfulNewBlogSubmission(blog);
  };

  return (
    <Modal
      style={customStyles}
      onRequestClose={props.handleModalClose}
      isOpen={props.modalIsOpen}
    >
      <BlogForm
        handleSuccessfulFormSubmission={handleSuccessfulFormSubmission} />
    </Modal>
  );
};

export default BlogModal;
