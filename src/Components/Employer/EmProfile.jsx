import { useEmployer } from "../Context/EmployerContext";
import { useAuth0 } from "@auth0/auth0-react";

//Custom Button
import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";
const CustomButton = styled(Button)`
  ${buttonStyle}
`;

export default function EmProfile() {
  const { EmFormData, setEmFormData, imgurl, setImageUrl } = useEmployer();

  const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
      localStorage.clear();
      logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return <CustomButton onClick={handleLogout}>Log Out</CustomButton>;
  };

  const handleSubmit = () => {
    console.log("handleSubmit was called woo");
  };

  return (
    <>
      <div className="container">
        <div className="company-img-div">
          <h1>{EmFormData.companyName}'s Profile</h1>
          <img className="fixedSizeImage" src={imgurl} />
        </div>

        <>
          <div className="container">
            <h3 style={{ wordWrap: "break-word" }} className="contentbox">
              {EmFormData.companyName}
            </h3>
            {/* <p>{titleField}</p> */}

            <h3 className="box">Company Description</h3>
            <p style={{ wordWrap: "break-word" }} className="contentbox">
              {EmFormData.description}
            </p>

            <br />
            <CustomButton onClick={handleSubmit}>Save Profile</CustomButton>
            <br />
            <LogoutButton />
          </div>
        </>
      </div>
    </>
  );
}
