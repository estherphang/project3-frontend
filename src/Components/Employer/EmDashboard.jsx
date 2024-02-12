import React from "react";
import { useUser } from "../Context/UserContext";

export default function EmDashboard() {
  const { userFirstName, userLastName, userImage, userEmail } = useUser();
  return (
    <>
      <div className="container">
        <p>Edit within the container</p>
        <p>Employer Dashboard {userFirstName}</p>
      </div>
    </>
  );
}
