import { useQuery } from "@apollo/client";
import Navbar from "./Navbar";
import { GET_FAVORITE_ANIMES_DETAILS } from "../queries/getFavoriteAnimesDetails";
import { Link } from "react-router-dom";
import Card from "./Card";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Favorites = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Must be used within a ThemeProvider");
  }

  const { isDark } = themeContext;

  let localStorageValue = localStorage.getItem("favorites");
  let intIds: number[] = [];

  if (localStorageValue !== null) {
    const stringIds: string[] = JSON.parse(localStorageValue);
    intIds = stringIds.map((s: string) => parseInt(s));
  }

  const {
    loading: loading,
    error: error,
    data: data,
  } = useQuery(GET_FAVORITE_ANIMES_DETAILS, {
    variables: {
      perPage: intIds.length,
      ids: intIds,
    },
  });

  if (loading)
    return (
      <div className={isDark ? "bg-dark text-light" : "bg-ligth text-dark"}>
        <Navbar />
        <p className="d-flex justify-content-center my-5">Loading...</p>;
      </div>
    );

  if (error)
    <div className={isDark ? "bg-dark text-light" : "bg-ligth text-dark"}>
      <Navbar />
      return <p className="d-flex justify-content-center my-5">Error</p>;
    </div>;

  let empty = data && data.Page.media.length === 0;

  return (
    <>
      <Navbar />
      <div className={`list ${isDark ? "bg-dark" : "bg-light"}`}>
        <h5 className={`mt-3 ${isDark ? "text-light" : "text-dark"}`}>
          My Favorites
        </h5>
        <ul>
          {empty && (
            <p className={`${isDark ? "text-light" : "text-dark"}`}>Empty</p>
          )}
          {!empty &&
            data.Page.media.map((media: any) => {
              return (
                <li key={media.id}>
                  <Link className="link" key={media.id} to={`/${media.id}`}>
                    <Card
                      title={media.title.english}
                      description={media.description}
                      coverImage={media.coverImage.medium}
                    />
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Favorites;
