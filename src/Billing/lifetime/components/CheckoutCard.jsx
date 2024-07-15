// CheckoutCard.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const CheckoutCard = ({
  botsWithLifetimeAccess,
  selectedBots,
  handleSelectionChange,
  handleViewDetails,
  onProceedToCheckout,
}) => {
  return (
    <div className="checkout-card">
      <div className="card-header">Your Selection</div>
      <div className="card-body">
        {botsWithLifetimeAccess.map((bot) => (
          <div key={bot.agentId} className="bot-selection">
            <input
              type="checkbox"
              id={bot.agentId}
              name="bot"
              value={bot.agentId}
              checked={selectedBots.includes(bot.agentId)}
              onChange={() => handleSelectionChange(bot.agentId)}
            />
            <label htmlFor={bot.agentId}>{bot.agentType}</label>
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => handleViewDetails(bot)}
            />
          </div>
        ))}
      </div>
      <div className="card-footer">
        <button className="checkout-button" onClick={onProceedToCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
