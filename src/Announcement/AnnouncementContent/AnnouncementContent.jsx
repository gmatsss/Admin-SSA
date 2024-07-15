import React, { useEffect, useState } from "react";
import "./AnnouncementContent.css"; // Ensure the CSS file is correctly linked

import CircularProgress from "@mui/material/CircularProgress"; // For loading indicator
import { fetchData } from "../../api/FetchData";

const AnnouncementContent = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const response = await fetchData("admin/getAllNotices"); // Adjust the endpoint as needed
        setNotices(response);
      } catch (error) {
        console.error("Error fetching notices:", error);
        // Handle error (e.g., show an error message)
      } finally {
        setIsLoading(false);
      }
    };

    getNotices();
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="announcement-container">
      {notices.length > 0 ? (
        notices.map((notice, index) => (
          <div key={index} className="announcement-box">
            <h3 className="announcement-title">{notice.title}</h3>
            <p className="announcement-description">{notice.content}</p>
          </div>
        ))
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
};

export default AnnouncementContent;
