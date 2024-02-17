import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useUser } from "./Components/Context/UserContext";
import styled from "styled-components";
import { navImage } from "./styleComponents";
import { Avatar } from "@mui/material";

const CustomStyleIcon = styled(Avatar)`
  ${navImage}
`;

function NavBar() {
  const { userRole, userImage } = useUser();
  console.log("nav role", userRole);
  console.log("nav image", userImage);

  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to={`/${userRole}`} className="nav-icon">
              <HomeOutlinedIcon className="nav-icon" />
            </Link>
          </li>
          <li className="active">
            <Link to="/chat" className="nav-icon">
              <ChatOutlinedIcon className="nav-icon" />
            </Link>
          </li>
          {userRole === "employer" ? null : (
            <li>
              <Link to={`/${userRole}/applications`} className="nav-icon">
                <ArticleOutlinedIcon className="nav-icon" />
              </Link>
            </li>
          )}

          <li>
            <Link to={`/${userRole}/profile`} className="nav-icon">
              <CustomStyleIcon alt="profile" src={`${userImage}`} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
