import React from "react";
import "./Apikey.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Apikey = ({ onboardingDetails }) => {
  // Check if openAPIKey is available, if not, use an empty object
  const { openAPIKey } = onboardingDetails || {};
  const apiKeys = openAPIKey ? openAPIKey : {};

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info(`API key ${text} copied`);
  };

  // Check if apiKeys is empty
  if (Object.keys(apiKeys).length === 0) {
    return <div className="apikey-container">No API keys available.</div>;
  }

  return (
    <div className="apikey-container">
      {Object.entries(apiKeys).map(([key, value]) => (
        <div key={key} className="apikey-card">
          <h2 className="apikey-title">{key}: </h2>
          <div className="apikey-value">
            <p>{value}</p>
            <FontAwesomeIcon
              icon={faCopy}
              className="copy-icon"
              onClick={() => copyToClipboard(value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Apikey;
