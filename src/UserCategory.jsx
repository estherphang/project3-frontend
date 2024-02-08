import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import { outlineButton } from "./styleComponents";
import styled from "styled-components";
import { BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)`
  ${outlineButton}
`;

export default function UserCategory() {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } =
    useAuth0();

  const EMPLOYER = "employer";
  const TALENT = "talent";

  const nav = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      setEmail(user.email);
      //if given name and family does not exist, use email id
      setFirstName(user.given_name || user.nickname);
      setLastName(user.family_name || user.nickname);
      setPhotoURL(user.picture);
    }
  }, [isAuthenticated, user]);

  const handleSelection = async (role) => {
    //is user is not sign in
    if (!isAuthenticated) {
      loginWithRedirect();
    }

    console.log("got role?", role);

    const accessToken = await getAccessTokenSilently({
      audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
      scope: "read:current_user",
    });

    console.log("Access token:", accessToken);

    // post to backend
    axios
      .post(
        `${BACKEND_URL}/${role}`, // Use the 'role' parameter directly
        {
          firstName,
          lastName,
          photo: photoURL,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        // Clear form state
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhotoURL("");

        // Navigate to profile page
        nav(`/${role}/profile`);
      });
  };

  //<-----console log ------>

  useEffect(() => {
    console.log("selected path", selectedRole);
    console.log("url", `${BACKEND_URL}/${selectedRole}`);
    console.log("really got email?", email);
    console.log("really got first name?", firstName);
  }, [selectedRole]);

  return (
    <>
      <div className="cat-container">
        <h1 className="cat-title"> Are you an employer or talent?</h1>

        <CustomButton onClick={() => handleSelection(EMPLOYER)}>
          <h4>I am an employer. </h4>
          <img
            src="employer.png"
            style={{
              width: "65%",
              height: "auto",
            }}
          />
        </CustomButton>

        <br />
        <br />
        <CustomButton onClick={() => handleSelection(TALENT)}>
          <h4>I am a talent. </h4>
          <img
            src="talent.png"
            style={{
              width: "65%",
              height: "auto",
            }}
          />
        </CustomButton>
        <p className="cat-tnc">
          Your selection is final and cannot be altered after this stage. Thank
          you.
        </p>
      </div>
    </>
  );
}

//handleSelection - save as a role
//go to backendUrl (talent/employer), post data to backend.
// get access code
//useNav, push data to employer/profile or talent/profile
