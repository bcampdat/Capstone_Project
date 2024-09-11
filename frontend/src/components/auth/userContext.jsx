import React, { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types"; 
import axios from "axios";

// Crear contexto del usuario
export const UserContext = createContext({
  user: null,
  token: null,
  loginUser: () => {},
  logoutUser: () => {},
});

// Proveedor del contexto del usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUser(parsedUserData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }

    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const loginUser = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  // Memorizar el valor del contexto para evitar recreaciones innecesarias
  const value = useMemo(() => ({
    user,
    token,
    loginUser,
    logoutUser
  }), [user, token]); // Dependencias: valor se recalcula cuando user o token cambian

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Validación de props
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Especificar que 'children' es requerido y debe ser un nodo React
};
