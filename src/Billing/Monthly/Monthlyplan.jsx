import React from "react";
import "./Montlyplan.css";

const Monthlyplan = ({ numberOfBots = 1 }) => {
  const botBuildFees = [495, 395, 295, 195];
  const monthlySubscription = 149;
  const buildFee = botBuildFees[numberOfBots - 1] || botBuildFees[3];
  const totalPayment = buildFee + monthlySubscription;

  return (
    <div className="plan-container">
      <h1 className="plan-title">Your Monthly Plan</h1>
      <p className="plan-description">
        Choose the perfect plan for {numberOfBots} Bot
        {numberOfBots > 1 ? "s" : ""}. Tailored to meet your needs, our plans
        offer flexibility, advanced features, and dedicated support.
      </p>

      <div className="plan-details">
        <div className="detail-item">
          <span className="detail-title">Bot Build Fee</span>
          <p className="detail-info">
            One-time fee: <strong>${buildFee.toFixed(2)}</strong>
            <br />
            Custom setup for {numberOfBots} Bot{numberOfBots > 1 ? "s" : ""}
          </p>
        </div>

        <div className="detail-item">
          <span className="detail-title">Monthly Subscription</span>
          <p className="detail-info">
            Monthly rate: <strong>${monthlySubscription.toFixed(2)}</strong>
            <br />
            Continuous access, updates, and support.
          </p>
        </div>

        <div className="detail-item total-cost">
          <span className="detail-title">Total Initial Payment</span>
          <p className="detail-info">
            <strong>${totalPayment.toFixed(2)}</strong>
            <br />
            Get started with everything you need for your bot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Monthlyplan;
