import { Link } from "react-router-dom";
import { getUser } from "../services/authorize";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark-subtle fs-3">
      <div className="container-fluid">
        <a href="/" className="navbar-brand fs-1">
          My diary
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {" "}
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav nav-tabs">
            <li className="nav-item pr-3 pt-3 pb-3">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item pr-3 pt-3 pb-3">
              <Link to="/create" className="nav-link">
                Create diary
              </Link>
            </li>
            {!getUser() && (
              <li className="nav-item pr-3 pt-3 pb-3">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
