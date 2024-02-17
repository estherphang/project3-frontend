import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_EMPLOYER_URL, BACKEND_TALENT_URL } from "../../../constants";
import { useUser } from "../Context/UserContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OutlinedCard2 } from "../../MUIComponents";

import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";
const CustomButton = styled(Button)`
  ${buttonStyle}
`;
//this is where they can accept or deny applications for specific job listings.
//"/:employerId/job/:jobListingId"

export default function EmJobListingApplications() {
  const { isAuthenticated, user } = useAuth0();
  //need to get a list of all applications in relation io the joblisting.
  //need to send a post request to the application controller method switching it's status from PENDING to either ACCEPTED or DENIED.
  const { userID } = useUser();
  //get job listing id from the params?????? look at bigfoot
  const [jobapplications, setJobApplications] = useState([]);

  const [jobListing, setJobListing] = useState([]);

  const params = useParams();
  const jobListingId = params.jobListingId;

  useEffect(() => {
    axios
      .get(`${BACKEND_EMPLOYER_URL}/${userID}/job/${jobListingId}`)
      .then((response) => {
        const joblistingdata = response.data.jobListing;
        const joblistingappdata = response.data.applications;

        console.log(response.data);
        setJobApplications(joblistingappdata);
        setJobListing(joblistingdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_EMPLOYER_URL}/${userID}/job/${jobListingId}`)
      .then((response) => {
        const joblistingdata = response.data.jobListing;
        const joblistingappdata = response.data.applications;

        console.log(response.data);
        setJobApplications(joblistingappdata);
        setJobListing(joblistingdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAcceptApplication = (applicationId, talentId) => {
    //make a backend route that changes the status of the application from pending to accept
    console.log("handleAcceptApplication called");
    axios
      .put(`${BACKEND_TALENT_URL}/${talentId}/applications`, {
        applicationStatus: "Accepted",
        applicationId: applicationId,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDenyApplication = (applicationId, talentId) => {
    //make a backend route that changes the status of the application from pending to accept
    console.log("handleAcceptApplication called");
    axios
      .put(`${BACKEND_TALENT_URL}/${talentId}/applications`, {
        applicationStatus: "Denied",
        applicationId: applicationId,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  let alljoblistingApplication = jobapplications.map((jobapplication) => (
    <>
      <div className="contentbox">
        {jobapplication.talentId}
        <CustomButton
          onClick={() =>
            handleAcceptApplication(jobapplication.id, jobapplication.talentId)
          }
        >
          Accept
        </CustomButton>
        <CustomButton
          onClick={() =>
            handleDenyApplication(jobapplication.id, jobapplication.talentId)
          }
        >
          Deny
        </CustomButton>
      </div>
    </>
  ));

  return (
    <>
      <h3 className="box">Job Listing no. {jobListingId}</h3>
      <OutlinedCard2
        jobTitle={jobListing.jobTitle}
        applicationStartDate={jobListing.applicationStartDate}
        applicationEndDate={jobListing.applicationEndDate}
        description={jobListing.description}
        skillSet={jobListing.skillSet}
        jobResponsibility={jobListing.jobResponsibility}
      />
      <h3 className="box">Applications</h3>
      <div className="container">{JSON.stringify(jobapplications)}</div>
      {/*show a single application.*/}
      {alljoblistingApplication}

      {/* <Fab
        color="primary"
        aria-label="add"
        onClick={console.log("a")}
        sx={{
          position: "fixed",
          bottom: "80px", // Adjust as needed
          left: "calc(50% - 55px)", // Center horizontally
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
        <ClearRoundedIcon />
      </Fab>
      <Fab
        aria-label="like"
        onClick={console.log("like")}
        sx={{
          position: "fixed",
          bottom: "80px", // Adjust as needed
          left: "calc(50% + 55px)", // Center horizontally
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
        <FavoriteIcon />
      </Fab> */}
    </>
  );
}
