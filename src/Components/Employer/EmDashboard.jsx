import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { BACKEND_EMPLOYER_URL } from "../../../constants";
import { OutlinedCard } from "../../MUIComponents";

import axios from "axios";
//route is /employer
export default function EmDashboard() {
  //get data from the employer joblisting backend. use it to populate job listing dashboard
  const { userFirstName, userID } = useUser();

  const [joblistings, setJobListings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_EMPLOYER_URL}/${userID}/job`)
      .then((response) => {
        setJobListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(joblistings);
  }, [joblistings]);

  let alljoblistings = joblistings.map((joblisting) => (
    <>
      <OutlinedCard
        jobTitle={joblisting.jobTitle}
        applicationStartDate={joblisting.applicationStartDate}
        applicationEndDate={joblisting.applicationEndDate}
        description={joblisting.description}
        joblistingID={joblisting.id}
        employerID={userID}
      ></OutlinedCard>
    </>
  ));

  return (
    <>
      <div className="container">
        <h1 className="centered">Employer Dashboard {userFirstName}</h1>

        <h3 className="box">Active Job Listings</h3>
        {/*if the active job listings is empty, show the text:*/}

        {joblistings ? (
          alljoblistings
        ) : (
          <p>You have no job listings at the moment!</p>
        )}
      </div>
    </>
  );
}
