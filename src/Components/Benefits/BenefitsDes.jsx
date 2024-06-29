import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { reversedOutlineButton } from "../../styleComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const BACKEND_URL = import.meta.env.VITE_SOME_BACKEND_URL;

const CustomButton = styled(Button)`
  ${reversedOutlineButton}
`;

export default function BenefitsDes() {
  const { userRole } = useUser();
  console.log(userRole);

  const [benefit, setBenefit] = useState([]);

  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/benefits`)
      .then((response) => {
        setBenefit(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const nav = useNavigate();
  const handleProfileSetting = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    nav("/talent/profile/setting");
  };

  return (
    <div>
      <div className="container">
        <p className="contentbox">
          {" "}
          Here's the list of benefits and their meaning.
        </p>
        {benefit.map((item) => (
          <div key={item.id}>
            <h3 className="box">{item.category}</h3>
            <p className="contentbox">{item.description}</p>
          </div>
        ))}
        <CustomButton
          className="profileboxbutton"
          onClick={handleProfileSetting}
        >
          {userRole === "talent"
            ? "Return Back to Edit Profile"
            : "Return To Create Jobs"}
        </CustomButton>
      </div>
    </div>
  );
}
