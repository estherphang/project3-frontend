import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const PopUpModal = ({ open, handleClose, title, children, handleSave }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    fontFamily: "Helvetica, Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "1rem",
  };

  const closeButtonStyle = {
    bgcolor: "rgb(138, 129, 124)", // Grey with 50% transparency
    color: "white",
    "&:hover": {
      bgcolor: "rgba(138, 129, 124, 0.8)", // Reduce transparency by 10% on hover
    },
  };

  const saveButtonStyle = {
    bgcolor: "rgb(119, 101, 227)", // Purple with 50% transparency
    color: "white",
    "&:hover": {
      bgcolor: "rgba(119, 101, 227,0.9)", // Reduce transparency by 10% on hover
    },
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>
        </Box>
        <Box sx={buttonContainerStyle}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            startIcon={<SaveIcon />}
            sx={saveButtonStyle}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            startIcon={<CloseIcon />}
            sx={closeButtonStyle}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// MultilineTextFields Component

const MultilineTextFields = (props) => {
  const { value, onChange, label, required } = props;

  const style = {
    textField: {
      width: "100%", // Set width to 100%
      marginBottom: "1rem", // Add some bottom margin for spacing
    },
    outlineStyle: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb(119, 101, 227)", // Change outline color to purple when focused
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "rgb(119, 101, 227)", // Change label color to purple when focused
      },
    },
  };

  return (
    <Box component="form" sx={style.outlineStyle} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-textarea"
          label={label}
          placeholder={label}
          multiline
          maxRows={4}
          value={value} // Use defaultValue to set initial value
          onChange={onChange} // Pass onChange handler directly
          required={required}
          sx={style.textField} // Apply custom style to TextField
        />
      </div>
    </Box>
  );
};

// SingleLineTextField  Component

const SingleLineTextField = ({ value, onChange, label, required }) => {
  const style = {
    textField: {
      width: "100%", // Set width to 100%
      marginBottom: "1rem", // Add some bottom margin for spacing
    },
    outlineStyle: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb(119, 101, 227)", // Change outline color to purple when focused
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "rgb(119, 101, 227)", // Change label color to purple when focused
      },
    },
  };

  return (
    <Box component="form" sx={style.outlineStyle} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-basic"
          label={label}
          placeholder={label}
          variant="outlined"
          value={value}
          onChange={onChange}
          required={required}
          sx={style.textField}
        />
      </div>
    </Box>
  );
};

export { PopUpModal, MultilineTextFields, SingleLineTextField };
