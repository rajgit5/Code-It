import React, { useState, useContext } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { cookieContext } from "./contextAPI/cookieContext";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCookieValue } = useContext(cookieContext);
  const authToken = getCookieValue("userId");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="m-0 p-4 bg-gray-800 flex flex-row justify-between fixed top-0 w-full z-50">
        <div>
          <Link to="/">
            <h1 className="ml-3 text-3xl hover:bg-gray-200 inline-block rounded-lg hover:px-4 duration-300 transition-all transform">
              <b className="text-blue-400">Code</b>
              <b className="text-purple-400">It</b>
            </h1>
          </Link>
        </div>

        {authToken == null && (
          <>
            <div className="mr-8 flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-200 hover:text-blue-400 focus:outline-none"
              >
                {menuOpen ? <IoMdClose size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            <div className="hidden md:flex items-center mr-8">
              <Link
                to="/login"
                className="hover:bg-white hover:text-blue-400 transform transition-all duration-300 hover:px-4 text-gray-200 bg-gray-400 px-2 rounded-lg pb-1 font-bold text-md"
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="hover:transform transition-all duration-300 hover:px-4 text-black-200 bg-yellow-400 px-2 ml-3 rounded-lg pb-1 font-bold text-md"
              >
                SignUp
              </Link>
            </div>
          </>
        )}
      </nav>

      {/* Mobile Menu */}
      {authToken == null && menuOpen && (
        <div className="bg-gray-800 fixed top-16 left-0 w-full z-40 flex flex-col items-center md:hidden pt-8 pb-6 rounded-b-3xl transition-all ease-in-out duration-300">
          <Link
            to="/login"
            className="hover:bg-white hover:text-blue-400 transform transition-all duration-300 text-gray-200 bg-gray-400 px-4 py-2 rounded-lg font-bold text-md mb-2"
            onClick={toggleMenu}
          >
            LogIn
          </Link>
          <Link
            to="/signup"
            className="hover:transform transition-all duration-300 text-black-200 bg-yellow-400 px-4 py-2 rounded-lg font-bold text-md"
            onClick={toggleMenu}
          >
            SignUp
          </Link>
        </div>
      )}
    </>
  );
}
