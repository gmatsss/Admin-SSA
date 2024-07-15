// ApiKeyForm.js
import React from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
const ApiKeyForm = ({ apiKeys, setApiKeys, handleSubmit, openAPIKey }) => {
  // Handler for input changes
  const handleInputChange = (e, key) => {
    setApiKeys({ ...apiKeys, [key]: e.target.value });
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "1000px", // Increased width to accommodate row layout
        margin: "auto",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 12px 24px 0 rgba(0,0,0,0.15)",
        backgroundColor: "#f9f9f9",
        border: "1px solid #d0d0d0",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          fontWeight: "bold",
          color: "#333",
          marginBottom: "16px",
        }}
      >
        API Key Setup
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        sx={{
          color: "#666",
          marginBottom: "24px",
        }}
      >
        To ensure a seamless experience, please provide one of your API keys
        below.
      </Typography>
      <Grid container spacing={2} className="typeyourapikeys">
        <Grid item xs={12} md={4}>
          <TextField
            label="OpenAI API Key"
            variant="outlined"
            fullWidth
            value={apiKeys.openAI || openAPIKey?.OpenAI || ""}
            onChange={(e) => handleInputChange(e, "openAI")}
            sx={{
              ".MuiInputLabel-root": { color: "#666" },
              ".MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
              },
              ".MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": { borderColor: "#1976d2" },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Claude API Key"
            variant="outlined"
            fullWidth
            value={apiKeys.claude || openAPIKey?.Claude || ""}
            onChange={(e) => handleInputChange(e, "claude")}
            sx={{
              ".MuiInputLabel-root": { color: "#666" },
              ".MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
              },
              ".MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": { borderColor: "#1976d2" },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="OpenRouter API Key"
            variant="outlined"
            fullWidth
            value={apiKeys.openRouter || openAPIKey?.OpenRouter || ""}
            onChange={(e) => handleInputChange(e, "openRouter")}
            sx={{
              ".MuiInputLabel-root": { color: "#666" },
              ".MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
              },
              ".MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": { borderColor: "#1976d2" },
              },
            }}
          />
        </Grid>
      </Grid>
      <Button
        className="savechanges"
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{
          padding: "10px 0",
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#115293" },
          fontSize: "1rem",
          fontWeight: "bold",
          marginTop: "24px", // Added margin for spacing
        }}
      >
        Save changes
      </Button>
    </Box>
  );
};

export default ApiKeyForm;
