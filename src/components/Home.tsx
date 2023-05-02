import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.tsx";
import Navbar from "./Navbar.tsx";
import Search from "./Search.tsx";

const Home = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Must be used within a ThemeProvider");
  }

  const { isDark } = themeContext;

  return (
    <>
      <div
        className={`vw-100 vh-100 ${
          isDark ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <Navbar />
        <div className="container-fluid pt-5 pb-2 px-5">
          <h6>Welcome to MY AniList</h6>
          <div>
            The next-generation anime platform. Track, share, and discover your
            favorite anime and manga with MY AniList.
          </div>
        </div>
        <Search />
      </div>
    </>
  );
};

export default Home;
