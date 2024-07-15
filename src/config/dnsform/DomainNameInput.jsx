import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { fetchData } from "../../api/FetchData";
import { toast } from "react-toastify";

const DomainNameInput = ({ domainName, setDomainName }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDomainChange = (e) => {
    const value = e.target.value;
    setDomainName(value);

    // Simple domain name validation
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9]+\.[a-zA-Z0-9]{2,})$/;
    setError(!domainRegex.test(value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = { domainName };

      // Make the POST request to the server
      const response = await fetchData("Admin/updatedomainname", "POST", data);

      // Handle the response
      toast.success(response.message);
      // Add any additional submit logic here
    } catch (error) {
      console.error("Error updating domain name:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="domainName"
      sx={{
        margin: "16px 0",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
        Connect Your Domain
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: "16px" }}>
        Enter your domain name below to configure the DNS settings. This will
        ensure that your domain is properly connected to our services.
      </Typography>
      <TextField
        error={error}
        helperText={error ? "Please enter a valid domain name." : ""}
        label="Domain Name"
        variant="outlined"
        fullWidth
        size="small"
        value={domainName}
        onChange={handleDomainChange}
        placeholder="example.com"
        sx={{ marginBottom: "16px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!domainName || error || loading}
      >
        {loading ? "Submitting..." : "Submit Domain"}
      </Button>
    </Box>
  );
};

export default DomainNameInput;
