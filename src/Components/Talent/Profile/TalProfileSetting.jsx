import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import styled from "styled-components";
import {
  buttonStyle,
  colourButton,
  profileImage,
  reversedOutlineButton,
} from "../../../styleComponents";
import { useUser } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_TALENT_URL } from "../../../../constants";
import { Avatar } from "@mui/material";
import BenefitSelection from "../../Benefits/BenefitSelection";

const CustomButton = styled(Button)`
  ${reversedOutlineButton}
`;

const CustomButton2 = styled(Button)`
  ${colourButton}
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
  const [selectedBenefit1, setSelectedBenefit1] = useState([]);
  const [selectedBenefit2, setSelectedBenefit2] = useState([]);
  const [selectedBenefit3, setSelectedBenefit3] = useState([]);

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

  const handleBenefitChange1 = (value) => {
    setSelectedBenefit1(value);
  };

  const handleBenefitChange2 = (value) => {
    setSelectedBenefit2(value);
  };

  const handleBenefitChange3 = (value) => {
    setSelectedBenefit3(value);
  };

  //must submit all 3 in order to work.
  //can add and edit.

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedBenefit1);
    console.log(selectedBenefit2);
    console.log(selectedBenefit3);
    // Send request to backend with selected benefits
    try {
      const submitBenefit = await axios.post(
        `${BACKEND_TALENT_URL}/${userID}/benefits`,
        {
          talentId: userID,
          selectedBenefitIds: [
            selectedBenefit1,
            selectedBenefit2,
            selectedBenefit3,
          ],
        }
      );
      console.log("Response from backend:", submitBenefit.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //fetch priorities is not completed

  useEffect(() => {
    const fetchCareerPriorities = async () => {
      try {
        if (isAuthenticated && user) {
          const benefitResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/benefits`
          );
          const benefitData = benefitResponse.data;
          console.log("benefit data:", benefitData);

          // Set the career priorities from the backend
          // if (resumeData.careerPriorities) {
          //   setSelectedBenefit1(resumeData.careerPriorities.firstChoice);
          //   setSelectedBenefit2(resumeData.careerPriorities.secondChoice);
          //   setSelectedBenefit3(resumeData.careerPriorities.thirdChoice);
          // }

          // Set the title field
          // const title = benefitData.map((item) => item.title);
          // if (title.length === 0) {
          //   setTitleField("ADD TITLE");
          // } else {
          //   setTitleField(title);
          // }
        }
      } catch (error) {
        console.error("Error fetching career priorities:", error);
      }
    };

    fetchCareerPriorities();
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
        <br />
        <BenefitSelection
          labelName={"First Choice:"}
          onChange={handleBenefitChange1}
        />
        <br />
        <BenefitSelection
          labelName={"Second Choice:"}
          onChange={handleBenefitChange2}
        />
        <br />
        <BenefitSelection
          labelName={"Third Choice:"}
          onChange={handleBenefitChange3}
        />
        <br />
        <h3 className="box">Preferences</h3>
        <br />
        <CustomButton2 onClick={handleSubmit}>Save Profile</CustomButton2>
      </div>
    </>
  );
}
