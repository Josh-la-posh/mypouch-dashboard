import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
      <nav className="bg-gray-800 p-4">
        <ul className="flex gap-4 text-white">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-300"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  };

export default Navigation;