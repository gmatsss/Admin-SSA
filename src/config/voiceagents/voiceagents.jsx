import React, { useEffect, useState } from "react";
import "./voiceagents.css";
import BotIcon from "@mui/icons-material/Android";
import TalkIcon from "@mui/icons-material/Phone";
import SettingsIcon from "@mui/icons-material/Settings";
import { Device } from "twilio-client";

const VoiceAgents = () => {
  const [phone, setPhone] = useState(null);
  const [status, setStatus] = useState("Disconnected");

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch("/twilio/token"); // Adjust the endpoint as necessary
      const data = await response.json();
      const newPhone = new Device();
      newPhone.setup(data.token);
      setPhone(newPhone);
      newPhone.on("connect", () => setStatus("Connected"));
      newPhone.on("disconnect", () => setStatus("Disconnected"));
    };
    fetchToken();
  }, []);

  const handleTalkClick = () => {
    phone.connect({ number: "+18704104327" });
  };

  return (
    <div className="VA-container">
      <div className="VA-bots-column">
        <div className="VA-bot-card">
          <div className="VA-bot-card-icon">
            <BotIcon />
          </div>
          <div className="VA-bot-card-details">
            <h4>Assistant Bot</h4>
            <p>Ready to assist you with any queries.</p>
          </div>
        </div>
      </div>
      <div className="VA-talk-button-column">
        <button className="VA-talk-button" onClick={handleTalkClick}>
          <TalkIcon className="VA-button-icon" /> Talk
        </button>
        <button className="VA-configure-button">
          <SettingsIcon className="VA-button-icon" /> Configure
        </button>
      </div>
    </div>
  );
};

export default VoiceAgents;
