import React, { useState } from "react";
import "./MonthlyBots.css";
import Tooltip from "@mui/material/Tooltip";
import Select from "react-select";
import industryData from "../data-industry/industry.json";
import { toast } from "react-toastify";

const FileDropArea = ({ onFilesAdded }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const updateFilesList = (files) => {
    const newFiles = Array.from(files).slice(0, 3); // Limit to 3 files
    setSelectedFiles(newFiles.map((file) => file.name));
    onFilesAdded(newFiles);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      updateFilesList(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div>
      <div
        className={`file-drop-area ${isDragActive ? "active" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <input
          id="fileInput"
          type="file"
          className="file-input"
          onChange={(e) => updateFilesList(e.target.files)}
          multiple
          style={{ display: "none" }}
        />
        Drag and drop files here or click to select (Max 3 files, 25MB each)
      </div>
      {selectedFiles.length > 0 && (
        <div className="file-list">
          <ul>
            {selectedFiles.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const MonthlyBots = ({ onSubmit }) => {
  const [currentBotIndex, setCurrentBotIndex] = useState(0);
  const [formData, setFormData] = useState([{}]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [files, setFiles] = useState([]); // Updated state for multiple files

  const handleFilesAdded = (newFiles) => {
    const selectedFiles = Array.from(newFiles);
    const MAX_FILES = 3;
    const MAX_SIZE_MB = 25;

    // Check if adding new files exceeds the max file limit
    if (selectedFiles.length + files.length > MAX_FILES) {
      toast.error(`You can only upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    // Check file sizes
    const oversizedFiles = selectedFiles.filter(
      (file) => file.size / 1024 / 1024 > MAX_SIZE_MB
    );
    if (oversizedFiles.length > 0) {
      toast.error(`Each file must be less than ${MAX_SIZE_MB}MB.`);
      return;
    }

    // Update files state
    setFiles([...files, ...selectedFiles]);
  };

  const handleAddBot = ({ onSubmit }) => {
    const currentBot = formData[currentBotIndex];

    // Example validation: check if agentType and serviceIndustry are provided
    if (!currentBot.agentType || !currentBot.serviceIndustry) {
      toast.warning(
        "Please complete all bot details before adding a new one.",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        }
      );
      return; // Exit the function if validation fails
    }

    // Add new bot if validation passes
    const newFormData = [...formData, {}];
    setFormData(newFormData);
    setCurrentBotIndex(newFormData.length - 1);
  };

  const handleRemoveBot = () => {
    if (formData.length > 1) {
      const newFormData = formData.slice(0, -1);
      setFormData(newFormData);
      setCurrentBotIndex(newFormData.length - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setSelectedChannels(
        checked
          ? [...selectedChannels, value]
          : selectedChannels.filter((channel) => channel !== value)
      );
    } else if (name === "additionalInfo") {
      setAdditionalInfo(value);
    } else {
      const newData = [...formData];
      newData[currentBotIndex] = { ...newData[currentBotIndex], [name]: value };
      setFormData(newData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if at least one bot is configured
    if (
      formData.length === 0 ||
      formData.some((bot) => !bot.agentType || !bot.serviceIndustry)
    ) {
      toast.warning(
        "Please configure at least one bot with all required details.",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        }
      );
      return;
    }

    // Validation: Check 'Additional Information' field
    if (!additionalInfo.trim()) {
      toast.warning("Please provide additional information.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      return;
    }

    // Add validation for file upload
    if (files.length === 0) {
      toast.warning("Please upload at least one file.");
      return;
    }

    const submissionData = {
      bots: formData,
      additionalInfo,
      channels: selectedChannels,
      files,
    };

    onSubmit(formData.length, submissionData, selectedChannels);

    console.log("Submission Data:", submissionData);
    // Handle the form submission here (e.g., send data to a server)
  };

  const currentBot = formData[currentBotIndex] || {};

  // Function to handle service industry change
  const handleServiceIndustryChange = (selectedOption, botIndex) => {
    const newData = [...formData];
    newData[botIndex] = {
      ...newData[botIndex],
      serviceIndustry: selectedOption.value,
    };
    setFormData(newData);
  };

  // Prepare options for the Select component
  const industryOptions = industryData.map((categoryData) => ({
    label: categoryData.category,
    options: categoryData.industries.map((industry) => ({
      value: industry.industry_name,
      label: industry.industry_name,
    })),
  }));

  return (
    <div className="monthly-bots-container">
      <h2 className="form-title">Configure Your Monthly Bot</h2>
      <form className="bot-form" onSubmit={handleSubmit}>
        <div className="bot-details">
          <div className="bot-config-section">
            <h3 className="bot-section-title">Bot details</h3>
            <label className="input-label">
              Agent Type:
              <select
                className="input-field" // Apply the input-field class for styling
                name="agentType"
                value={currentBot.agentType || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Agent Type
                </option>
                <option value="CustomerService">Customer Service</option>
                <option value="SalesAgents">Sales</option>
              </select>
            </label>

            <div className="form__group_onboard field mb-3 position-relative">
              <label htmlFor="toneOfVoice" className="input-label">
                Tone of Voice
              </label>
              <Tooltip
                classes={{ tooltip: "custom-tooltip" }}
                title={
                  <div className="">
                    <strong>Examples of Tone of Voice:</strong>
                    <ul>
                      <li>
                        <strong>Professional and Formal:</strong> "We want the
                        chatbot to sound like a corporate representative, using
                        formal language and avoiding slang or colloquialisms."
                      </li>
                      <li>
                        <strong>Friendly and Casual:</strong> "We'd like the
                        chatbot to come across as approachable and friendly,
                        using everyday language that our customers can relate
                        to."
                      </li>
                      <li>
                        <strong>Empathetic and Supportive:</strong> "The chatbot
                        should sound understanding and caring, especially since
                        it will handle customer complaints and issues."
                      </li>
                      <li>
                        <strong>Enthusiastic and Energetic:</strong> "We want a
                        chatbot that sounds excited about our products and
                        services, using exclamation points and positive
                        adjectives."
                      </li>
                      <li>
                        <strong>Concise and Direct:</strong> "The chatbot should
                        provide straight-to-the-point answers without any
                        fluff."
                      </li>
                      <li>
                        <strong>Humorous and Playful:</strong> "We'd like our
                        chatbot to have a sense of humor, maybe even cracking
                        jokes or using puns when appropriate."
                      </li>
                      <li>
                        <strong>Educational and Informative:</strong> "The
                        chatbot should sound knowledgeable, providing detailed
                        answers and guiding users with additional information."
                      </li>
                      <li>
                        <strong>Youthful and Trendy:</strong> "We're targeting a
                        younger audience, so we want the chatbot to use current
                        slang and maybe even emojis."
                      </li>
                      <li>
                        <strong>Calm and Reassuring:</strong> "Given the nature
                        of our services, it's important that the chatbot
                        provides answers in a calm and soothing manner."
                      </li>
                      <li>
                        <strong>Neutral and Objective:</strong> "We prefer a
                        chatbot that remains neutral, avoiding any kind of
                        emotional language."
                      </li>
                    </ul>
                    <p>
                      Remember, the tone of voice for the chatbot should align
                      with the company's brand identity and the expectations of
                      its target audience.
                    </p>
                  </div>
                }
                placement="bottom"
              >
                <input
                  type="text"
                  className="input-field"
                  placeholder="Tone of Voice"
                  name="toneOfVoice"
                  value={currentBot.toneOfVoice || ""}
                  onChange={handleInputChange}
                />
              </Tooltip>
            </div>

            <label className="input-label" htmlFor="serviceIndustry">
              Service Industry:
              <Select
                id="serviceIndustry"
                className="mb-5" // Apply styling class
                options={industryOptions}
                isSearchable={true}
                placeholder="Select a Service Industry" // Add a placeholder for better user guidance
                value={
                  currentBot.serviceIndustry
                    ? industryOptions.find(
                        (option) => option.value === currentBot.serviceIndustry
                      )
                    : null // Ensures the placeholder is shown when no industry is selected
                }
                onChange={(option) =>
                  handleServiceIndustryChange(option, currentBotIndex)
                }
              />
            </label>
          </div>

          <div className="bot-control">
            <button
              type="button"
              className="bot-control-btn"
              onClick={handleRemoveBot}
            >
              -
            </button>
            <span className="bot-count">{formData.length}</span>
            <button
              type="button"
              className="bot-control-btn"
              onClick={handleAddBot}
            >
              +
            </button>
          </div>
        </div>

        <div className="additional-details">
          <label className="input-label">
            Additional Information:
            <textarea
              name="additionalInfo"
              placeholder="Enter any additional information"
              className="textarea-input"
              value={additionalInfo}
              onChange={handleInputChange}
            ></textarea>
          </label>

          <FileDropArea onFilesAdded={handleFilesAdded} />

          <div className="checkbox-group">
            <p className="checkbox-group-title">Select Channels:</p>
            <div className="checkbox-row">
              <label>
                <input
                  type="checkbox"
                  name="channel"
                  value="Twilio"
                  onChange={handleInputChange}
                />
                Twilio
              </label>
              <label>
                <input
                  type="checkbox"
                  name="channel"
                  value="Zapier"
                  onChange={handleInputChange}
                />
                Zapier
              </label>
            </div>
            <div className="checkbox-row">
              <label>
                <input
                  type="checkbox"
                  name="channel"
                  value="CustomAPI"
                  onChange={handleInputChange}
                />
                Custom API
              </label>
              <label>
                <input
                  type="checkbox"
                  name="channel"
                  value="Telegram"
                  onChange={handleInputChange}
                />
                Telegram
              </label>
            </div>
            <div className="checkbox-row">
              <label>
                <input
                  type="checkbox"
                  name="channel"
                  value="WhatsApp"
                  onChange={handleInputChange}
                />
                WhatsApp
              </label>
              <label>
                <input
                  type="checkbox"
                  name="channel"
                  value="FBMessenger"
                  onChange={handleInputChange}
                />
                FB Messenger
              </label>
            </div>
          </div>
          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MonthlyBots;
