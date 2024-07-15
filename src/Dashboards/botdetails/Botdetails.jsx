import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faIdBadge,
  faIndustry,
  faMicrophoneAlt,
  faInfinity,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import "./Botdetails.css";
import {
  FaDollarSign,
  FaHeadset,
  FaRobot as FaRobotIcon,
} from "react-icons/fa";
import Modalbot from "./components/modalbot";

const Botdetails = ({ onboardingDetails, refreshClients }) => {
  const [selectedBot, setSelectedBot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (bot) => {
    setSelectedBot(bot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAgentTypeIcon = (agentType) => {
    switch (agentType) {
      case "CustomerService":
        return <FaHeadset className="info-icon" />;
      case "SalesAgents":
        return <FaDollarSign className="info-icon" />;
      default:
        return <FaRobotIcon className="info-icon" />;
    }
  };

  // Flatten the nested agents array
  const bots =
    onboardingDetails?.agents?.reduce(
      (acc, item) => acc.concat(item.agents),
      []
    ) || [];

  return (
    <div className="bot-details-parent">
      {bots.length === 0 ? (
        <p>No bot details available.</p>
      ) : (
        bots.map((bot, index) => (
          <div key={index} className="bot-details-container">
            <div className="bot-header">
              <div className="header-id">
                {getAgentTypeIcon(bot.agentType)}
                <span> {bot.agentType}</span>
              </div>
              <div className="header-industry">
                <FontAwesomeIcon icon={faIndustry} /> {bot.serviceIndustry}
              </div>
              <div className="header-id">
                <FontAwesomeIcon icon={faIdBadge} /> ID: {bot._id}
              </div>
            </div>
            <hr />

            <div className="bot-details-grid">
              <div className="bot-detail">
                <FontAwesomeIcon icon={faRobot} /> Status: {bot.botStatus}
              </div>
              <div className="bot-detail">
                <FontAwesomeIcon icon={faMicrophoneAlt} /> Tone of Voice:{" "}
                {bot.toneOfVoice}
              </div>
              <div className="bot-detail">
                <FontAwesomeIcon icon={faInfinity} /> Access:{" "}
                {bot.lifetimeAccess ? "Lifetime" : "Recurring"}
              </div>
              <div className="bot-detail">
                <FontAwesomeIcon icon={faNetworkWired} /> SSA API: {bot.SSAApi}
              </div>
            </div>
            <div>
              <button
                className="buttoncard"
                onClick={() => handleEditClick(bot)}
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
      {isModalOpen && selectedBot && (
        <Modalbot
          bot={selectedBot}
          onClose={closeModal}
          userid={onboardingDetails?.user}
          onRefresh={refreshClients}
        />
      )}
    </div>
  );
};

export default Botdetails;
