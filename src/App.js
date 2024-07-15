// External Library Imports
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

// Component Imports
import SignIn from "./Auth/SignIn/SignIn";
import Admin from "./Admin";

// Style Imports
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./Auth/SignUp/SignUp";

const App = () => {
  // ToastContainer configurations for clarity
  const toastConfig = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
    transition: Zoom,
  };

  return (
    <div>
      {/* Toast Notifications Container */}
      <ToastContainer {...toastConfig} />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
