import React from "react";
import { Link } from "react-router-dom";
import "./ThankYouComponent.css";

const ThankYouComponent = () => {
  return (
    <div className="thank-you-container">
      <h1 className="thank-you-title">Thank You for Your Payment!</h1>
      <p className="thank-you-text">
        Your transaction has been successfully processed.
      </p>
      <p className="thank-you-text">
        If you have any questions or concerns, please contact our support team.
      </p>

      <Link to="/Admin/configs" className="thank-you-button">
        Go to Config
      </Link>
      <Link to="/Admin/Billing" className="thank-you-button">
        View Billing
      </Link>
    </div>
  );
};

export default ThankYouComponent;
