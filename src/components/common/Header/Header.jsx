import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="light-yellow-background border-b border-gray-200">
      <nav className="container max-w-7xl mx-auto flex justify-between items-center py-6 px-6">
        <ul className="flex space-x-8 text-lg">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              ABOUT US
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/our-works"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              OUR WORKS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              OUR SERVICES
            </NavLink>
          </li>
        </ul>
        <div className="text-center cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="playfair-display-font text-2xl font-medium">
            WEDDING DREAM
          </h1>
          <p className="text-sm text-red-800 font-semibold italic">
            Since 2024
          </p>
        </div>
        <ul className="flex space-x-8 text-lg">
          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              OUR FEEDBACK
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              BLOG
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
        <div className="flex space-x-4">
          <NavLink
            to="/login"
            className="bg-red-800 text-white px-4 py-1 rounded-lg shadow-md hover:bg-white hover:text-red-800 border border-red-800 transition duration-300 inria-serif-font"
          >
            Login
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
