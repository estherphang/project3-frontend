import { useUser } from "../Context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

//Custom Button
import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";
const CustomButton = styled(Button)`
  ${buttonStyle}
`;

import EditIcon from "@mui/icons-material/Edit";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EmProfile() {
  const {
    description,
    setDescription,
    imgurl,
    setImageUrl,
    companyName,
    setCompanyName,
  } = useUser();

  const navigate = useNavigate();

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
          <h1>{companyName}'s Profile</h1>
          <img className="fixedSizeImage" src={imgurl} />
        </div>

        <>
          <div className="container">
            <h3 style={{ wordWrap: "break-word" }} className="contentbox">
              {companyName}
            </h3>
            {/* <p>{titleField}</p> */}

            <h3 className="box">Company Description</h3>
            <p style={{ wordWrap: "break-word" }} className="contentbox">
              {description}
            </p>

            <br />
            <CustomButton onClick={handleSubmit}>Save Profile</CustomButton>
            <br />
            <LogoutButton />

            <Fab
              color="primary"
              aria-label="add"
              onClick={() => navigate(`/employer/input-details`)}
              sx={{
                position: "fixed",
                bottom: "80px", // Adjust as needed
                left: "calc(50%)", // Center horizontally
                transform: "translateX(-50%)", // Center horizontally
                zIndex: "999", // Ensures it stays on top of other content
                backgroundColor: "rgba(119, 101, 227,0.8)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgb(138, 129, 124)",
                },
                "&:hover svg": {
                  color: "black",
                },
              }}
            >
              <EditIcon />
            </Fab>
          </div>
        </>
      </div>
    </>
  );
}
