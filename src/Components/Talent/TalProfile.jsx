import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "../Context/UserContext";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { profileImage, editIcon } from "../../styleComponents";

const CustomProfileImage = styled(Avatar)`
  ${profileImage}
`;

const CustomIcon = styled(IconButton)`
  ${editIcon}
`;

export default function TalProfile() {
  const { userFirstName, userLastName, userImage, userEmail } = useUser();

  return (
    <>
      <div className="container">
        <CustomProfileImage alt="profile" src={`${userImage}`} />

        <p>
          {userFirstName} {userLastName}
        </p>
        <p>Designation</p>
        <h3 className="box">
          Objectives{" "}
          <CustomIcon>
            {" "}
            <EditIcon />
          </CustomIcon>
        </h3>

        <h3 className="box">
          Work Experience{" "}
          <CustomIcon>
            {" "}
            <EditIcon />
          </CustomIcon>
        </h3>
        <h3 className="box">
          Skill Sets{" "}
          <CustomIcon>
            {" "}
            <EditIcon />
          </CustomIcon>
        </h3>
        <h3 className="box">
          Education{" "}
          <CustomIcon>
            {" "}
            <EditIcon />
          </CustomIcon>
        </h3>
      </div>
    </>
  );
}
