import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_TALENT_URL } from "../../../constants";
import axios from "axios";
import { useUser } from "../Context/UserContext";

export default function TalDashboard() {
  const { isAuthenticated } = useAuth0();
  const { userID } = useUser();
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchBenefits = async () => {
        try {
          const benefitResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/benefits`
          );
          const benefitData = benefitResponse.data;
          const benefits = benefitData.benefits.map((benefit) => benefit.id);
          console.log("benefits", benefits);
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
          const jobListingsResponse = await axios.get(
            `${BACKEND_TALENT_URL}/joblistings`
          );
          const jobListingsData = jobListingsResponse.data;
          console.log("job listings", jobListingsData);

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
  }, [isAuthenticated, selectedBenefits]);

  console.log("filterd jobs", jobListings);

  //display next application without affecting URL. add index +1.

  return (
    <div className="container">
      {jobListings.map((job) => (
        <div key={job.id}>
          <h3>{job.jobTitle}</h3>
          <p>{job.description}</p>
          <h4>Company Benefits:</h4>
          <ul>
            {job.benefits.map((benefit) => (
              <li key={benefit.id}>{benefit.category}</li>
            ))}
          </ul>
          <ul>
            <h4>Employer Information:</h4>
            <p>Company Name: {job.employer.companyName}</p>
            <p>Description: {job.employer.description}</p>
          </ul>
        </div>
      ))}
    </div>
  );
}
