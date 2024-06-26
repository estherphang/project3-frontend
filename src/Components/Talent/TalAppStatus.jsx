import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../Context/UserContext";
import axios from "axios";
import { Block } from "../../MUIComponents";

const BACKEND_TALENT_URL = import.meta.env.BACKEND_TALENT_URL;

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
        <div>
          {applications.length > 0 ? (
            applications.map((application) => (
              <Block
                key={application.id}
                text={
                  <div>
                    <p className="wp-jobtitle">
                      {application.jobListing.jobTitle}
                    </p>
                    <p className="wp-company">
                      Organisation:{" "}
                      {application.jobListing.employer.companyName}
                      <p className="wp-duration">
                        {application.applicationStatus}
                      </p>
                    </p>
                  </div>
                }
              />
            ))
          ) : (
            <p>There are no active applications at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
}
