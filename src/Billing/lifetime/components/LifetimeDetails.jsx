// LifetimeDetails.js
import React from "react";
import { toast } from "react-toastify";

const LifetimeDetails = ({
  calculateCostPerBot,
  calculateTotalCost,
  subscriptionTypes,
  verificationCode,
  onValidatePayment,
  isLoading,
}) => {
  const handleVerificationCodeClick = () => {
    if (verificationCode) {
      navigator.clipboard
        .writeText(verificationCode)
        .then(() => {
          toast.info("Verification code copied to clipboard!");
        })
        .catch((err) => {
          console.error("Error copying text: ", err);
        });
    }
  };

  const costPerBot = calculateCostPerBot(subscriptionTypes[0]);

  return (
    <div className="lifetime-details">
      <h2>
        <span className="emoji">🌟</span> Unlock the Full Potential with
        Lifetime Access! 🚀
      </h2>
      <p>
        <strong>One-Time Payment, Endless Benefits:</strong> For just $
        {costPerBot} per bot (for {subscriptionTypes[0]} subscription), switch
        to Lifetime Access and embrace a world of convenience. Say goodbye to
        the hassle of recurring payments and enjoy uninterrupted, premium
        service forever!
      </p>

      <p>
        <span className="emoji">💼</span> <strong>Your Current Plan:</strong>{" "}
        You're currently on a {subscriptionTypes.join(", ")} Subscription.
        Imagine upgrading to a plan that grows with your business, without any
        additional costs.
      </p>

      <p>
        <span className="emoji">🚀</span> <strong>Invest in the Future:</strong>{" "}
        Lifetime Access is more than a cost-saving option. It's a strategic
        choice for forward-thinking businesses. Benefit from all future updates,
        enhancements, and exclusive features without spending a penny more.
      </p>
      <p>
        <span className="emoji">🌱</span> <strong>Grow Without Limits:</strong>{" "}
        With Lifetime Access, your tools evolve as your business does. No more
        budgeting for subscription renewals. Just continuous, uninterrupted
        growth.
      </p>
      <p>
        <span className="emoji">🤝</span> Make the smart move today for a
        stress-free tomorrow. Choose Lifetime Access and focus on what truly
        matters – scaling your business and achieving your ambitious goals.
      </p>

      <div className="final-cost-container">
        <span className="emoji">💰</span>
        <strong>
          Total Cost with Lifetime Access: ${calculateTotalCost()}
        </strong>
      </div>

      {verificationCode && (
        <p onClick={handleVerificationCodeClick} style={{ cursor: "pointer" }}>
          <strong>Your Verification Code:</strong> {verificationCode}
        </p>
      )}
      {verificationCode && (
        <button
          onClick={onValidatePayment}
          disabled={isLoading}
          style={{
            backgroundColor: "#4CAF50", // Example styling
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Validating..." : "Validate payment"}
        </button>
      )}
    </div>
  );
};

export default LifetimeDetails;
