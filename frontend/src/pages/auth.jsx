import { useState } from 'react';
import LoginModal from '../components/modals/login-Modal'; // Importa el LoginModal

const Auth = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // El modal estará abierto al cargar la página

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (credentials) => {
    // Aquí manejas el inicio de sesión
    console.log('Login successful with credentials:', credentials);
    // Si el login es exitoso, puedes cerrar el modal
    handleCloseModal();
  };

  return (
    <div className="auth-page">
      {/* Botón opcional para abrir el modal si se cierra */}
      {!isModalOpen && (
        <button onClick={handleOpenModal} className="open-modal-button">
          Open Login Modal
        </button>
      )}
      
      {/* El modal se abrirá automáticamente al cargar la página */}
      <LoginModal 
        isOpen={isModalOpen} 
        onRequestClose={handleCloseModal} 
        onRequestLogin={handleLogin} 
      />
    </div>
  );
};

export default Auth;
