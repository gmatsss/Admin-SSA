import React, { useEffect, useState } from "react";
import Userlist from "./Userlist/Userlist";
import "./Board.css"; // Import the CSS file for styling
import Botdetails from "./botdetails/Botdetails";
import Guidelines from "./guidelines/guidelines";
import Channel from "./channel/channel";
import Apikey from "./apikeys/apikey";
import Dnssetup from "./dns/dns";
import { fetchData } from "../api/FetchData";

const Board = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedOnboardingDetails, setSelectedOnboardingDetails] =
    useState(null);
  const [clientsData, setClientsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getClients = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData("admin/get_clients", "GET");
      setClientsData(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const refreshClientsData = async () => {
    await getClients();

    if (selectedUserId) {
      const refreshedUser = clientsData.find(
        (user) => user._id === selectedUserId
      );
      if (refreshedUser) {
        console.log(refreshedUser);
        handleUserSelection(refreshedUser.onboardingDetails, refreshedUser._id);
      }
    }
  };

  // Function to handle user selection
  const handleUserSelection = (onboardingDetails, userId) => {
    setSelectedOnboardingDetails(onboardingDetails);
    setSelectedUserId(userId); // Store the selected user's ID
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return (
          <div>
            <Botdetails
              onboardingDetails={selectedOnboardingDetails}
              refreshClients={refreshClientsData}
            />
          </div>
        );
      case "tab2":
        return (
          <div>
            <Guidelines onboardingDetails={selectedOnboardingDetails} />
          </div>
        );
      case "tab3":
        return (
          <div>
            <Channel onboardingDetails={selectedOnboardingDetails} />
          </div>
        );
      case "tab4":
        return (
          <div>
            <Apikey onboardingDetails={selectedOnboardingDetails} />
          </div>
        );
      case "tab5":
        return (
          <div>
            <Dnssetup
              onboardingDetails={selectedOnboardingDetails}
              refreshClients={refreshClientsData}
            />
          </div>
        );
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-5">
          <Userlist
            onUserSelect={handleUserSelection}
            clientsData={clientsData}
          />
        </div>
        <div className="col-7">
          <div className="tabs">
            <button
              className={`boardtab ${activeTab === "tab1" ? "active" : ""}`}
              onClick={() => setActiveTab("tab1")}
            >
              Bot Details
            </button>
            <button
              className={`boardtab ${activeTab === "tab2" ? "active" : ""}`}
              onClick={() => setActiveTab("tab2")}
            >
              Additional Details
            </button>
            <button
              className={`boardtab ${activeTab === "tab3" ? "active" : ""}`}
              onClick={() => setActiveTab("tab3")}
            >
              Channel
            </button>
            <button
              className={`boardtab ${activeTab === "tab4" ? "active" : ""}`}
              onClick={() => setActiveTab("tab4")}
            >
              Api Keys
            </button>
            <button
              className={`boardtab ${activeTab === "tab5" ? "active" : ""}`}
              onClick={() => setActiveTab("tab5")}
            >
              Dns Setup
            </button>
          </div>
          <div className="tab-content">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Board;
