import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ai } from "../assets";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close menu when resizing to desktop view
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gradient-to-r from-[black] via-[#003000] to-black mt-[5px] text-white flex flex-col md:flex-row justify-between h-auto md:h-15 rounded-t-[10px] items-center mx-[10px] relative">
      <div className="flex items-center w-full md:w-auto justify-between">
        <div className="flex items-center">
          <img className="h-[80px] w-[100px]" src={ai} alt="Agri-AI Logo" />
          <h1 className="text-4xl ml-0">|</h1>
          <h1 className="font-[Times_New_Roman] text-[30px] bg-gradient-to-r from-[#00ff00] via-white to-[#01ee01] text-transparent w-max bg-clip-text font-bold AiAgri">
            Agri-Ai
          </h1>
        </div>

        {/* Hamburger menu button - visible only on mobile */}
        {isMobile && (
          <button
            className="mx-[15px] text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        )}
      </div>

      {/* Desktop Navigation - hidden on mobile */}
      <div className="hidden md:flex gap-[10px] mx-[15px]">
        <NavLink to="/" className="hover:text-green-300">
          Home
        </NavLink>
        <NavLink to="/about" className="hover:text-green-300">
          About
        </NavLink>
        <NavLink to="/contact" className="hover:text-green-300">
          Contact
        </NavLink>
        <NavLink to="/predict" className="hover:text-green-300">
          Predict
        </NavLink>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobile && isMenuOpen && (
        <div className="w-full md:hidden bg-[#003000] rounded-b-[10px] py-2 px-4 flex flex-col items-center space-y-3">
          <NavLink
            to="/"
            className="w-full text-center hover:text-green-300 py-1"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="w-full text-center hover:text-green-300 py-1"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="w-full text-center hover:text-green-300 py-1"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/predict"
            className="w-full text-center hover:text-green-300 py-1"
            onClick={() => setIsMenuOpen(false)}
          >
            Predict
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
