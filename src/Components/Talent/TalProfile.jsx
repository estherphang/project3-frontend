import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "../Context/UserContext";

export default function TalProfile() {
  const { userFirstName, userLastName, userImage, userEmail } = useUser();

  return (
    <>
      <div className="container">
        <p>Edit within the container</p>
        <EditIcon />
        <p>Talent Profile</p>
        <p>
          Name: {userFirstName} {userLastName}
        </p>
        <p>Photo: {userImage}</p>
        <p>Email: {userEmail}</p>
        <h3 className="box">Objectives</h3>
        <h3 className="box">Work Experience</h3>
        <h3 className="box">Skill Sets</h3>
        <h3 className="box">Education</h3>
      </div>
    </>
  );
}
