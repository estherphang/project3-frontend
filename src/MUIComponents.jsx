import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
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
    bgcolor: "rgb(138, 129, 124)",
    color: "white",
    "&:hover": {
      bgcolor: "rgba(138, 129, 124, 0.8)", // grey
    },
  };

  const saveButtonStyle = {
    bgcolor: "rgb(119, 101, 227)", // purple
    color: "white",
    "&:hover": {
      bgcolor: "rgba(119, 101, 227,0.9)", // purple
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
      width: "100%",
      marginBottom: "1rem",
    },
    outlineStyle: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb(119, 101, 227)", // purple
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "rgb(119, 101, 227)", // purple
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
          value={value}
          onChange={onChange} // onChange on frontend
          required={required}
          sx={style.textField} // custom style to textField
        />
      </div>
    </Box>
  );
};

// SingleLineTextField  Component

const SingleLineTextField = ({ value, onChange, label, required }) => {
  const style = {
    textField: {
      width: "100%",
      marginBottom: "1rem",
    },
    outlineStyle: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb(119, 101, 227)", // purple
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "rgb(119, 101, 227)", // purple
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

const Block = ({ text }) => {
  return (
    <div style={{ width: "100%" }}>
      <Box
        component="span"
        sx={{
          display: "block",
          padding: 1,
          paddingLeft: 3,
          paddingRight: 3,
          marginBottom: 2,
          border: "2px solid",
          borderColor: "rgb(119, 101, 227)", //purple
          borderRadius: 2,
        }}
      >
        {text}
      </Box>
    </div>
  );
};

export default Block;

export { PopUpModal, MultilineTextFields, SingleLineTextField, Block };
