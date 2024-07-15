import React from "react";
import "./Yearlyplan.css"; // Ensure this CSS file has styles corresponding to the new class names

const YearlyPlan = ({ numberOfBots = 1 }) => {
  const botBuildFees = [495, 395, 295, 195];
  const monthlyUpkeepFee = 99.95;
  const buildFee = botBuildFees[numberOfBots - 1] || botBuildFees[3];
  const yearlySubscription = monthlyUpkeepFee * 12;
  const totalYearlyPayment = buildFee + yearlySubscription;

  return (
    <div className="plan-container">
      <h1 className="plan-title">Your Yearly Plan</h1>
      <p className="plan-description">
        Unlock unparalleled efficiency and premium features with our yearly
        subscription tailored for {numberOfBots} bot
        {numberOfBots > 1 ? "s" : ""}. Ideal for those who aim for the pinnacle
        of excellence.
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
          <span className="detail-title">Yearly Subscription</span>
          <p className="detail-info">
            Annual rate: <strong>${yearlySubscription.toFixed(2)}</strong>
            <br />
            Continuous access, updates, and support for a year.
          </p>
        </div>

        <div className="detail-item total-cost">
          <span className="detail-title">Total Yearly Payment</span>
          <p className="detail-info">
            <strong>${totalYearlyPayment.toFixed(2)}</strong>
            <br />
            Secure a full year of service for your bot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default YearlyPlan;
