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

export default function TalProfileSkill() {
  const { isAuthenticated } = useAuth0();
  const { userID } = useUser();

  //new empty model to post new education
  const [newSkillModal, setNewSkillModal] = useState(false);

  const handleOpenNewSkill = () => {
    setNewSkillModal(true);
  };

  const handleCloseNewSkill = () => {
    setNewSkillModal(false);
  };

  const handleSaveNewSkill = () => {};

  return (
    <>
      <div className="">
        <h3 className="box">
          Skill Sets
          <CustomIcon onClick={handleOpenNewSkill}>
            {" "}
            <AddIcon />
          </CustomIcon>
        </h3>

        <PopUpModal
          open={newSkillModal}
          handleClose={handleCloseNewSkill}
          handleSave={handleSaveNewSkill}
          title="Add Skill Set"
        >
          <SingleLineTextField label="Skill" />
          <SingleLineTextField label="Proficiency Level" />
        </PopUpModal>
      </div>
    </>
  );
}
