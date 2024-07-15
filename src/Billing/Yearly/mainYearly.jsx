import React, { useEffect, useState } from "react";
import Yearlybots from "./yearlybots";
import "./mainyearly.css";
import { fetchData } from "../../api/FetchData";
import { toast } from "react-toastify";
import ChannelOne from "../moonclerkforms/Channel/ChannelOne";
import ChannelThree from "../moonclerkforms/Channel/ChannelThree";
import ChannelTwo from "../moonclerkforms/Channel/ChannelTwo";
import ChannelFour from "../moonclerkforms/Channel/ChannelFour";
import ChannelFive from "../moonclerkforms/Channel/ChannelFive";
import ChannelSix from "../moonclerkforms/Channel/ChannelSix";
import AdditionalCharge from "./AdditionalCharge";
import { useNavigate } from "react-router-dom";
import YearlyPlan from "./Yearlyplan";
import Yearly from "../moonclerkforms/Yearly/Yearly";
import YearlyDiscount1 from "../moonclerkforms/Yearly/YearlyDiscount1";
import YearlyDiscount2 from "../moonclerkforms/Yearly/YearlyDiscount2";
import YearlyDiscount3 from "../moonclerkforms/Yearly/YearlyDiscount3";

const Mainyearly = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [newVerificationCode, setNewVerificationCode] = useState("");
  const [paymentidplan, setPaymentidplan] = useState("");
  const [isVerificationMatched, setIsVerificationMatched] = useState(false);
  const [currentChannelFormId, setChannelCurrentFormId] = useState(0);
  const [botCount, setBotCount] = useState(0);
  const initialFormData = {
    bots: [],
    channels: [],
    file: null,
    additionalInfo: "",
    verificationCode: "", // Initial value for verificationCode
    newVerificationCode: "", // Initial value for newVerificationCode
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showMonthlyBots, setShowMonthlyBots] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [currentFormId, setCurrentFormId] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState([]);

  const channelCount = selectedChannels.length;

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(
      () => {
        toast.info("Verification code copied!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy the code.");
      }
    );
  };

  const handleBotSubmission = (count, data, selectedChannels) => {
    setBotCount(count);
    setFormData(data);
    setShowMonthlyBots(false);
    setVerificationCode(generateVerificationCode()); // Generate verification code
    // setVerificationCode("9BvL6KaOgwi6eieDpKGDf7htUPW9dL"); // payment plan 1 bot
    setSelectedChannels(selectedChannels); // Store the selected channels
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

  useEffect(() => {
    let formId;

    const botCountNumber = parseInt(botCount, 10); // Convert to number

    switch (botCountNumber) {
      case 1:
        formId = 474438; // Monthly
        break;
      case 2:
        formId = 475039; // MonthlyDiscount
        break;
      case 3:
        formId = 475040; // MonthlyDiscount2
        break;
      default:
        if (botCountNumber >= 4) {
          formId = 475044; // MonthlyDiscount3
        } else {
          // Handle unexpected botCount
          formId = null;
        }
        break;
    }

    setCurrentFormId(formId);
  }, [botCount]);

  const channelFormIdMapping = {
    // 475469 test for channel
    1: 475832,
    2: 475833,
    3: 475834,
    4: 475835,
    5: 475836,
    6: 475837,
  };

  useEffect(() => {
    const channelCount = selectedChannels.length;
    if (channelFormIdMapping[channelCount]) {
      setChannelCurrentFormId(channelFormIdMapping[channelCount]);
    }
  }, [selectedChannels]);

  const navigateToThankYou = async (customerID, paymentPlanID) => {
    try {
      setLoading(true);

      // Construct FormData for onboarding process
      const onboardingPayload = new FormData();
      onboardingPayload.append("additionalInfo", formData.additionalInfo);

      formData.bots.forEach((bot, index) => {
        onboardingPayload.append(`bots[${index}][agentType]`, bot.agentType);
        onboardingPayload.append(
          `bots[${index}][serviceIndustry]`,
          bot.serviceIndustry
        );
        onboardingPayload.append(
          `bots[${index}][toneOfVoice]`,
          bot.toneOfVoice
        );
      });

      formData.channels.forEach((channel, index) => {
        onboardingPayload.append(`channels[${index}]`, channel);
      });

      onboardingPayload.append("verificationCodebotplan", verificationCode);

      // Append each file to the FormData
      formData.filesyearly.forEach((file, index) => {
        onboardingPayload.append(`files[${index}]`, file, file.name);
      });

      if (newVerificationCode) {
        onboardingPayload.append("verifchannelcode", newVerificationCode);
      }

      if (customerID) {
        onboardingPayload.append("customerID", customerID);
      }

      if (paymentPlanID) {
        onboardingPayload.append("paymentPlanID", paymentPlanID);
      }

      // Send the FormData to the server
      const onboardingResponse = await fetchData(
        "bot/addbot",
        "POST",
        onboardingPayload
      );

      if (onboardingResponse.data) {
        toast.success("Payment successful");
        navigate("/Admin/thankyou");
      } else {
        toast.error("Onboarding failed");
      }
    } catch (error) {
      console.error("Error during onboarding:", error);
      toast.error("An error occurred during onboarding.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentData = async () => {
    try {
      setLoading(true);
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

      const matchingPaymentDataArray = result.payments.filter(
        (payment) => payment.form_id === currentFormId
      );

      // Find the first matching payment data record
      const successfulPaymentData = matchingPaymentDataArray.find(
        (paymentData) =>
          paymentData.custom_fields &&
          paymentData.custom_fields.verification_code &&
          paymentData.custom_fields.verification_code.response ===
            verificationCode
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        verificationCode: verificationCode, // Assuming this is the correct verification code
      }));

      if (successfulPaymentData) {
        if (selectedChannels.length === 0) {
          navigateToThankYou(successfulPaymentData.customer_id);
        } else {
          // Check if there are selected channels and generate a new verification code if necessary
          if (selectedChannels.length > 0) {
            const newVerificationCode = generateVerificationCode();
            // const newVerificationCode = "Ml1ANKqggWclMFKEPKjQ3Iym2RuUSY"; //2channel
            setNewVerificationCode(newVerificationCode);
          }
          setPaymentidplan(successfulPaymentData.customer_id);
          setLoading(false);
          toast.success("Payment Success");
          setPaymentVerified(true);
          setIsVerificationMatched(true);
        }
      } else {
        setLoading(false);
        toast.warning("Please pay your balance first.");
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  const checkFormData = async () => {
    try {
      setLoading(true);
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

      const matchingPaymentDataArray = result.payments.filter(
        (payment) => payment.form_id === currentChannelFormId
      );

      // Use find to get the first matching payment data record
      const successfulPaymentData = matchingPaymentDataArray.find(
        (paymentData) =>
          paymentData.custom_fields &&
          paymentData.custom_fields.verification_code &&
          paymentData.custom_fields.verification_code.response ===
            (newVerificationCode || formData?.verificationCode)
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        newVerificationCode: newVerificationCode, // Assuming this is the correct verification code
      }));

      if (successfulPaymentData) {
        navigateToThankYou(successfulPaymentData.customer_id, paymentidplan);
      } else {
        setLoading(false);
        toast.warning("Please pay your balance first.");
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="content-container">
      {showMonthlyBots && <Yearlybots onSubmit={handleBotSubmission} />}

      {!showMonthlyBots && (
        <div className="flex-container">
          {!isVerificationMatched || selectedChannels.length === 0 ? (
            <div className="plan-container">
              {botCount === 1 && <Yearly />}
              {botCount === 2 && <YearlyDiscount1 />}
              {botCount === 3 && <YearlyDiscount2 />}
              {botCount >= 4 && <YearlyDiscount3 />}
            </div>
          ) : null}

          {isVerificationMatched && (
            <div className="channel-container">
              {channelCount === 1 && <ChannelOne />}
              {channelCount === 2 && <ChannelTwo />}
              {channelCount === 3 && <ChannelThree />}
              {channelCount === 4 && <ChannelFour />}
              {channelCount === 5 && <ChannelFive />}
              {channelCount === 6 && <ChannelSix />}
            </div>
          )}

          <div className="monthly-plan-container">
            {/* Conditional rendering to either show Monthlyplan or AdditionalCharge */}
            {paymentVerified && selectedChannels.length > 0 ? (
              <AdditionalCharge botChannelValue={selectedChannels.length} />
            ) : (
              <YearlyPlan numberOfBots={botCount} />
            )}

            {paymentVerified && newVerificationCode ? (
              <div>
                <br />
                <div className="verification-code">
                  Your new verification code:
                  <span
                    className="code-text"
                    onClick={() => copyToClipboard(newVerificationCode)}
                  >
                    {newVerificationCode}
                  </span>
                </div>
              </div>
            ) : (
              !paymentVerified &&
              verificationCode && (
                <div>
                  <br />
                  <div className="verification-code">
                    Your verification code:
                    <span
                      className="code-text"
                      onClick={() => copyToClipboard(verificationCode)}
                    >
                      {verificationCode}
                    </span>
                  </div>
                </div>
              )
            )}

            {paymentVerified && selectedChannels.length > 0 ? (
              <button
                className="plan-action-button"
                onClick={() => checkFormData()}
              >
                Validate Channel Payment
              </button>
            ) : (
              <button
                className="plan-action-button"
                onClick={() => fetchPaymentData()}
              >
                Validate Payment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mainyearly;
