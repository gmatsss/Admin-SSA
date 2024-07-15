import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

const CNAMERecord = ({ dnsRecords }) => {
  // Function to copy text to clipboard with toast feedback
  const copyToClipboard = (text, label) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.info(`${label} copied to clipboard`);
      })
      .catch((err) => {
        toast.error("Failed to copy");
        console.error("Failed to copy: ", err);
      });
  };

  const cnameRecordType = dnsRecords?.cnameRecordType || "";
  const cnameRecordName = dnsRecords?.cnameRecordName || "";
  const cnameRecordValue = dnsRecords?.cnameRecordValue || "";

  const cnameRecordInstructions = (
    <>
      <Typography variant="body2" component="p">
        CNAME Record Setup Instructions
      </Typography>
      <ul>
        <li>Locate the CNAME section in your DNS settings.</li>
        <li>
          Add or update the CNAME record with the following details below:
        </li>
      </ul>
    </>
  );
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          CNAME Record
        </Typography>
        <Tooltip title={cnameRecordInstructions}>
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={2} sx={{ marginBottom: "24px" }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Type"
            variant="outlined"
            fullWidth
            size="small"
            value={cnameRecordType}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton
                      onClick={() => copyToClipboard(cnameRecordType, "Type")}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            size="small"
            value={cnameRecordName}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton
                      onClick={() => copyToClipboard(cnameRecordName, "Name")}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Value"
            variant="outlined"
            fullWidth
            size="small"
            value={cnameRecordValue}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton
                      onClick={() => copyToClipboard(cnameRecordValue, "Value")}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CNAMERecord;
