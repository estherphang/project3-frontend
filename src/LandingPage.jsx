import "./LandingPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import { buttonStyle } from "./styleComponents";
import styled from "styled-components";
import { useEffect } from "react";

const CustomButton = styled(Button)`
  ${buttonStyle}
`;

export default function LandingPage() {
  //authentication from Auth0
  //is user Auth?
  //users' access token
  //user email/profile image
  //redirect if not log in
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } =
    useAuth0();

  //collect info from user, show in console log
  useEffect(() => {
    //if user is authenticated, show info in console log
    if (isAuthenticated && user) {
      console.log("email - ", user.email);
      console.log("emailid - ", user.nickname);
      console.log("image - ", user.picture);
    }
  }, [isAuthenticated, user]);

  // import login button from Auth0
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
      <CustomButton type="primary" onClick={() => loginWithRedirect()}>
        {" "}
        Log In or Sign up
      </CustomButton>
    );
  };

  // user sign up. push data to backend.
  // collect email (prevent duplicate) when user sign up.
  // only push data to backend if the email is unique.

  return (
    <>
      <div className="landing-container">
        <h1 className="landing-logo">Billboard</h1>
        <div className="landing-text-container">
          <h3 className="landing-text">Where Careers and Priorities Align.</h3>
          <LoginButton />
        </div>
      </div>
    </>
  );
}
