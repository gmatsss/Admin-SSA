import React from "react";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star"; // Importing Star icon from MUI
import CelebrationIcon from "@mui/icons-material/Celebration"; // Importing Celebration icon
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PromotionsContent = ({ botsWithLifetimeAccess, closeModal }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBuyClick = () => {
    closeModal();
    navigate("/Admin/Lifetime");
  };
  return (
    <div style={styles.container}>
      {botsWithLifetimeAccess.length > 0 && (
        <div style={styles.content}>
          <CelebrationIcon style={styles.icon} />
          <h2 style={styles.header}>🌟 Exclusive Lifetime Access Offer! 🌟</h2>
          <p>
            <StarIcon style={styles.starIcon} />
            You have <strong>{botsWithLifetimeAccess.length}</strong> bots
            eligible for lifetime access.
          </p>
          <p>Don't miss this limited-time opportunity to upgrade!</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBuyClick}
            style={styles.button}
          >
            Buy Lifetime Access
          </Button>
        </div>
      )}
      {/* Additional promotional content can be added here */}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  content: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    color: "#333",
    marginBottom: "15px",
  },
  button: {
    marginTop: "20px",
  },
  icon: {
    fontSize: "40px",
    color: "#ff9800", // Orange color for the celebration icon
  },
  starIcon: {
    verticalAlign: "middle", // Aligns the star icon with the text
    color: "#ffd700", // Gold color for the star icon
  },
};

export default PromotionsContent;
