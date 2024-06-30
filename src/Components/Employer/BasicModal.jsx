import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";
const CustomButton = styled(Button)`
  ${buttonStyle}
`;

import { MultilineTextFields, SingleLineTextField } from "../../MUIComponents";

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

export default function BasicModal({
  modaltitle,
  modaldescription,
  open,
  setOpen,
  passedInState,
  setPassedInState,
  propertyname,
  multiline,
}) {
  React.useEffect(() => {}, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handlePassedInState = (e) => {
    setPassedInState(e.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{ ...style, width: "50vw", fontFamily: "'Arial', sans-serif" }}
        >
          <h2 id="parent-modal-title">{modaltitle}</h2>
          <p id="parent-modal-description">{modaldescription}</p>

          {multiline ? (
            <MultilineTextFields onChange={handlePassedInState} />
          ) : (
            <SingleLineTextField onChange={handlePassedInState} />
          )}

          <CustomButton onClick={handleClose}>Close</CustomButton>
        </Box>
      </Modal>
    </div>
  );
}
