import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { fetchData } from "../../../api/FetchData";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Modalbot = ({ bot, onClose, userid, onRefresh }) => {
  const [botDetails, setBotDetails] = useState(bot);

  const handleChange = (e) => {
    setBotDetails({ ...botDetails, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // setIsSaving(true);

    // Construct the body of your request
    const updatedBotData = {
      userId: userid, // Assuming the bot object has a userId field
      agentId: botDetails._id,
      agentDetails: {
        agentType: botDetails.agentType,
        serviceIndustry: botDetails.serviceIndustry,
        toneOfVoice: botDetails.toneOfVoice,
        botStatus: botDetails.botStatus,
        SSAApi: botDetails.SSAApi,
      },
    };

    try {
      //   // Use the fetchData function to make the POST request
      const response = await fetchData(
        "Admin/updateAgentDetails",
        "POST",
        updatedBotData
      );

      toast.success("Bot Updated");
      await onRefresh(); // Refresh the clients data
      onClose();
    } catch (error) {
      // Handle any errors here
      console.error("There was an error updating the agent details:", error);
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Bot Details
        </Typography>

        {/* Service Industry */}
        <TextField
          disabled
          label="Service Industry"
          type="text"
          name="serviceIndustry"
          value={botDetails.serviceIndustry}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Tone of Voice */}
        <TextField
          disabled
          label="Tone of Voice"
          type="text"
          name="toneOfVoice"
          value={botDetails.toneOfVoice}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Access */}
        <TextField
          disabled
          label="Access"
          type="text"
          name="lifetimeAccess"
          value={botDetails.lifetimeAccess}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* SSA API */}
        <TextField
          label="SSA API"
          type="text"
          name="SSAApi"
          value={botDetails.SSAApi || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Bot Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="bot-status-label">Bot Status</InputLabel>
          <Select
            labelId="bot-status-label"
            id="botStatus"
            name="botStatus"
            value={botDetails.botStatus || ""}
            label="Bot Status"
            onChange={handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="canceled">canceled</MenuItem>
          </Select>
        </FormControl>

        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ ml: 2 }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Modalbot;
