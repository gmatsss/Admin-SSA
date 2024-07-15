import React, { useEffect, useState } from "react";
import "./Dnssetup.css"; // Ensure this CSS file is created and imported
import { fetchData } from "../../api/FetchData";
import { toast } from "react-toastify";

const Dnssetup = ({ onboardingDetails, refreshClients }) => {
  // Initialize state for each input field
  const [dnsRecordState, setDnsRecordState] = useState({
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

  // Effect to update state when onboardingDetails changes
  useEffect(() => {
    if (onboardingDetails?.dnsRecords) {
      setDnsRecordState({
        aRecordType: onboardingDetails.dnsRecords.aRecordType || "",
        aRecordName: onboardingDetails.dnsRecords.aRecordName || "",
        aRecordValue: onboardingDetails.dnsRecords.aRecordValue || "",
        txtRecordType: onboardingDetails.dnsRecords.txtRecordType || "",
        txtRecordName: onboardingDetails.dnsRecords.txtRecordName || "",
        txtRecordValue: onboardingDetails.dnsRecords.txtRecordValue || "",
        cnameRecordType: onboardingDetails.dnsRecords.cnameRecordType || "",
        cnameRecordName: onboardingDetails.dnsRecords.cnameRecordName || "",
        cnameRecordValue: onboardingDetails.dnsRecords.cnameRecordValue || "",
      });
    }
  }, [onboardingDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDnsRecordState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, email } = onboardingDetails;
    const submissionData = {
      user,
      email,
      dnsRecords: dnsRecordState,
    };

    try {
      const response = await fetchData(
        "Admin/postdnsrecords",
        "POST",
        submissionData
      );
      toast.success("DNS records updated successfully");
      refreshClients();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update DNS records: " + error.message);
    }
  };

  return (
    <div>
      {!onboardingDetails ? (
        <div className="no-dns-message">
          No DNS available, please select a user.
        </div>
      ) : (
        <>
          <div className="domain-container">
            <p>Domain name: {onboardingDetails?.domainName}</p>
          </div>
          <div className="dns-setup-container">
            <form className="dns-setup-form" onSubmit={handleSubmit}>
              {/* A Record Fields */}
              <label>
                A Record Type
                <input
                  type="text"
                  name="aRecordType"
                  value={dnsRecordState.aRecordType}
                  onChange={handleChange}
                />
              </label>
              <label>
                A Record Name
                <input
                  type="text"
                  name="aRecordName"
                  value={dnsRecordState.aRecordName}
                  onChange={handleChange}
                />
              </label>
              <label>
                A Record Value
                <input
                  type="text"
                  name="aRecordValue"
                  value={dnsRecordState.aRecordValue}
                  onChange={handleChange}
                />
              </label>

              {/* TXT Record Fields */}
              <label>
                TXT Record Type
                <input
                  type="text"
                  name="txtRecordType"
                  value={dnsRecordState.txtRecordType}
                  onChange={handleChange}
                />
              </label>
              <label>
                TXT Record Name
                <input
                  type="text"
                  name="txtRecordName"
                  value={dnsRecordState.txtRecordName}
                  onChange={handleChange}
                />
              </label>
              <label>
                TXT Record Value
                <input
                  type="text"
                  name="txtRecordValue"
                  value={dnsRecordState.txtRecordValue}
                  onChange={handleChange}
                />
              </label>

              {/* CNAME Record Fields */}
              <label>
                CNAME Record Type
                <input
                  type="text"
                  name="cnameRecordType"
                  value={dnsRecordState.cnameRecordType}
                  onChange={handleChange}
                />
              </label>
              <label>
                CNAME Record Name
                <input
                  type="text"
                  name="cnameRecordName"
                  value={dnsRecordState.cnameRecordName}
                  onChange={handleChange}
                />
              </label>
              <label>
                CNAME Record Value
                <input
                  type="text"
                  name="cnameRecordValue"
                  value={dnsRecordState.cnameRecordValue}
                  onChange={handleChange}
                />
              </label>

              <button type="submit" className="button-dns">
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Dnssetup;
