import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "../Context/UserContext";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { profileImage, editIcon } from "../../styleComponents";
import axios from "axios";
import { BACKEND_TALENT_URL } from "../../../constants";

const CustomProfileImage = styled(Avatar)`
  ${profileImage}
`;

const CustomIcon = styled(IconButton)`
  ${editIcon}
`;

export default function TalProfile() {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } =
    useAuth0();

  const { userFirstName, userLastName, userImage, userEmai, userID } =
    useUser();

  const [objectiveField, setObjectiveField] = useState("ADD DETAILS");
  const [titleField, setTitleField] = useState("ADD TITLE");

  //axios pull resume data
  //if field is empty, show "Add Details"

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchResume = async () => {
        try {
          const resumeResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/resume`
          );
          const resumeData = resumeResponse.data;
          console.log("data", resumeData);

          const objective = resumeData.map((item) => item.objective);
          const title = resumeData.map((item) => item.title);

          // Check if objective array is empty
          if (objective.length === 0) {
            setObjectiveField("ADD DETAILS");
          } else {
            setObjectiveField(objective);
          }

          // Check if title array is empty
          if (title.length === 0) {
            setTitleField("ADD TITLE");
          } else {
            setTitleField(title);
          }

          console.log("objective?", objective);
          console.log("title?", title);
        } catch (error) {
          console.error("Error fetching objectives:", error);
        }
      };

      fetchResume();
    }
  }, [isAuthenticated, user, userID]);

  console.log("profile", userImage);
  return (
    <>
      <div className="container">
        <CustomProfileImage alt="profile" src={`${userImage}`} />

        <p>
          {userFirstName} {userLastName} {userID}
        </p>
        <p>{titleField}</p>
        <h3 className="box">
          Objectives{" "}
          <CustomIcon>
            {" "}
            <EditIcon />
          </CustomIcon>
        </h3>
        <p>
          <input
            type="text"
            value={objectiveField}
            onChange={(e) => setObjectiveField(e.target.value)}
          />
        </p>

        <h3 className="box">
          Work Experience{" "}
          <CustomIcon>
            {" "}
            <EditIcon />
          </CustomIcon>
        </h3>

        <h3 className="box">
          Skill Sets{" "}
          <CustomIcon>
            {" "}
            <EditIcon />
          </CustomIcon>
        </h3>
        <h3 className="box">
          Education{" "}
          <CustomIcon>
            {" "}
            <EditIcon />
          </CustomIcon>
        </h3>
      </div>
    </>
  );
}
