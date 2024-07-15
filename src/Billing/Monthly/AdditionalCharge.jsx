import React from "react";
import "./AdditionalCharge.css";

const AdditionalCharge = ({ botChannelValue }) => {
  const totalCost = botChannelValue * 19;

  return (
    <div className="additional-container">
      <div className="additional-header">
        <h2 className="additional-title">Expand Your Bot's Reach</h2>
        <p className="additional-description">
          Enhance your bot's capabilities by integrating with multiple channels.
          Each channel offers unique advantages and caters to different user
          preferences.
        </p>
      </div>

      <div className="additional-cost-info">
        <div className="cost-detail">
          <span className="cost-title">Total Channels Selected:</span>
          <span className="cost-value">{botChannelValue}</span>
        </div>
        <div className="cost-detail">
          <span className="cost-title">Cost Per Channel:</span>
          <span className="cost-value">$19.00</span>
        </div>
        <div className="cost-detail">
          <span className="cost-title">Total Additional Cost:</span>
          <span className="cost-value">${totalCost}.00</span>
        </div>
      </div>

      <div className="additional-benefits">
        <h3 className="benefits-title">Additional Channels</h3>
        <ul className="benefits-list">
          <p>
            Investing in additional channels is a strategic move towards better
            user engagement and wider reach. As you grow, these channels will
            play a crucial role in maintaining effective communication and
            delivering exceptional user experiences.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default AdditionalCharge;
