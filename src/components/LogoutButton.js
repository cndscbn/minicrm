// src/components/LogoutButton.js
import React from "react";

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    window.location.reload();
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
