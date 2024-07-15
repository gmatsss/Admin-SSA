import React, { useEffect, useState } from "react";
import { Grid, Paper, Box } from "@mui/material";
import BillingDetails from "./Billingdetails/Billingdetails";
import BillingPlan from "./Billingplan/Billingplan";
import "./bilingstat.css";

const BillingStatus = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [billingInfo, setBillingInfo] = useState({
    status: "",
    start: "",
    firstPaymentAttempt: "",
    nextPaymentAttempt: "",
    currentPeriodStart: "",
    currentPeriodEnd: "",
    managementUrl: "",
  });

  // Update billingInfo based on selectedData
  useEffect(() => {
    if (selectedData) {
      setBillingInfo({
        status: selectedData.status,
        start: selectedData.start,
        firstPaymentAttempt: selectedData.firstPaymentAttempt,
        nextPaymentAttempt: selectedData.nextPaymentAttempt,
        currentPeriodStart: selectedData.currentPeriodStart,
        currentPeriodEnd: selectedData.currentPeriodEnd,
        managementUrl: selectedData.managementUrl,
      });
    }
  }, [selectedData]);

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <BillingPlan setSelectedData={setSelectedData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <BillingDetails billingInfo={billingInfo} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillingStatus;
