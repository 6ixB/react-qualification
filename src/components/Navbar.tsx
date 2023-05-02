import { NavLink } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Must be used within a ThemeProvider");
  }

  const { isDark } = themeContext;

  return (
    <nav
      className={`navbar sticky-top navbar-expand-lg ${
        isDark ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container-fluid">
        <NavLink
          className="navar-brand fw-bold link"
          aria-current="page"
          to="/"
        >
          MY AniList
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={`nav-link mx-3 ${
                  isDark ? "text-light" : "text-dark"
                }`}
                aria-current="page"
                to="/"
              >
                Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link mx-3 ${
                  isDark ? "text-light" : "text-dark"
                }`}
                aria-current="page"
                to="/favorites"
              >
                Favorites
              </NavLink>
            </li>
            <li className="nav-item">
              <ThemeToggleButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
