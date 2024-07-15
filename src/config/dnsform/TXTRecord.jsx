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

const TXTRecord = ({ dnsRecords }) => {
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

  const txtRecordType = dnsRecords?.txtRecordType || "";
  const txtRecordName = dnsRecords?.txtRecordName || "";
  const txtRecordValue = dnsRecords?.txtRecordValue || "";
  const txtRecordInstructions = (
    <>
      <Typography variant="body2" component="p">
        TXT Record Setup Instructions
      </Typography>
      <ul>
        <li>Locate the TXT Record section in your DNS settings.</li>
        <li>Add or update the TXT Record with the following details below:</li>
      </ul>
    </>
  );

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          TXT Record
        </Typography>
        <Tooltip title={txtRecordInstructions}>
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
            value={txtRecordType}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy Type">
                    <IconButton onClick={() => copyToClipboard("TXT", "Type")}>
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
            value={txtRecordName}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy Name">
                    <IconButton
                      onClick={() => copyToClipboard(txtRecordName, "Name")}
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
            value={txtRecordValue}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy Value">
                    <IconButton
                      onClick={() => copyToClipboard(txtRecordValue, "Value")}
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

export default TXTRecord;
