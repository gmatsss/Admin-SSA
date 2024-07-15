import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import "./EmailModal.css"; // Import the CSS file
import { fetchData } from "../../api/FetchData";

const EmailModal = ({ open, handleClose, userData }) => {
  const initialEmailContent = {
    message: "",
    email: "",
    fname: "",
  };

  // Local state for email form
  const [emailContent, setEmailContent] = useState(initialEmailContent);

  useEffect(() => {
    if (userData) {
      // Destructure the necessary properties
      const { email, fullname } = userData;
      const firstName = fullname.split(" ")[0]; // Assuming the first name is the first part of the fullname

      setEmailContent({
        ...emailContent,
        email: email,
        fname: firstName,
      });
    }
  }, [userData]);

  const handleSendNotifyEmail = async () => {
    try {
      // Adjust this call according to your email sending logic

      const response = await fetchData(
        "admin/sendEmailtoclient",
        "POST",
        emailContent
      );
      toast.success(response.message);
      handleClose();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email");
    }
  };

  const handleSendCustomEmail = async () => {
    if (!emailContent.message.trim()) {
      toast.error("Message is required.");
      return;
    }

    try {
      // Uncomment the below lines to enable email sending
      const response = await fetchData(
        "admin/sendCustomEmailtoclient",
        "POST",
        emailContent
      );
      toast.success(response.message);
      handleClose();
      setEmailContent(initialEmailContent); // Reset the state
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email");
    }
  };

  const handleChange = (e) => {
    setEmailContent({ ...emailContent, [e.target.name]: e.target.value });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Typography variant="h6" className="modal-header">
          Send Email
        </Typography>
        <textarea
          className="custom-textarea"
          placeholder="Message"
          name="message"
          value={emailContent.message}
          onChange={handleChange}
          rows={4}
        />
        <Button
          variant="contained"
          onClick={handleSendCustomEmail}
          className="send-button"
        >
          Send custom email
        </Button>
        <Button
          variant="contained"
          onClick={handleSendNotifyEmail}
          className="send-button"
        >
          Notify user bots setup complete
        </Button>
      </Box>
    </Modal>
  );
};

export default EmailModal;
