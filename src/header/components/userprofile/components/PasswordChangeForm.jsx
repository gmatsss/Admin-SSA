import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";

const PasswordChangeForm = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onCancelPasswordChange,
}) => {
  return (
    <>
      <TextField
        label="Current Password"
        fullWidth
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="New Password"
        fullWidth
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm New Password"
        fullWidth
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="text" onClick={onCancelPasswordChange}>
        Cancel Password Change
      </Button>
    </>
  );
};

export default PasswordChangeForm;
