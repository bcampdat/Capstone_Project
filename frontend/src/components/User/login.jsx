import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../auth/userContext";
import { FaUserAstronaut } from "react-icons/fa";
import { CgUserlane } from "react-icons/cg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, loginUser } = useContext(UserContext);

  const handleLogin = (event) => {
    event.preventDefault();
      
    axios
      .post("http://localhost:3001/api/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);

        // Guardar el usuario y el token en el contexto
        loginUser(response.data.user, response.data.token);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Error al iniciar sesión. Verifique sus credenciales.");
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!user ? (
        <form className="flex flex-col" onSubmit={handleLogin}>
          <CgUserlane className="lg:w-16 lg:h-16 mx-auto text-center text-gray-500" />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Iniciar sesión
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold">{user.user_name}</h3>
          {user.foto_users ? (
            <img
              src={user.foto_users}
              alt="User"
              className="w-24 h-24 rounded-full mb-4"
            />
          ) : (
            <FaUserAstronaut className="w-24 h-24 text-gray-700" />
          )}         
        </div>
      )}
    </div>
  );
};

export default Login;
