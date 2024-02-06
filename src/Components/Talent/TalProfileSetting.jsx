import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";

const CustomButton = styled(Button)`
  ${buttonStyle}
`;

export default function TalProfileSetting() {
  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
      <CustomButton
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </CustomButton>
    );
  };

  return (
    <>
      <div className="container">
        <p>Talent Profile Setting </p>
        <h3>Objectives</h3>
        <h3>Preferences</h3>
        <h3>Account Access</h3>
        <LogoutButton />
      </div>
    </>
  );
}
