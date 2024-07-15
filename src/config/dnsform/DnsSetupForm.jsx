// DnsSetupForm.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ARecord from "./ARecord";
import TXTRecord from "./TXTRecord";
import CNAMERecord from "./CNAMERecord";
import DomainNameInput from "./DomainNameInput";

const DnsSetupForm = ({
  domainName,
  setDomainName,
  dnsRecords: initialDnsRecords,
}) => {
  const [dnsRecords, setDnsRecords] = useState({
    aRecordType: "",
    aRecordName: "",
    aRecordValue: "",
    txtRecordType: "",
    txtRecordName: "",
    txtRecordValue: "",
    cnameRecordType: "",
    cnameRecordName: "",
    cnameRecordValue: "",
  });

  console.log(domainName);
  // Effect to update the state whenever initialDnsRecords changes
  useEffect(() => {
    if (initialDnsRecords) {
      setDnsRecords(initialDnsRecords);
    }
  }, [initialDnsRecords]);

  const generalDnsInstructions = (
    <>
      <Typography variant="body2" component="p" gutterBottom>
        Follow these steps to set up your DNS settings:
      </Typography>
      <ol>
        <li>
          <strong>Sign in to Your Domain Registrar:</strong>
          <ul>
            <li>
              Visit the website of the company where you registered your domain
              (such as GoDaddy or Namecheap).
            </li>
            <li>Enter your login credentials to access your account.</li>
          </ul>
        </li>
        <li>
          <strong>Access Domain Management:</strong>
          <ul>
            <li>
              In your account dashboard, look for a section called 'My Domains',
              'Domain Management', or similar.
            </li>
            <li>Select the domain you want to configure.</li>
          </ul>
        </li>
        <li>
          <strong>Modify DNS Records:</strong>
          <ul>
            <li>
              Find the 'DNS Settings', 'Name Server Management', or similar
              section.
            </li>
            <li>Enter the DNS records provided bellow.</li>
          </ul>
        </li>
        <li>
          <strong>Save Changes:</strong>
          <ul>
            <li>
              After entering all the DNS records, make sure to save your
              changes.
            </li>
          </ul>
        </li>
        <li>
          <strong>Wait for Propagation:</strong>
          <ul>
            <li>
              DNS changes can take up to 48 hours to propagate throughout the
              Internet.
            </li>
          </ul>
        </li>
        <li>
          <strong>Verification:</strong>
          <ul>
            <li>
              Once DNS settings have propagated, the 'Unverified' status on your
              dashboard will change to 'Verified'.
            </li>
            <li>
              If the status does not change after 48 hours, ensure the DNS
              records are entered correctly and if error still persist contact
              us
            </li>
          </ul>
        </li>
      </ol>
    </>
  );

  return (
    <Box
      sx={{
        maxWidth: "90vw", // Set maximum width to 90% of the viewport width
        padding: "12px", // Further reduced padding
        borderRadius: "8px",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.15)",
        backgroundColor: "#f9f9f9",
        border: "1px solid #d0d0d0",
      }}
    >
      <DomainNameInput domainName={domainName} setDomainName={setDomainName} />

      <div className="dnssets">
        <Tooltip
          title={generalDnsInstructions}
          sx={{
            "& .MuiTooltip-tooltip": {
              maxWidth: "none", // Remove the max-width restriction
              minWidth: "500px", // Set a minimum width for the tooltip
              // You can also set a fixed width with 'width' instead of 'minWidth' if you prefer
            },
          }}
        >
          <Typography
            variant="h4"
            component="h2" // Ensure it's an h2 for semantic meaning if it's a title
            sx={{
              fontWeight: "bold",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "center", // This will center the Typography text
              alignItems: "center",
              width: "100%", // Ensure the Typography fills its container
            }}
          >
            DNS Setup
            <HelpOutlineIcon sx={{ marginLeft: 1, fontSize: "1em" }} />
          </Typography>
        </Tooltip>

        <div>
          <ARecord
            aRecordType={dnsRecords.aRecordType}
            aRecordName={dnsRecords.aRecordName}
            aRecordValue={dnsRecords.aRecordValue}
            setDnsRecords={setDnsRecords}
          />

          <TXTRecord dnsRecords={dnsRecords} setDnsRecords={setDnsRecords} />
          <CNAMERecord dnsRecords={dnsRecords} setDnsRecords={setDnsRecords} />
        </div>
      </div>
    </Box>
  );
};

export default DnsSetupForm;
