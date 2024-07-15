import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./announce.css";
import AnnouncementContent from "./AnnouncementContent/AnnouncementContent";
import PromotionsContent from "./PromotionsContent/PromotionsContent";
import RoadmapContent from "./RoadmapContent/RoadmapContent";
import Badge from "@mui/material/Badge"; // Import Badge component
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PromotionIcon from "@mui/icons-material/LocalOffer";
import RoadmapIcon from "@mui/icons-material/Explore";

const AnnouncementModal = ({ open, handleClose, botsWithLifetimeAccess }) => {
  const [activeTab, setActiveTab] = useState("Announcement");
  const [doNotShowAgain, setDoNotShowAgain] = useState(false); // New state for the checkbox

  const modifiedHandleClose = () => {
    handleClose();
    if (doNotShowAgain) {
      const currentDate = new Date().toISOString();
      localStorage.setItem("modalClosedDate", currentDate);
    }
  };

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "800px",
    height: "70%",
    maxHeight: "600px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
    p: 4,
    display: "flex",
    borderRadius: "8px",
    overflow: "auto",
    bgcolor: "rgba(245, 245, 245, 0.95)", // Light gray with slight transparency
  };

  const titleStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  };

  const titleTextStyle = {
    marginLeft: "10px",
    fontWeight: "bold",
    fontSize: "1.4em",
  };

  const getContent = () => {
    let content;
    let icon;
    let title;

    switch (activeTab) {
      case "Announcement":
        content = <AnnouncementContent />;
        icon = <AnnouncementIcon />;
        title = "Announcement";
        break;
      case "Promotions":
        content = (
          <PromotionsContent
            botsWithLifetimeAccess={botsWithLifetimeAccess}
            closeModal={handleClose}
          />
        );
        icon = <PromotionIcon />;
        title = "Promotions";
        break;
      case "Roadmap":
        content = <RoadmapContent />;
        icon = <RoadmapIcon />;
        title = "Roadmap";
        break;
      default:
        return "Content not found.";
    }

    return (
      <div>
        <div style={titleStyle}>
          {icon}
          <Typography variant="h6" component="h2" style={titleTextStyle}>
            {title}
          </Typography>
        </div>
        {content}
      </div>
    );
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.5em",
    cursor: "pointer",
  };

  const tabButtonStyle = {
    margin: "10px 0",
    width: "100%",
    justifyContent: "flex-start",
  };

  const checkboxStyle = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Align items horizontally
    gap: "10px", // Space between checkbox and label
  };

  const animationStyle = open
    ? { animation: "modalOpenAnimation 0.5s ease-out forwards" }
    : { animation: "modalCloseAnimation 0.5s ease-in forwards" };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={animationStyle} // Apply animation here
    >
      <Box sx={boxStyle}>
        {/* Left Section for Content */}
        <Box sx={{ flex: 3, paddingRight: 2 }}>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {getContent()}
          </Typography>
        </Box>

        {/* Right Section for Control Tabs */}
        <Box
          sx={{
            flex: 1,
            borderLeft: 1,
            borderColor: "divider",
            paddingLeft: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Adjust for spacing
          }}
        >
          <div>
            <Button
              style={tabButtonStyle}
              onClick={() => setActiveTab("Announcement")}
            >
              Announcement
            </Button>
            <Badge badgeContent={botsWithLifetimeAccess.length} color="primary">
              <Button
                style={tabButtonStyle}
                onClick={() => setActiveTab("Promotions")}
              >
                Promotions
              </Button>
            </Badge>
            <Button
              style={tabButtonStyle}
              onClick={() => setActiveTab("Roadmap")}
            >
              Roadmap
            </Button>
          </div>
          <div style={checkboxStyle}>
            <p> Do not show for 1 day</p>
            <input
              type="checkbox"
              checked={doNotShowAgain}
              onChange={(e) => setDoNotShowAgain(e.target.checked)}
            />
          </div>
          <button style={closeButtonStyle} onClick={modifiedHandleClose}>
            X
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AnnouncementModal;
