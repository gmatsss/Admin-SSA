import "./configs.css";
import Testbot from "./testbot/testbot";
import React, { useEffect, useState } from "react";
import { Badge } from "@mui/material";
import { fetchData } from "../api/FetchData";
import { toast } from "react-toastify";
import ApiKeyForm from "./apiform/ApiKeyForm";
import DnsSetupForm from "./dnsform/DnsSetupForm";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DnsIcon from "@mui/icons-material/Dns";
import TestIcon from "@mui/icons-material/Flaky";
import VoiceIcon from "@mui/icons-material/RecordVoiceOver"; // Import voice icon
import VoiceAgents from "./voiceagents/voiceagents";

const Configs = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("Bots");

  const [apiKeys, setApiKeys] = useState({
    openAI: "",
    claude: "",
    openRouter: "",
  });

  const [userinfo, setUserinfo] = useState([]);
  const [domainName, setDomainName] = useState("");
  const [flattenedAgents, setFlattenedAgents] = useState([]);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const bots = await fetchData("admin/get_bots");

        setUserinfo(bots);
        setDomainName(bots.onboardingDetails.domainName);

        // Flatten the agents data
        const flattenedData = bots.onboardingDetails.agents.flatMap(
          (agent) => agent.agents
        );
        setFlattenedAgents(flattenedData);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    };

    fetchBots();
  }, []);

  const handleSubmit = async () => {
    // Check if at least one API key is provided
    if (!apiKeys.openAI && !apiKeys.claude && !apiKeys.openRouter) {
      toast.warning("Please provide at least one API key.");
      return;
    }

    const dataToSend = {
      openAI: apiKeys.openAI,
      claude: apiKeys.claude,
      openRouter: apiKeys.openRouter,
    };

    try {
      const response = await fetchData(
        "Admin/updateapikey",
        "POST",
        dataToSend
      );
      if (response) {
        toast.success("API keys updated successfully!");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while updating the API keys."
      );
    }
  };

  const hasNoApiKey = !(
    userinfo.onboardingDetails?.openAPIKey?.OpenAI ||
    userinfo.onboardingDetails?.openAPIKey?.Claude ||
    userinfo.onboardingDetails?.openAPIKey?.OpenRouter
  );
  const hasNoDomainName = !domainName;

  const tabIcons = {
    Bots: <TestIcon />,
    VoiceAgents: <VoiceIcon />,
    ApiKey: (
      <Badge color="error" variant="dot" invisible={!hasNoApiKey}>
        <VpnKeyIcon />
      </Badge>
    ),
    DnsSetup: (
      <Badge color="error" variant="dot" invisible={!hasNoDomainName}>
        <DnsIcon />
      </Badge>
    ),
  };

  // Content for each tab
  const tabContent = {
    Bots: <Testbot agents={flattenedAgents} />,
    VoiceAgents: <VoiceAgents />,

    ApiKey: (
      <ApiKeyForm
        apiKeys={apiKeys}
        setApiKeys={setApiKeys}
        handleSubmit={handleSubmit}
        openAPIKey={userinfo.onboardingDetails?.openAPIKey}
      />
    ),
    DnsSetup: (
      <DnsSetupForm
        domainName={domainName}
        setDomainName={setDomainName}
        dnsRecords={userinfo.onboardingDetails?.dnsRecords}
      />
    ),
  };

  const tabClassNames = {
    Bots: "testbotstab",
    ApiKey: "apikey",
    DnsSetup: "dns",
    VoiceAgents: "voiceagents", // Add class name for the new tab
  };

  return (
    <div className="container-config">
      <div className="row-config">
        {/* Tabs */}
        {Object.keys(tabIcons).map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? "active" : ""} ${
              tabClassNames[tab]
            }`}
          >
            {tabIcons[tab]} {tab}
          </div>
        ))}
      </div>
      <div className="row-config">
        <div>{tabContent[activeTab]}</div>
      </div>
    </div>
  );
};

export default Configs;
