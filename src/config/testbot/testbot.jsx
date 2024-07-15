import React, { useState } from "react";
import "./testbot.css";
import {
  FaRobot,
  FaIndustry,
  FaVolumeUp,
  FaLock,
  FaInfoCircle,
  FaHeadset, // Added import for FaHeadset
  FaDollarSign, // Added import for FaDollarSign
} from "react-icons/fa";

const Testbot = ({ agents }) => {
  const [selectedBot, setSelectedBot] = useState(null);

  const handleBotSelection = (bot) => {
    setSelectedBot(bot);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pause":
        return "#f1c40f"; // Yellow color for "Pause"
      case "cancel":
        return "#dc3545"; // Red color for "Cancel"
      case "in progress":
        return "#e67e22"; // Orange color for "In Progress"
      case "active":
        return "#28a745"; // Green color for "Active"
      default:
        return "#6c757d"; // Default color
    }
  };

  const chatMessages = [
    { sender: "bot", text: "Hello! How can I assist you today?" },
    { sender: "user", text: "I'm having trouble accessing my account." },
    {
      sender: "bot",
      text: "I can help with that. Could you please provide your account ID?",
    },
    { sender: "user", text: "Sure, it's 12345." },
    {
      sender: "bot",
      text: "Thank you. I'm checking your account details now.",
    },
  ];

  const getAgentTypeIcon = (agentType) => {
    switch (agentType) {
      case "CustomerService":
        return <FaHeadset className="info-icon" />; // Example icon
      case "SalesAgents":
        return <FaDollarSign className="info-icon" />; // Example icon
      // Add more cases as needed
      default:
        return <FaRobot className="info-icon" />;
    }
  };

  return (
    <div className="testbot">
      <div className="botlist">
        <div className="sticky-header">
          <h1>Your Bots</h1>
        </div>

        {agents &&
          agents.map((agent, index) => (
            <div
              key={index}
              className={`bot-card ${
                agent.lifetimeAccess ? "lifetime-access" : ""
              }`}
              onClick={() => handleBotSelection(agent)}
            >
              <div className="bot-header">
                <FaRobot
                  className="bot-icon"
                  style={{ color: getStatusColor(agent.botStatus) }}
                />
                <div className="bot-id">ID: {agent._id}</div>
              </div>
              <div className="bot-info">
                {getAgentTypeIcon(agent.agentType)}
                <span>Agent Type: {agent.agentType}</span>
              </div>
              <div className="bot-info">
                <FaIndustry className="info-icon" />
                <span>Industry: {agent.serviceIndustry}</span>
              </div>
              <div className="bot-info">
                <FaVolumeUp className="info-icon" />
                <span>Tone: {agent.toneOfVoice}</span>
              </div>
              <div className="bot-info">
                <FaLock className="info-icon" />
                <span>
                  Access: {agent.lifetimeAccess ? "Lifetime" : "Recurring"}
                </span>
              </div>
              <div className="bot-info">
                <FaInfoCircle className="info-icon" />
                <span>Status: {agent.botStatus}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="botchat">
        {selectedBot ? (
          selectedBot.botStatus.toLowerCase() === "active" ? (
            <div className="cont-chatarea">
              <div className="chat-area">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message ${
                      msg.sender === "bot" ? "received" : "sent"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="chat-input-area">
                <input type="text" placeholder="Type a message..." />
                <button type="submit">Send</button>
              </div>
            </div>
          ) : (
            <div className="inactive-chat">The selected bot is not active.</div>
          )
        ) : (
          <div className="select-bot-message">Please select a bot.</div>
        )}
      </div>
    </div>
  );
};

export default Testbot;
