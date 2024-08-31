import React, { useState } from "react";
import Modal from "react-modal";
import Login from "../User/login";
import NewUser from "../User/newUser";

Modal.setAppElement("#app-wrapper");

const LoginModal = ({ isOpen, onRequestClose }) => {
  const [showLogin, setShowLogin] = useState(true); // Estado para alternar entre Login y CreateUser

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-60%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: "350px",
      padding: "2rem",
      borderRadius: "0.375rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#c7a732",
    },
    overlay: {
      backgroundColor: "rgba(1, 1, 1, 0.75)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Auth Modal"
      style={customStyles}
      shouldCloseOnOverlayClick
    >
      <button
        onClick={onRequestClose}
        className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
        aria-label="Close"
      >
        <span className="text-gray-600">&times;</span>
      </button>
      {showLogin ? (
        <>
          <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
          <Login />
          <p className="mt-4 text-center">
            ¿No tienes una cuenta?{" "}
            <button
              onClick={() => setShowLogin(false)} // Cambiar a CreateUser
              className="text-slate-500 hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Registrar usuario</h2>
          <NewUser />
          <p className="mt-4 text-center">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={() => setShowLogin(true)} // Cambiar a Login
              className="text-slate-500 hover:underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        </>
      )}
    </Modal>
  );
};

export default LoginModal;
