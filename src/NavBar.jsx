import { Link } from "react-router-dom";

function NavBar() {
  //tempoary linking to talent's
  // need to think of pass props to link and porfile image.
  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/talent/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="active">
            <Link to="/" className="nav-link">
              Chat
            </Link>
          </li>
          <li>
            <Link to="/talent/application" className="nav-link">
              Application
            </Link>
          </li>
          <li>
            <Link to="/talent/profile" className="nav-link">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
