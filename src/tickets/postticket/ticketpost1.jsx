import React, { useState, useRef } from "react";
import "./Posticket.css";

const Posticket = () => {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setFile(event.dataTransfer.items[0].getAsFile());
      event.dataTransfer.clearData();
    }
  };

  const handleSubmit = () => {
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("File:", file ? file.name : "No file attached");
  };

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1>Submit a Support Ticket</h1>
        <p>
          Having issues or need assistance? We're here to help. Please provide
          detailed information about your concern in the fields below, and our
          support team will get back to you as soon as possible.
        </p>
        <div className="ticket-info">
          <span>
            <strong>Subject:</strong> Please provide a concise title for your
            concern.
          </span>
          <span>
            <strong>Message:</strong> Describe your issue or question in detail.
          </span>
          <span>
            <strong>File Attachment:</strong> If applicable, attach any relevant
            files or screenshots.
          </span>
        </div>
      </div>

      <div className="ticket-content">
        <div className="ticket-inputs">
          <input
            type="text"
            className="text-input"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="8"
            className="text-area"
            placeholder="Describe your issue or question in detail..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <input
            type="file"
            name=""
            id="fileInput"
            className="file-input"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="file-label"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="drag-drop-icon">📂</div>
            Drag & Drop or{" "}
            <span className="click-to-browse">Click to Browse</span>
            <p>Attach relevant files or screenshots (optional)</p>
            {file && <p className="file-success">File: {file.name}</p>}
          </label>
        </div>
        <div className="ticket-actions">
          <button className="btn-submit" onClick={handleSubmit}>
            Submit ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posticket;
