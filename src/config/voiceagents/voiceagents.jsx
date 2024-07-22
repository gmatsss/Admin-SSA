import { parsePhoneNumberFromString } from "libphonenumber-js";
import React, { useState } from "react";
import "./voiceagents.css";
import TalkIcon from "@mui/icons-material/Phone";
import StopIcon from "@mui/icons-material/Stop";
import SettingsIcon from "@mui/icons-material/Settings";
import { Device } from "twilio-client";
import VAImage from "../../img/VA.webp";

const botsConfig = [
  { id: 1, phoneNumber: "+18704104327", status: "Disconnected" },
  { id: 2, phoneNumber: "+15855083967", status: "Disconnected" },
];

const VoiceAgents = () => {
  const [devices, setDevices] = useState(Array(botsConfig.length).fill(null));
  const [connections, setConnections] = useState(
    Array(botsConfig.length).fill(null)
  );
  const [isTalking, setIsTalking] = useState(
    Array(botsConfig.length).fill(false)
  );
  const [activeBotIndex, setActiveBotIndex] = useState(null);

  const handleTalkClick = (index) => {
    const currentDevice = devices[index];

    if (isTalking[index]) {
      connections[index]?.disconnect();
    } else {
      const rawPhoneNumber = botsConfig[index].phoneNumber;

      const phoneNumber = parsePhoneNumberFromString(rawPhoneNumber);
      if (!phoneNumber || !phoneNumber.isValid()) {
        console.error("Invalid phone number");
        return;
      }
      const formattedPhoneNumber = phoneNumber.format("E.164");

      if (!currentDevice) {
        const url = `${process.env.REACT_APP_API_ENDPOINT}twilio/generateVoiceToken`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const newDevice = new Device(data.token, {
              debug: true,
              closeProtection: true,
            });

            newDevice.on("ready", () => {
              setDevices((prevDevices) => {
                const updatedDevices = [...prevDevices];
                updatedDevices[index] = newDevice;
                return updatedDevices;
              });

              initiateCall(newDevice, formattedPhoneNumber, index);
            });

            newDevice.on("error", (error) => {
              console.error(`Twilio Device Error: ${error.message}`);
            });
          })
          .catch((error) => {
            console.error("Error fetching Twilio token:", error);
          });
      } else {
        initiateCall(currentDevice, formattedPhoneNumber, index);
      }
    }
  };

  const initiateCall = (device, phoneNumber, index) => {
    try {
      const conn = device.connect({
        url: `${process.env.REACT_APP_API_ENDPOINT}twilio/voice`,
        method: "POST",
        params: JSON.stringify({ To: phoneNumber }),
      });

      conn.on("accept", () => {});

      conn.on("reject", (error) => {
        console.error("Call rejected", error);
      });

      conn.on("cancel", () => {});

      conn.on("disconnect", () => {
        setIsTalking((talking) => {
          const newTalking = [...talking];
          newTalking[index] = false;
          return newTalking;
        });
        setConnections((conns) => {
          const newConns = [...conns];
          newConns[index] = null;
          return newConns;
        });
        setActiveBotIndex(null);
      });

      conn.on("error", (error) => {
        console.error("Call error", error);
        if (error.code === 31003) {
          console.error("Error: Invalid phone number format");
        } else {
          console.error(`Error: ${error.message}`);
        }
      });

      setConnections((conns) => {
        const newConns = [...conns];
        newConns[index] = conn;
        return newConns;
      });
      setIsTalking((talking) => {
        const newTalking = [...talking];
        newTalking[index] = true;
        return newTalking;
      });
      setActiveBotIndex(index);
    } catch (error) {
      console.error("Connection error", error);
      if (error.code === 31003) {
        console.error("Error: Invalid phone number format");
      } else {
        console.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="VA-container">
      {botsConfig.map((bot, index) => (
        <div key={bot.id} className="VA-bots-column">
          <div className={`VA-bot-card ${isTalking[index] ? "active" : ""}`}>
            <div className="VA-buttons">
              <button
                className="VA-talk-button"
                onClick={() => handleTalkClick(index)}
                style={{
                  display:
                    activeBotIndex === null || activeBotIndex === index
                      ? "flex"
                      : "none",
                }}
              >
                {isTalking[index] ? (
                  <StopIcon className="VA-button-icon" />
                ) : (
                  <TalkIcon className="VA-button-icon" />
                )}
              </button>
              <button className="VA-configure-button">
                <SettingsIcon className="VA-button-icon" />
              </button>
            </div>
            <div className="VA-bot-card-details">
              <img src={VAImage} alt="Voice Agent" className="VA-bot-image" />
              <h4>SSA Voice Assistant {index + 1}</h4>
              <p>Ready to assist you with any queries.</p>
              {isTalking[index] && (
                <div className="VA-bot-animation talking">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <div key={i} className="VA-line"></div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoiceAgents;
