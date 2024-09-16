import React, { useState, useContext } from "react";
import axios from "axios";
import { FaUserAstronaut, FaUserNinja, FaUserSecret } from "react-icons/fa";
import { UserContext } from "../auth/userContext"; 
import { useNavigate } from "react-router-dom"; 

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fotoUsers, setFotoUsers] = useState("astronauta"); // Astronauta por defecto
  const { loginUser } = useContext(UserContext); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Para redirigir al usuario

  const submitUser = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/api/users/create", {
        username,
        email,
        password,
        foto_users: fotoUsers, // Guardar ícono seleccionado en foto_users
      })
      .then((response) => {
        console.log(response.data);
        setSuccess("Usuario creado exitosamente!");

        // Iniciar sesión automáticamente después del registro
        axios
          .post("http://localhost:3001/api/users/login", {
            username,
            password,
          })
          .then((loginResponse) => {
            // Llamamos a loginUser del contexto para guardar los datos del usuario y token
            loginUser(loginResponse.data.user, loginResponse.data.token);
            setError("");
            // Redirigir a la página principal (home) después del login exitoso
            navigate("/home");
          })
          .catch((loginError) => {
            setError("Error al iniciar sesión.");
          });
      })
      .catch((error) => {
        console.error(error);
        setError("Error al crear el usuario. Verifique los datos.");
        setSuccess("");
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear usuario</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form className="flex flex-col" onSubmit={submitUser}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
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
            className="p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Selector de íconos */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Selecciona un ícono
          </label>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="button"
              onClick={() => setFotoUsers("astronauta")}
              className={`p-2 rounded-full ${
                fotoUsers === "astronauta" ? "bg-gray-300" : ""
              }`}
            >
              <FaUserAstronaut className="w-8 h-8 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => setFotoUsers("ninja")}
              className={`p-2 rounded-full ${
                fotoUsers === "ninja" ? "bg-gray-300" : ""
              }`}
            >
              <FaUserNinja className="w-8 h-8 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => setFotoUsers("secreto")}
              className={`p-2 rounded-full ${
                fotoUsers === "secreto" ? "bg-gray-300" : ""
              }`}
            >
              <FaUserSecret className="w-8 h-8 text-gray-700" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
        >
          Registrar usuario
        </button>
      </form>
    </div>
  );
};

export default NewUser;
