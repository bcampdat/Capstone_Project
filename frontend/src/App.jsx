import React from "react";
import { UserProvider } from "./components/auth/userContext"; // Importar UserProvider
import AppRoutes from "./AppRoutes"; // Importar el componente que maneja las rutas

import "./App.css";

// Componente principal de la aplicación
const App = () => {
  return (
    <UserProvider>
      <AppRoutes /> {/* Renderizar el componente de rutas */}
    </UserProvider>
  );
};

export default App;
