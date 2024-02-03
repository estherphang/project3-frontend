import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";

import ArticleIcon from "@mui/icons-material/Article";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ChatIcon from "@mui/icons-material/Chat";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar() {
  //tempoary linking to talent's
  // need to think of pass props to link and porfile image.
  //use state to see if page is active, change icon to filled if clicked and link is active.
  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/talent/" className="nav-icon">
              <HomeOutlinedIcon className="nav-icon" />
            </Link>
          </li>
          <li className="active">
            <Link to="/" className="nav-icon">
              <ChatOutlinedIcon className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/talent/applications" className="nav-icon">
              <ArticleOutlinedIcon className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/talent/profile" className="nav-icon">
              <AccountCircleOutlinedIcon className="nav-icon" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
