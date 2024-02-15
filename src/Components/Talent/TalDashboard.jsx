import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_TALENT_URL } from "../../../constants";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

export default function TalDashboard() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { userID } = useUser();
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchBenefits = async () => {
        try {
          const benefitResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/benefits`
          );
          const benefitData = benefitResponse.data;
          const benefits = benefitData.benefits.map((benefit) => benefit.id);
          // console.log("benefits", benefits);
          setSelectedBenefits(benefits);
        } catch (error) {
          console.error("Error fetching benefits:", error);
        }
      };
      fetchBenefits();
    }
  }, [isAuthenticated, userID]);

  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchJobListings = async () => {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
            scope: "read:current_user",
          });

          const jobListingsResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/joblistings`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const jobListingsData = jobListingsResponse.data;
          // console.log("job listings", jobListingsData);

          // retrieve all the ids
          const allBenefits = jobListingsData.reduce((acc, job) => {
            return acc.concat(job.benefits.map((benefit) => benefit.id));
          }, []);

          // filter job listings that can be found in user's career priorities
          const filteredJobListings = jobListingsData.filter((job) => {
            return selectedBenefits.some((selectedBenefit) =>
              allBenefits.includes(selectedBenefit)
            );
          });

          setJobListings(filteredJobListings);
        } catch (error) {
          console.error("Error fetching job listings:", error);
        }
      };
      fetchJobListings();
    }
  }, [isAuthenticated, selectedBenefits, getAccessTokenSilently, userID]);

  // console.log("filterd jobs", jobListings);

  //display next application without affecting URL. add index +1.
  const handleNextJob = () => {
    //remainder 0 = return to index 0
    setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobListings.length);
  };

  //user to apply for job, push details to application table
  //set application status to pending
  //reset the job listing array be filtering the applied index?

  const handleApplyJob = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });

      const currentJobId = jobListings[currentJobIndex].id;
      console.log("current job id?", currentJobId);

      await axios.post(
        `${BACKEND_TALENT_URL}/${userID}/applications`,
        {
          talendID: userID,
          jobListingId: currentJobId,
          applicationStatus: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      handleNextJob();
    } catch (error) {
      console.error("Error applying for the job:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {jobListings.length > 0 ? (
        <div key={jobListings[currentJobIndex].id}>
          <h3 className="box">Job Title</h3>
          <div className="contentbox">
            <p>{jobListings[currentJobIndex].jobTitle}</p>
          </div>
          <h3 className="box">Description</h3>
          <div className="contentbox">
            <p>{jobListings[currentJobIndex].description}</p>
          </div>
          <h3 className="box">Job Responsibility</h3>
          <div className="contentbox">
            <p>{jobListings[currentJobIndex].jobResponsibility}</p>
          </div>
          <h3 className="box">Skill Set Required</h3>
          <div className="contentbox">
            <p>{jobListings[currentJobIndex].skillSet}</p>
          </div>
          <h3 className="box">Application Period</h3>
          <div className="contentbox">
            <p>
              {jobListings[currentJobIndex].applicationStartDate} to{" "}
              {jobListings[currentJobIndex].applicationEndDate}
            </p>
          </div>
          <h3 className="box">Company Benefits</h3>
          <div className="contentbox">
            <ul>
              {jobListings[currentJobIndex].benefits.map((benefit) => (
                <li key={benefit.id}>{benefit.category}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="box">About the Employer</h3>
            <div className="contentbox">
              <p>
                Company Name:{" "}
                {jobListings[currentJobIndex].employer.companyName}
              </p>
              <p>
                Description: {jobListings[currentJobIndex].employer.description}
              </p>
            </div>
          </div>
          <div>
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleNextJob}
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
              onClick={handleApplyJob}
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
            </Fab>
          </div>
        </div>
      ) : (
        <p>There is no job at the moment.</p>
      )}
    </div>
  );
}
