import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./components/auth/userContext"; // Importar el contexto del usuario

import NavBar from "./components/NavBar";
import Home from "./pages/home";
import About from "./pages/about";
import Calendario from "./pages/calendario";
import Mapas from "./pages/mapas";
import Blog from "./pages/blog";
import BlogDetail from './pages/blog-detail';
import Footer from "./components/Footer";
import NoMatch from "./pages/no-match";

// Componente que maneja las rutas de la aplicación
const AppRoutes = () => {
  const { user } = useContext(UserContext); // Obtener el estado del usuario desde el contexto

  return (
    <div className="app-wrapper">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/calendario"
            element={
              user ? <Calendario /> : <Navigate to="/home" /> // Redirigir si no hay usuario
            }
          />
          <Route
            path="/mapas"
            element={
              user ? <Mapas /> : <Navigate to="/home" /> // Redirigir si no hay usuario
            }
          />
          <Route path="/blog" element={<Blog />} /> 
          <Route path="/p/:slug" element={<BlogDetail />} />        
                 
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default AppRoutes;
