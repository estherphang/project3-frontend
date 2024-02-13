import React from "react";
import { useUser } from "../Context/UserContext";

export default function EmDashboard() {
  //get data from the employer joblisting backend. use it to populate job listing dashboard
  const { userFirstName, userLastName, userImage, userEmail } = useUser();
  let alljoblistings = joblistings.map((joblisting) => (
    <>
      <div className="joblisting">
        <p>{joblisting.content}</p>
      </div>
    </>
  ));

  return (
    <>
      <div className="container">
        <p>Employer Dashboard {userFirstName}</p>

        <h3>Active Job Listings</h3>

        {/*if the active job listings is empty, show the text:*/}
        <p>You have no job listings at the moment!</p>

        {alljoblistings}
        {/**/}
      </div>
    </>
  );
}
