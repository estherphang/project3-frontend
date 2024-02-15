import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../constants";
import { Button } from "antd";
import { reversedOutlineButton } from "../../styleComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)`
  ${reversedOutlineButton}
`;

export default function BenefitsDes() {
  const [benefit, setBenefit] = useState([]);

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
    nav("/talent/profile/setting");
  };

  return (
    <div>
      <div className="container">
        <p className="contentbox">
          {" "}
          Here's the list of benefits and their meaning.
        </p>
        <ul>
          {benefit.map((item) => (
            <li key={item.id}>
              {item.category}
              <br />
              {item.description}
            </li>
          ))}
        </ul>
        <CustomButton
          className="profileboxbutton"
          onClick={handleProfileSetting}
        >
          Return Back to Edit Profile
        </CustomButton>
      </div>
    </div>
  );
}
