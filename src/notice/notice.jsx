import React, { useEffect, useState } from "react";
import "./Notice.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddNoticeModal from "./AddNoticeModal";
import { fetchData } from "../api/FetchData";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const Notice = () => {
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNotices = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData("admin/getAllNotices");
      setNotices(response);
    } catch (error) {
      console.error("Error fetching notices:", error);
      toast.error("Failed to fetch notices.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(filter.toLowerCase()) ||
      notice.content.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (noticeId) => {
    try {
      await fetchData(`admin/deleteNotice/${noticeId}`, "DELETE");
      toast.success("Notice deleted successfully");
      getNotices(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Failed to delete notice.");
    }
  };

  const handleNoticeSubmitSuccess = () => {
    getNotices(); // Refresh the notices list
  };

  return (
    <div className="notice-container">
      <div className="notice-controls">
        <input
          type="text"
          placeholder="Search notices..."
          className="notice-filter-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className="add-notice-button" onClick={handleOpenModal}>
          Add Notice
        </button>
      </div>
      <div>
        {isLoading ? (
          <div className="loader-container">
            <CircularProgress />
          </div>
        ) : (
          filteredNotices.map((notice, index) => (
            <div key={index} className="notice-item">
              <h3 className="notice-title">{notice.title}</h3>
              <p className="notice-content">{notice.content}</p>
              <p className="notice-date">Posted on: {notice.datePosted}</p>
              <div className="notice-actions">
                <button
                  className="icon-button"
                  onClick={() => handleDelete(notice._id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <AddNoticeModal
        open={modalOpen}
        handleClose={handleCloseModal}
        onSubmitSuccess={handleNoticeSubmitSuccess} // Pass the callback function
      />
    </div>
  );
};

export default Notice;
