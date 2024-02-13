import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../Context/UserContext";
import {
  PopUpModal,
  MultilineTextFields,
  SingleLineTextField,
} from "../../../MUIComponents";
import { BACKEND_TALENT_URL } from "../../../../constants";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { editIcon } from "../../../styleComponents";

const CustomIcon = styled(IconButton)`
  ${editIcon}
`;

export default function TalProfileEdu() {
  const { isAuthenticated } = useAuth0();
  const { userID } = useUser();

  //new empty model to post new education
  const [newEduModal, setNewEduModal] = useState(false);

  const handleOpenNewEduModal = () => {
    setNewEduModal(true);
  };

  const handleCloseNewEduModal = () => {
    setNewEduModal(false);
  };

  const handleSaveNewEdu = () => {};

  return (
    <>
      <div className="">
        <h3 className="box">
          Education
          <CustomIcon onClick={handleOpenNewEduModal}>
            {" "}
            <AddIcon />
          </CustomIcon>
        </h3>

        <PopUpModal
          open={newEduModal}
          handleClose={handleCloseNewEduModal}
          handleSave={handleSaveNewEdu}
          title="Add Education"
        >
          <SingleLineTextField required={true} label="Institution" />
          <SingleLineTextField required={true} label="Degree" />
          <SingleLineTextField required={true} label="Major" />
          <SingleLineTextField label="Graduation Month" />
          <SingleLineTextField label="Graduation Year" />
        </PopUpModal>
      </div>
    </>
  );
}
