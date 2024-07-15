import React from "react";
import "./RetuneChat.css";

const RetuneChat = ({ email, onClose }) => {
  // Using the new iframe source provided
  const newIframeSrc =
    "https://retune.so/share/chat/11ee76ff-d45a-c2c0-86d3-a99d0324d0cc/widget";

  return (
    <div className="retune-chat-widget">
      {/* Close Button */}
      <button className="chat-close-button" onClick={onClose}>
        X
      </button>

      <iframe
        src={newIframeSrc}
        width="400" // Updated width
        height="500" // Updated height
        style={{ border: "0", background: "white" }}
        title="Retune Chat Widget"
      ></iframe>
    </div>
  );
};

export default RetuneChat;
