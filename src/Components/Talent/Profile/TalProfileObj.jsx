import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../Context/UserContext";
import { PopUpModal, MultilineTextFields } from "../../../MUIComponents";
import { BACKEND_TALENT_URL } from "../../../../constants";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import { editIcon } from "../../../styleComponents";

const CustomIcon = styled(IconButton)`
  ${editIcon}
`;

const TalProfileObj = () => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const { userID } = useUser();
  const [objectiveField, setObjectiveField] = useState(
    "ADD DETAILS INTO THE FIELDS"
  );
  const [objectiveModal, setObjectiveModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchResume = async () => {
        try {
          const resumeResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/resume`
          );
          const resumeData = resumeResponse.data;
          console.log("data", resumeData);

          const objective = resumeData.map((item) => item.objective);

          // Check if objective array is empty
          if (objective.length === 0) {
            setObjectiveField("ADD DETAILS INTO THE FIELDS");
          } else {
            setObjectiveField(objective);
          }

          console.log("objective?", objective);
        } catch (error) {
          console.error("Error fetching objectives:", error);
        }
      };

      fetchResume();
    }
  }, [isAuthenticated, userID]);

  const handleOpenObjectiveModal = () => {
    setObjectiveModal(true);
  };

  const handleCloseObjectiveModal = () => {
    setObjectiveModal(false);
  };

  const handleSaveObjective = async () => {
    try {
      // Check if resume data exists for the user
      const resumeResponse = await axios.get(
        `${BACKEND_TALENT_URL}/${userID}/resume`
      );

      if (resumeResponse.data.userID === null) {
        // userID not found, create new resume data
        await axios.post(`${BACKEND_TALENT_URL}/${userID}/resume`, {
          userID: userID,
          objective: objectiveField,
        });
      } else {
        // If resume data exists, update the objective
        await axios.put(`${BACKEND_TALENT_URL}/${userID}/resume`, {
          objective: objectiveField,
        });
      }

      // Log success message
      console.log("Objective saved successfully!");
    } catch (error) {
      // Log error if any
      console.error("Error saving objective:", error);
    }

    // Close the modal
    setObjectiveModal(false);
  };

  return (
    <>
      <div className="">
        <h3 className="box">
          Objectives{" "}
          <CustomIcon onClick={handleOpenObjectiveModal}>
            {" "}
            <EditIcon />
          </CustomIcon>
          <PopUpModal
            open={objectiveModal}
            handleClose={handleCloseObjectiveModal}
            handleSave={handleSaveObjective}
            title="Objective"
          >
            <MultilineTextFields
              label="Objective"
              value={objectiveField}
              onChange={(e) => setObjectiveField(e.target.value)}
            />
          </PopUpModal>
        </h3>
        <p className="contentbox">{objectiveField}</p>
      </div>
    </>
  );
};

export default TalProfileObj;
