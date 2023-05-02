import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_ANIME_DETAILS } from "../queries/getAnimeDetails";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Details = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Must be used within a ThemeProvider");
  }

  const { isDark } = themeContext;

  let { id } = useParams();

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    let localStorageValue = localStorage.getItem("favorites");
    if (localStorageValue !== null) {
      let favorites = JSON.parse(localStorageValue);
      if (favorites.includes(id)) setIsFavorited(true);
    }
  }, [id]);

  const toggleFavorited = () => {
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    let localStorageValue = localStorage.getItem("favorites");

    if (isFavorited) {
      if (localStorageValue === null) {
        localStorage.setItem("favorites", JSON.stringify([id]));
      } else {
        let favorites = JSON.parse(localStorageValue);
        if (!favorites.includes(id)) {
          favorites.push(id);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      }
    } else {
      if (localStorageValue !== null) {
        let favorites = JSON.parse(localStorageValue);
        if (favorites.includes(id)) {
          favorites = favorites.filter((x: string) => x !== id);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      }
    }
  }, [isFavorited, id]);

  const { loading, error, data } = useQuery(GET_ANIME_DETAILS, {
    variables: {
      id: id,
    },
  });

  if (loading)
    return (
      <>
        <Navbar />
        <p className="d-flex justify-content-center my-5">Loading...</p>;
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <p className="d-flex justify-content-center my-5">Error</p>;
      </>
    );

  if (!data)
    return (
      <>
        <Navbar />
        <p className="d-flex justify-content-center my-5">Not found!</p>;
      </>
    );

  const genresString = data.Media.genres;
  const formattedGenres = genresString.join(", ");

  const startDate = new Date(
    data.Media.startDate.year,
    data.Media.startDate.month,
    data.Media.startDate.day
  );

  const endDate = new Date(
    data.Media.endDate.year,
    data.Media.endDate.month,
    data.Media.endDate.day
  );

  const startDateFormatted = startDate.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const endDateFormatted = endDate.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Navbar />
      <div className={isDark ? "bg-dark text-light" : "bg-light text-dark"}>
        <img
          className="img-fluid"
          style={{ width: "100%" }}
          src={data.Media.coverImage.large}
        />
        <div className="mt-5 px-5">
          <h3 className="d-flex justify-content-between">
            {data.Media.title.romaji}
            <i
              className={`bi ${isFavorited ? "bi-star-fill" : "bi-star"}`}
              onClick={toggleFavorited}
            ></i>
          </h3>
          <h5 className="mb-3 text-secondary">{data.Media.title.english}</h5>
          <div>
            <p>
              <b>Average Score:</b> {data.Media.averageScore}
              <br />
              <b>Format:</b> {data.Media.format}
              <br />
              <b>Episodes:</b> {data.Media.episodes}
              <br />
              <b>Status:</b> {data.Media.status}
              <br />
              <b>Genre(s):</b> {formattedGenres}
              <br />
              <b>Aired:</b> {`${startDateFormatted} to ${endDateFormatted}`}
              <br />
              <b>Duration:</b> {`${data.Media.duration} minutes`}
              <br />
            </p>
          </div>
        </div>
        <img className="img-fluid" src={data.Media.bannerImage} />
        <div className="mt-3 px-5 mb-5">
          <b>Description:</b>
          <br />
          <p dangerouslySetInnerHTML={{ __html: data.Media.description }}></p>
        </div>
      </div>
    </>
  );
};

export default Details;
