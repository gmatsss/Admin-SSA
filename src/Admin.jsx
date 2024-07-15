// External Library Imports
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Component Imports
import Sidebar from "./Sidebar/Sidebar";
import UserContext from "./Context/UserContext";
import Posticket from "./tickets/postticket/ticketpost";
import RetuneChat from "./retune/RetuneChat";
import Panel from "./panel/panel";

// API and Utility Imports
import { fetchData } from "./api/FetchData";

// Style Imports
import "./Admin.css";
import useProduktlyScript from "./api/useProduktlyScript";
import Billing from "./Billing/Billing";
import ThankYouComponent from "./thankyou/ThankYouComponent";
import HeaderSmall from "./header/HeaderSmall";
import AnnouncementModal from "./Announcement/AnnouncementModal";
import Lifetime from "./Billing/lifetime/lifetime";
import Todo from "./Todo/Todo";
import Configs from "./config/config";
import Board from "./Dashboards/Board";
import Roadmap from "./roadmap/roadmap";
import Notice from "./notice/notice";
import Playai from "./playai/playai";

const Admin = () => {
  const { user, isLoggedIn, isLoading, reloadUser, botsWithLifetimeAccess } =
    useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [modalClosed, setModalClosed] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // New state to track first load

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalClosed(true);
  };

  useEffect(() => {
    // Check if it's the first load of the component
    if (isFirstLoad && user && user.role === "user") {
      // Your existing modal logic
      const modalClosedDate = localStorage.getItem("modalClosedDate");
      if (modalClosedDate) {
        const closedDate = new Date(modalClosedDate);
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

        if (currentDate - closedDate < oneDay) {
          return; // Do not open the modal if it's been less than a day
        }
      }
      setOpenModal(true); // Open the modal only if more than a day has passed
      setIsFirstLoad(false); // Set to false after the first load
    }
  }, [user, isFirstLoad]);

  useProduktlyScript(user && user.role === "user");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownOpen && !event.target.closest(".menu-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) navigate("/");
  }, [isLoggedIn, isLoading, navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetchData("User/logoutuser", "POST");
      if (response.message) {
        toast.success(response.message);
        reloadUser();
        if (window.Tawk_API) window.Tawk_API.hideWidget();
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during logout.");
    }
  };

  if (isLoading) return null;

  return (
    <div>
      <AnnouncementModal
        open={openModal}
        handleClose={handleCloseModal}
        botsWithLifetimeAccess={botsWithLifetimeAccess}
      />

      <HeaderSmall
        user={user}
        botsWithLifetimeAccess={botsWithLifetimeAccess}
        setDropdownOpen={setDropdownOpen}
        dropdownOpen={dropdownOpen}
        handleOpenModal={handleOpenModal}
        handleLogout={handleLogout}
      />

      <div className="admin-container">
        <Sidebar />
        <div className="main-content">
          {user && user.role === "user" && (
            <>
              <div
                className={`chat-toggle-button ${showChat ? "chat-open" : ""}`}
                onClick={() => setShowChat((prev) => !prev)}
              ></div>
              {showChat && (
                <RetuneChat
                  email={user.email}
                  onClose={() => setShowChat(false)}
                />
              )}
            </>
          )}
          <Routes>
            {user && user.role === "Admin" && (
              <>
                <Route path="/" element={<Board />} />
                {/* <Route path="/" element={<Dashboard />} /> */}
                <Route path="/Todo" element={<Todo />} />
                <Route path="/Roadmap" element={<Roadmap />} />
                <Route path="/Notice" element={<Notice />} />
                <Route path="/Playai" element={<Playai />} />
              </>
            )}
            {user && user.role === "user" && (
              <>
                <Route path="/Billing" element={<Billing />} />
                <Route path="/submitticket" element={<Posticket />} />
                <Route path="/configs" element={<Configs />} />
                <Route path="/" element={<Panel />} />
                <Route path="/thankyou" element={<ThankYouComponent />} />
                <Route path="/Lifetime" element={<Lifetime />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
