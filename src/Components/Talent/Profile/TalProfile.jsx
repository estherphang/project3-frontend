import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import TalProfileObj from "./TalProfileObj";
import IconButton from "@mui/material/IconButton";
import { useUser } from "../../Context/UserContext";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import {
  profileImage,
  editIcon,
  outlineButton,
  reversedOutlineButton,
} from "../../../styleComponents";
import axios from "axios";
import { BACKEND_TALENT_URL } from "../../../../constants";
import TalProfileWorkExp from "./TalProfileWorkExp";
import TalProfileSkill from "./TalProfileSkill";
import TalProfileEdu from "./TalProfileEdu";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const CustomProfileImage = styled(Avatar)`
  ${profileImage}
`;

const CustomButton = styled(Button)`
  ${reversedOutlineButton}
`;

export default function TalProfile() {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } =
    useAuth0();

  const { userFirstName, userLastName, userImage, userEmail, userID } =
    useUser();

  const nav = useNavigate();

  //need to pull userID for new users who passed by userCat path.

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

          const title = resumeData.map((item) => item.title);

          // Check if title array is empty
          if (title.length === 0) {
            setTitleField("ADD TITLE");
          } else {
            setTitleField(title);
          }
          console.log("title?", title);
        } catch (error) {
          console.error("Error fetching objectives:", error);
        }
      };

      fetchResume();
    }
  }, [isAuthenticated, user, userID]);

  console.log("profile", userImage);

  const handleProfileSetting = () => {
    nav("/talent/profile/setting");
  };

  return (
    <>
      <div className="container">
        <div className="profilebox">
          <CustomProfileImage alt="profile" src={`${userImage}`} />
          <div>
            <p className="profileboxtext">
              {userFirstName} {userLastName}
            </p>
            <p className="profileboxtext">{titleField}</p>
          </div>
        </div>
        <CustomButton
          className="profileboxbutton"
          onClick={handleProfileSetting}
        >
          Edit Profile
        </CustomButton>
        <div className="contentbox"></div>
        <TalProfileObj />
        <TalProfileWorkExp />
        <TalProfileSkill />
        <TalProfileEdu />
      </div>
    </>
  );
}
