import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ProfileInfoForm from "./components/ProfileInfoForm";
import PasswordChangeForm from "./components/PasswordChangeForm";
import UserContext from "../../../Context/UserContext";
import { fetchData } from "../../../api/FetchData";

import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const UserProfile = ({ onClose }) => {
  const { user, reloadUser } = useContext(UserContext);
  const [open, setOpen] = useState(true);
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone ? user.phone.toString() : ""); // Convert phone number to string if it exists
  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (changingPassword) {
        if (!currentPassword) {
          toast.error("Provide new password.");
          return;
        }
        // Ensure newPassword and confirmPassword are the same
        if (newPassword !== confirmPassword) {
          toast.error("New password and confirm password do not match.");
          return;
        }

        // Call the update_user_password endpoint
        response = await fetchData(
          `User/update_user_password/${user._id}`,
          "POST",
          { currentPassword, newPassword }
        );
      } else {
        // Call the update_user endpoint for other profile updates
        response = await fetchData(`User/update_user/${user._id}`, "POST", {
          fullname,
          email,
          phone,
        });
      }

      if (response.data) {
        await reloadUser();
        toast.success(
          changingPassword
            ? "Password updated successfully."
            : "Profile updated successfully."
        );
        handleClose();
      } else {
        throw new Error(response.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Error updating profile");
    }
  };

  const handlePasswordChangeClick = () => {
    setChangingPassword(true);
  };

  const handleCancelPasswordChange = () => {
    setChangingPassword(false);
  };

  console.log(user);

  return (
    <Modal open={open}>
      <Box sx={style}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            {changingPassword ? "Change Password" : "User Profile"}
          </Typography>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </div>
        {!changingPassword ? (
          <>
            <ProfileInfoForm
              fullname={fullname}
              setFullname={setFullname}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
            />
            <Button variant="text" onClick={handlePasswordChangeClick}>
              Change Password
            </Button>
          </>
        ) : (
          <PasswordChangeForm
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onCancelPasswordChange={handleCancelPasswordChange}
          />
        )}
        <Button variant="contained" onClick={handleSubmit}>
          {changingPassword ? "Save password" : "Save profile"}
        </Button>
      </Box>
    </Modal>
  );
};

export default UserProfile;
