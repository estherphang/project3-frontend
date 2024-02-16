import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../Context/UserContext";
import axios from "axios";
import { BACKEND_TALENT_URL } from "../../../constants";
import { Block } from "../../MUIComponents";

export default function TalAppStatus() {
  const { isAuthenticated } = useAuth0();
  const { userID } = useUser();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchApplications = async () => {
        try {
          const applicationResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/applications`
          );
          const applicationData = applicationResponse.data;
          console.log(applicationData);
          setApplications(applicationData);
        } catch (error) {
          console.error("Error fetching benefits:", error);
        }
      };
      fetchApplications();
    }
  }, [isAuthenticated, userID]);

  return (
    <>
      <div className="container">
        <h3 className="box">Application Status</h3>
        {applications.map((application) => (
          <Block
            key={application.id} // Don't forget to add a unique key when using map
            text={
              <div>
                <p className="wp-jobtitle">{application.jobListing.jobTitle}</p>
                <p className="wp-company">
                  Organisation: {application.jobListing.employer.companyName}
                  <p className="wp-duration">{application.applicationStatus}</p>
                </p>
              </div>
            }
          />
        ))}
      </div>
    </>
  );
}
