import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { BACKEND_TALENT_URL } from "../constants";

function NavBar() {
  //collect user role from table.
  //pass role to navigation links

  const { isAuthenticated, user } = useAuth0();

  const TALENT = "talent";
  const EMPLOYER = "employer";

  const nav = useNavigate();

  const [role, setRole] = useState("");

  useEffect(() => {
    const checkUserStatus = async () => {
      if (isAuthenticated && user) {
        try {
          // Make a request to check if the user exists in the talent table
          const talentResponse = await axios.get(BACKEND_TALENT_URL);
          const talentEmails = talentResponse.data.map(
            (talent) => talent.email
          );
          if (talentEmails.includes(user.email)) {
            setRole(TALENT);
            return;
          }

          // Make a request to check if the user exists in the employer table
          const employerResponse = await axios.get(BACKEND_EMPLOYER_URL);
          const employerEmails = employerResponse.data.map(
            (employer) => employer.email
          );
          if (employerEmails.includes(user.email)) {
            setRole(EMPLOYER);
            return;
          }
        } catch (error) {
          console.error("Error checking user status:", error);
        }
      }
    };

    checkUserStatus();
  }, [isAuthenticated, user, nav]);

  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to={`/${role}`} className="nav-icon">
              <HomeOutlinedIcon className="nav-icon" />
            </Link>
          </li>
          <li className="active">
            <Link to="/chat" className="nav-icon">
              <ChatOutlinedIcon className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to={`/${role}/applications`} className="nav-icon">
              <ArticleOutlinedIcon className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to={`/${role}/profile`} className="nav-icon">
              <AccountCircleOutlinedIcon className="nav-icon" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
