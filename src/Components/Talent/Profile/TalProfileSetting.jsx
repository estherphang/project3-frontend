import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import styled from "styled-components";
import {
  buttonStyle,
  profileImage,
  reversedOutlineButton,
} from "../../../styleComponents";
import { useUser } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_TALENT_URL } from "../../../../constants";
import { Avatar } from "@mui/material";

const CustomButton = styled(Button)`
  ${reversedOutlineButton}
`;

const CustomProfileImage = styled(Avatar)`
  ${profileImage}
`;

export default function TalProfileSetting() {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } =
    useAuth0();

  const { userFirstName, userLastName, userImage, userEmail, userID } =
    useUser();

  const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
      localStorage.clear();
      logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return <CustomButton onClick={handleLogout}>Log Out</CustomButton>;
  };

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

  return (
    <>
      <div className="container">
        <CustomProfileImage alt="profile" src={`${userImage}`} />
        <p>
          {userFirstName} {userLastName}
        </p>
        <p>{titleField}</p>
        <LogoutButton />
        <h3 className="box">Career Priorities</h3>
        <h3 className="box">Preferences</h3>
      </div>
    </>
  );
}
