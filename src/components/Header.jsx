// src/components/Header.jsx
import React from "react";

const Header = ({ title, onLogout }) => {
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between px-6 py-4 shadow-md">
      {/* Left side: title */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Right side: logout button */}
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;