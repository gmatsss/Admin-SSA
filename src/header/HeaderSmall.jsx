import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import UserProfile from "./components/userprofile/userprofile";

const HeaderSmall = ({
  user,
  botsWithLifetimeAccess,
  setDropdownOpen,
  dropdownOpen,
  handleLogout,
  handleOpenModal,
}) => {
  const [showUserProfile, setShowUserProfile] = useState(false); // State to control UserProfile modal
  const navigate = useNavigate(); // Hook for navigation
  const promoClass =
    botsWithLifetimeAccess && botsWithLifetimeAccess.length > 0 ? "" : "hidden";

  const handlePromoClick = () => {
    navigate("/Admin/Lifetime"); // Navigate to the Lifetime Access page
  };

  const toggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
    setDropdownOpen(false);
  };

  // Function to be passed to UserProfile to update the state
  const handleUserProfileClose = () => {
    setShowUserProfile(false);
  };

  return (
    <div className="header_small me-3">
      <div
        className={`lifetime-access-promo ${promoClass}`}
        onClick={handlePromoClick} // Add click handler
        style={{ cursor: "pointer" }} // Change cursor to indicate clickability
      >
        <p>Special Offer: Buy Lifetime Access!</p>
      </div>

      <div className="controle">
        {/* User Details */}
        <div className="user-details">
          <p className="user-name">{user?.fullname}</p>
          <p className="user-email">{user?.email}</p>
        </div>
        {/* Dropdown Menu */}
        <div className={`menu-container ${dropdownOpen && "open"}`}>
          <button
            className="menu-icon"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            ☰
          </button>
          {dropdownOpen && (
            <div className="custom-dropdown">
              <div onClick={toggleUserProfile}>User profile</div>
              <div onClick={handleOpenModal}>Announcement</div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
      {showUserProfile && <UserProfile onClose={handleUserProfileClose} />}
    </div>
  );
};

export default HeaderSmall;
