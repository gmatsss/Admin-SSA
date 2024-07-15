import React, { useContext, useEffect, useState } from "react";
import "./Lifetime.css";

import Modal from "@mui/material/Modal";
import UserContext from "../../Context/UserContext";
import { fetchData } from "../../api/FetchData";
import BotDetailsModal from "./components/BotDetailsModal";
import CheckoutCard from "./components/CheckoutCard";
import LifetimeDetails from "./components/LifetimeDetails";
import Yearlybot1 from "./forms/Yearly/Yearlybot1";
import Yearlybot2 from "./forms/Yearly/Yearlybot2";
import Yearlybot3 from "./forms/Yearly/Yearlybot3";
import Yearlybot4 from "./forms/Yearly/Yearlybot4";
import Monthlybot1 from "./forms/Monthly/Monthlybot1";
import Monthlybot2 from "./forms/Monthly/Monthlybot2";
import Monthlybot3 from "./forms/Monthly/Monthlybot3";
import Monthlybot4 from "./forms/Monthly/Monthlybot4";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Lifetime = () => {
  const navigate = useNavigate();
  const [selectedBots, setSelectedBots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBotDetails, setSelectedBotDetails] = useState(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [botSubscriptions, setBotSubscriptions] = useState({});
  const [isValidationLoading, setIsValidationLoading] = useState(false);
  const [currentFormId, setCurrentFormId] = useState(null);

  // Use UserContext
  const { botsWithLifetimeAccess, reloadUser } = useContext(UserContext);

  const handleProceedToCheckout = () => {
    if (selectedBots.length === 0) {
      toast.warning("Please select at least one bot to proceed.");
      return;
    }
    const newVerificationCode = generateVerificationCode();

    // setVerificationCode("kg3jPhqDo387tdTey5TjMl9LHYiKnE");

    setVerificationCode(newVerificationCode);
    setShowCheckoutForm(true);
  };

  const generateVerificationCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 30; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleViewDetails = (bot) => {
    setSelectedBotDetails(bot);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchBillingPlansAndDetails = async () => {
      if (botsWithLifetimeAccess && botsWithLifetimeAccess.length > 0) {
        try {
          // Fetch billing plans
          const response = await fetchData("Admin/getuserpaymentplans");
          const billingPlans = response.paymentPlanIds || [];

          // Fetch plan details for each billing plan
          for (const id of billingPlans) {
            const headers = {
              Authorization: "Token 08bf9295738475d4afc3362ba53678df",
              Accept: "application/vnd.moonclerk+json;version=1",
            };
            const planDetails = await fetchData(
              `moonclerk/api/customers/${id}`,
              "GET",
              null,
              headers
            );

            // Process plan details
            botsWithLifetimeAccess.forEach((bot) => {
              if (
                bot.verificationCodebotplan ===
                planDetails.customer.custom_fields.verification_code.response
              ) {
                const periodStart = new Date(
                  planDetails.customer.subscription.current_period_start
                );
                const periodEnd = new Date(
                  planDetails.customer.subscription.current_period_end
                );
                const diffTime = Math.abs(periodEnd - periodStart);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                let subscriptionType = "Unknown";
                if (diffDays >= 330 && diffDays <= 400) {
                  subscriptionType = "Yearly";
                } else if (diffDays >= 25 && diffDays <= 35) {
                  subscriptionType = "Monthly";
                }

                setBotSubscriptions((prev) => ({
                  ...prev,
                  [bot._id]: subscriptionType,
                }));
              }
            });
          }
        } catch (error) {
          console.error("Error fetching billing plans and details:", error);
        }
      }
    };

    fetchBillingPlansAndDetails();
  }, [botsWithLifetimeAccess]);

  const handleSelectionChange = (agentId) => {
    setSelectedBots((prevSelectedBots) =>
      prevSelectedBots.includes(agentId)
        ? prevSelectedBots.filter((id) => id !== agentId)
        : [...prevSelectedBots, agentId]
    );
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    selectedBots.forEach((agentId) => {
      const bot = botsWithLifetimeAccess.find((bot) => bot.agentId === agentId);
      const subscriptionType = botSubscriptions[bot._id];
      if (subscriptionType === "Yearly") {
        totalCost += 1440; // Yearly cost per bot
      } else if (subscriptionType === "Monthly") {
        totalCost += 1995; // Monthly cost per bot
      }
    });
    return totalCost;
  };

  const calculateCostPerBot = (subscriptionType) => {
    if (subscriptionType === "Yearly") {
      return 1440; // Yearly cost per bot
    } else if (subscriptionType === "Monthly") {
      return 1995; // Monthly cost per bot
    }
    return 0; // Default cost if subscription type is unknown
  };

  const getSubscriptionTypes = () => {
    const types = new Set();
    selectedBots.forEach((agentId) => {
      const bot = botsWithLifetimeAccess.find((bot) => bot.agentId === agentId);
      const subscriptionType = botSubscriptions[bot._id];
      types.add(subscriptionType);
    });
    return Array.from(types);
  };

  useEffect(() => {
    const updateCurrentFormId = () => {
      const yearlyBots = selectedBots.filter(
        (botId) =>
          botSubscriptions[
            botsWithLifetimeAccess.find((bot) => bot.agentId === botId)._id
          ] === "Yearly"
      );
      const monthlyBots = selectedBots.filter(
        (botId) =>
          botSubscriptions[
            botsWithLifetimeAccess.find((bot) => bot.agentId === botId)._id
          ] === "Monthly"
      );

      if (yearlyBots.length > 0) {
        switch (yearlyBots.length) {
          case 1:
            setCurrentFormId("480112");
            break;
          case 2:
            setCurrentFormId("480114");
            break;
          case 3:
            setCurrentFormId("480115");
            break;
          case 4:
            setCurrentFormId("480116");
            break;
          default:
            setCurrentFormId(null);
        }
      } else if (monthlyBots.length > 0) {
        switch (monthlyBots.length) {
          case 1:
            setCurrentFormId("480117");
            break;
          case 2:
            setCurrentFormId("480118");
            break;
          case 3:
            setCurrentFormId("480119");
            break;
          case 4:
            setCurrentFormId("480120");
            break;
          default:
            setCurrentFormId(null);
        }
      } else {
        setCurrentFormId(null);
      }
    };

    updateCurrentFormId();
  }, [selectedBots, botSubscriptions, botsWithLifetimeAccess]);

  const getFormComponent = () => {
    const yearlyBots = selectedBots.filter(
      (botId) =>
        botSubscriptions[
          botsWithLifetimeAccess.find((bot) => bot.agentId === botId)._id
        ] === "Yearly"
    );
    const monthlyBots = selectedBots.filter(
      (botId) =>
        botSubscriptions[
          botsWithLifetimeAccess.find((bot) => bot.agentId === botId)._id
        ] === "Monthly"
    );

    // Display form based on the count of selected bots
    if (yearlyBots.length > 0) {
      switch (yearlyBots.length) {
        case 1:
          return <Yearlybot1 />;
        case 2:
          return <Yearlybot2 />;
        case 3:
          return <Yearlybot3 />;
        case 4:
          return <Yearlybot4 />;
        default:
          return null;
      }
    } else if (monthlyBots.length > 0) {
      switch (monthlyBots.length) {
        case 1:
          return <Monthlybot1 />;
        case 2:
          return <Monthlybot2 />;
        case 3:
          return <Monthlybot3 />;
        case 4:
          return <Monthlybot4 />;
        default:
          return null;
      }
    }
    return null;
  };

  const handleValidatePayment = async () => {
    console.log("Selected Bots for Validation:", selectedBots);
    setIsValidationLoading(true);

    try {
      // Fetch payment data
      const headers = {
        Authorization: "Token 08bf9295738475d4afc3362ba53678df",
        Accept: "application/vnd.moonclerk+json;version=1",
      };

      const result = await fetchData(
        "moonclerk/api/payments",
        "GET",
        null,
        headers
      );

      // Check if payments array exists in the result
      if (!result || !Array.isArray(result.payments)) {
        console.error("No payments array in the result:", result);
        toast.error("Failed to fetch payment data.");
        setIsValidationLoading(false);
        return;
      }

      const matchingPaymentDataArray = result.payments.filter(
        (payment) =>
          String(payment.form_id).trim() === String(currentFormId).trim()
      );

      const successfulPaymentData = matchingPaymentDataArray.find(
        (paymentData) =>
          paymentData.custom_fields &&
          paymentData.custom_fields.verification_code &&
          paymentData.custom_fields.verification_code.response ===
            verificationCode
      );

      if (!successfulPaymentData) {
        toast.warning("Please pay your balance first.");
        setIsValidationLoading(false);
        return;
      }

      // Construct the payload for updating lifetime access
      const payload = {
        agentSubscriptions: selectedBots.map((agentId) => {
          const bot = botsWithLifetimeAccess.find(
            (bot) => bot.agentId === agentId
          );
          return {
            agentId,
            subscriptionType: botSubscriptions[bot._id],
          };
        }),
      };

      const response = await fetchData(
        "bot/updateLifetimeAccess",
        "POST",
        payload
      );

      if (response && response.success) {
        await reloadUser();
        navigate("/Admin/configs");
        toast.success("Payment Success!");
      } else {
        toast.error("Failed to update lifetime access.");
      }
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Validation failed!");
    } finally {
      setIsValidationLoading(false);
    }
  };

  console.log(currentFormId);

  return (
    <div className="lifetime-container">
      <LifetimeDetails
        calculateCostPerBot={calculateCostPerBot}
        calculateTotalCost={calculateTotalCost}
        subscriptionTypes={getSubscriptionTypes()}
        verificationCode={verificationCode}
        onValidatePayment={handleValidatePayment}
        isLoading={isValidationLoading}
      />

      {!showCheckoutForm && (
        <CheckoutCard
          botsWithLifetimeAccess={botsWithLifetimeAccess}
          selectedBots={selectedBots}
          handleSelectionChange={handleSelectionChange}
          handleViewDetails={handleViewDetails}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}
      <BotDetailsModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        selectedBotDetails={selectedBotDetails}
      />

      {showCheckoutForm && getFormComponent()}
    </div>
  );
};

export default Lifetime;
