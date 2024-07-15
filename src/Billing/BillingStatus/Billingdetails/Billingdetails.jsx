// BillingDetails.js
import React from "react";
import { Paper, Typography, Button, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Importing HelpOutlineIcon for tooltip

import { toast } from "react-toastify";

const BillingDetails = ({ billingInfo }) => {
  const handleManageClick = () => {
    if (!billingInfo.managementUrl) {
      toast.info("Please select a plan on the table.");
      return;
    }
    window.open(billingInfo.managementUrl, "_blank");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Paper elevation={3} className="billing-status-col">
      <div className="billing-header">
        <Typography variant="h6" className="billing-title">
          Billing Details
        </Typography>

        <div className="status-container">
          <Typography
            className={`billing-status status-${billingInfo.status.toLowerCase()}`}
          >
            {capitalizeFirstLetter(billingInfo.status)}
          </Typography>
          <Tooltip title="This status indicates whether your plan is active, paused, or canceled. A non-active status will stop your bot from working.">
            <HelpOutlineIcon style={{ marginLeft: 4, cursor: "pointer" }} />
          </Tooltip>
        </div>
      </div>

      <div className="receipt-border">
        <div className="receipt-item">
          <span className="receipt-item-title">Start:</span>
          <span className="receipt-item-value">{billingInfo.start}</span>
        </div>
        <div className="receipt-item">
          <span className="receipt-item-title">First Payment Attempt:</span>
          <span className="receipt-item-value">
            {billingInfo.firstPaymentAttempt}
          </span>
        </div>
        <div className="receipt-item">
          <span className="receipt-item-title">Next Payment Attempt:</span>
          <span className="receipt-item-value">
            {billingInfo.nextPaymentAttempt}
          </span>
        </div>
        <div className="receipt-item">
          <span className="receipt-item-title">Current Period Start:</span>
          <span className="receipt-item-value">
            {billingInfo.currentPeriodStart}
          </span>
        </div>
        <div className="receipt-item">
          <span className="receipt-item-title">Current Period End:</span>
          <span className="receipt-item-value">
            {billingInfo.currentPeriodEnd}
          </span>
        </div>
      </div>

      <div className="payment-info">
        <InfoIcon className="payment-info-icon" />
        <Typography variant="body2" className="payment-info-text">
          To view detailed billing information and manage your plan, please
          select a plan from the table and then click on the button below
        </Typography>
      </div>

      <div className="billing-footer">
        <Button variant="contained" color="primary" onClick={handleManageClick}>
          Manage payment details
        </Button>
      </div>
    </Paper>
  );
};

export default BillingDetails;
