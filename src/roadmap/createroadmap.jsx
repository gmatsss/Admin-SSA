import React, { useState } from "react";
import { toast } from "react-toastify";
import "./createroadmap.css"; // Import the CSS file
import { fetchData } from "../api/FetchData";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Import for create icon
import CancelIcon from "@mui/icons-material/Cancel"; // Import for cancel icon

const Createroadmap = ({ onCancel, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to be sent
      const roadmapData = {
        title,
        description,
        startDate,
        endDate,
      };

      // Use fetchData to send a POST request
      const response = await fetchData(
        "admin/createRoadmap",
        "POST",
        roadmapData
      );

      // Handle the response
      toast.success("Roadmap created successfully");
      console.log(response); // Or handle the response as needed

      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      onSuccess(); // Call the onSuccess callback
    } catch (error) {
      console.error("Error creating roadmap:", error);
      toast.error(error.message || "Error creating roadmap");
    }
  };

  return (
    <div className="roadmaps-container">
      <h2 className="roadmap-title">Create Roadmap</h2>
      <form onSubmit={handleSubmit} className="roadmap-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="button-cont">
          <button type="submit" className="submit-button">
            <AddCircleOutlineIcon /> Create Roadmap
          </button>
          <button className="cancel-button" onClick={onCancel}>
            <CancelIcon /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createroadmap;
