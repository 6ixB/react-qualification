import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeToggleButton: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Must be used within a ThemeProvider");
  }

  const { isDark, toggleTheme } = themeContext;

  console.log(isDark);

  return (
    <>
      <div className="mx-3 my-2 form-check form-switch">
        <input
          className="me-3 form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onClick={toggleTheme}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Dark Theme
        </label>
      </div>
    </>
  );
};

export default ThemeToggleButton;
