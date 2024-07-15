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

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { toast } from "react-toastify";

const ARecord = ({ aRecordType, aRecordName, aRecordValue, setDnsRecords }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.info("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const aRecordInstructions = (
    <>
      <Typography variant="body2" component="p">
        A Record Setup Instructions
      </Typography>
      <ul>
        <li>Locate the A Record section in your DNS settings.</li>
        <li>Add or update the A Record with the following details bellow:</li>
      </ul>
    </>
  );

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          A Record
        </Typography>
        <Tooltip title={aRecordInstructions}>
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
            disabled
            size="small"
            value={aRecordType || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton onClick={() => copyToClipboard(aRecordType)}>
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
            disabled
            size="small"
            value={aRecordName || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton onClick={() => copyToClipboard(aRecordName)}>
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
            disabled
            size="small"
            value={aRecordValue || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton onClick={() => copyToClipboard(aRecordValue)}>
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

export default ARecord;
