import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import BillingStatus from "./BillingStatus/BillingStatus";
import Mainmonthly from "./Monthly/mainMonthly";
import MainYearly from "./Yearly/mainYearly";

const Billing = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="Billing">
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        className="Billing-tabs"
      >
        <Tab label="Plan Status" className="planstatus" />
        <Tab label="Buy monthly Bots" className="monthlybots" />
        <Tab label="Buy yearly Bots" className="yearlybots" />
      </Tabs>

      <Box hidden={tabValue !== 0} className="Billing-tabContent">
        <BillingStatus />
      </Box>

      <Box hidden={tabValue !== 1} className="Billing-tabContent">
        <Mainmonthly />
      </Box>

      <Box hidden={tabValue !== 2} className="Billing-tabContent">
        <MainYearly />
      </Box>

      <div className="additional-content">
        {/* Additional content below tabs goes here */}
      </div>
    </div>
  );
};

export default Billing;
