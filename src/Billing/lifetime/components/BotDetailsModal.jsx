// BotDetailsModal.js
import React from "react";
import Modal from "@mui/material/Modal";

const BotDetailsModal = ({
  modalOpen,
  handleCloseModal,
  selectedBotDetails,
}) => {
  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <div className="bot-details-modal">
        <h2>{selectedBotDetails?.agentType}</h2>
        <p>Tone of Voice: {selectedBotDetails?.toneOfVoice}</p>
        <p>Service Industry: {selectedBotDetails?.serviceIndustry}</p>
        <p>Bot Status: {selectedBotDetails?.botStatus}</p>
      </div>
    </Modal>
  );
};

export default BotDetailsModal;
