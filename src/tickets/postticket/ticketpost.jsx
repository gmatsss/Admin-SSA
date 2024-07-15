import React from "react";
import "./Posticket.css"; // Assuming you have a CSS file named Posticket.css

const Posticket = () => {
  return (
    <div className="posticket-container">
      <div className="info-container">
        <h2>SSA Ticketing System</h2>
        <div className="instruction">
          <h3>1. Submitting a Ticket:</h3>
          <p>
            Click on the "Submit Ticket" button to raise any issues or queries
            you might have then make sure fill the required field. Our team will
            get back to you promptly.
          </p>
        </div>
        <div className="instruction">
          <h3>2. Searching for Answers:</h3>
          <p>
            Use the search bar below to find answers to frequently asked
            questions. It's a quick way to get information without waiting.
          </p>
        </div>
      </div>

      <iframe
        src="https://supersmartagents.tawk.help/"
        width="100%"
        height="530"
        frameBorder="0"
        scrolling="no"
        title="Tawk Help"
      ></iframe>
    </div>
  );
};

export default Posticket;
