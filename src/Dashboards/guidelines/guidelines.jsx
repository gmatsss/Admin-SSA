import React from "react";
import "./Guidelines.css";

const Guidelines = ({ onboardingDetails }) => {
  const { guidelines } = onboardingDetails || {};

  // Function to transform file IDs to download links
  const transformFilesToLinks = (files) => {
    if (!Array.isArray(files)) {
      return null;
    }
    return files.map((file, index) => (
      <a
        key={index}
        href={`${process.env.REACT_APP_API_ENDPOINT}admin/downloadFile/${file}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {file}
      </a>
    ));
  };

  // Check if guidelines are empty or not
  if (!guidelines || guidelines.length === 0) {
    return <div>No Guidelines available.</div>;
  }

  // Transform the guidelines array
  const transformedGuidelines = guidelines.map((guideline) => ({
    ...guideline,
    filesLinks: transformFilesToLinks(guideline.uploadedFiles),
  }));

  return (
    <div className="guidelines-container">
      {transformedGuidelines.map((item, index) => (
        <div key={index} className="guideline-section">
          <div className="additional-guidelines">
            <h2>Additional Information</h2>
            <p>{item.additionalGuidelines}</p>
          </div>

          <div className="files-section">
            <h2>Uploaded Files</h2>
            <ul className="files-list">
              {item.filesLinks &&
                item.filesLinks.map((link, linkIndex) => (
                  <li key={linkIndex}>{link}</li>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Guidelines;
