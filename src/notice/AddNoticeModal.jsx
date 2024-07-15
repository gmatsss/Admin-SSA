import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send"; // Import the icon
import UserContext from "../Context/UserContext";
import { fetchData } from "../api/FetchData";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600, // Increased width
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2, // Space between elements
};

const AddNoticeModal = ({ open, handleClose, onSubmitSuccess }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!user || !user._id) {
      console.log("User not found");
      return;
    }

    try {
      const noticeData = {
        title,
        content,
        author: user._id, // Pass the author's ID
      };

      const response = await fetchData(
        "admin/createNotice",
        "POST",
        noticeData
      );
      toast.success(response.message);

      // Reset the state of title and content
      setTitle("");
      setContent("");

      // Call the callback function after successful submission
      onSubmitSuccess();

      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error submitting notice:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-notice-modal-title"
      aria-describedby="add-notice-modal-description"
    >
      <Box sx={style}>
        <h2 id="add-notice-modal-title">Add New Notice</h2>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          variant="outlined" // Outlined style
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          fullWidth
          margin="normal"
          multiline
          rows={6} // Increased rows
          variant="outlined" // Outlined style
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            padding: "10px 0",
            fontSize: "1rem",
            backgroundColor: "#007bff", // Custom blue color
            "&:hover": {
              backgroundColor: "#0056b3", // Darker shade for hover
            },
          }}
          endIcon={<SendIcon />} // Add the icon to the button
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddNoticeModal;
