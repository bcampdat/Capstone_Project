import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./auth/userContext";
import LoginModal from "./modals/login-Modal";
import { FaUserAstronaut, FaUserNinja, FaUserSecret } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const NavBar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Función para renderizar el ícono del usuario
  const renderIcon = () => {
    if (user && user.foto_users) {
      switch (user.foto_users) {
        case "astronauta":
          return <FaUserAstronaut className="w-10 h-10 text-gray-500" />;
        case "ninja":
          return <FaUserNinja className="w-10 h-10 text-gray-500" />;
        case "secreto":
          return <FaUserSecret className="w-10 h-10 text-gray-500" />;
        default:
          return <FaUserAstronaut className="w-10 h-10 text-gray-500" />;
      }
    }
    return <FaUserAstronaut className="w-10 h-10 text-gray-500" />;
  };

  return (
    <nav className="nav-wrapper px-10  text-3xl dark:bg-gray-400 dark:text-white w-full mt-10">
      <div className="navbar flex items-center justify-between">
        <h1 className="logo dark:text-white text-3xl ml-5 mr-5">LOGO</h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsLoginOpen(!isLoginOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d={
                  isLoginOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
        <ul
          className={`md:flex md:items-center md:space-x-5 ${
            isLoginOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <NavLink to="/home" className={({ isActive }) => isActive ? "text-white-800" : "text-amber-300"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => isActive ? "text-white-800" : "text-amber-300"}>
              Blog
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/calendario" className={({ isActive }) => isActive ? "text-white-800" : "text-amber-300"}>
                  Calendario
                </NavLink>
              </li>
              <li>
                <NavLink to="/mapas" className={({ isActive }) => isActive ? "text-white-800" : "text-amber-300"}>
                  Mapas
                </NavLink>
              </li>
              <li>
                <div className="flex items-center">
                  <div className="user-icon">{renderIcon()}</div> 
                  <span className="user-name ml-2">{user.user_name}</span>
                  <button onClick={logoutUser} className="text-white-800 ml-4">
                    <LuLogOut className="mr-4 logout " />
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => setIsLoginOpen(true)} className="text-white-800 mr-5">
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
      <LoginModal isOpen={isLoginOpen} onRequestClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};

export default NavBar;
