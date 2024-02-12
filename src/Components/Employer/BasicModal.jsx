import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";
const CustomButton = styled(Button)`
  ${buttonStyle}
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75vw",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function BasicModal({
  modaltitle,
  modaldescription,
  open,
  setOpen,
  passedInState,
  setPassedInState,
  propertyname,
}) {
  React.useEffect(() => {}, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handlePassedInState = (e) => {
    setPassedInState((prevState) => ({
      ...prevState,
      [propertyname]: e.target.value,
    }));
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

          <form>
            <input
              type="text"
              value={passedInState[propertyname]}
              onChange={handlePassedInState}
            ></input>
          </form>

          <CustomButton onClick={handleClose}>Close</CustomButton>
        </Box>
      </Modal>
    </div>
  );
}
// onClick={handleClose}
