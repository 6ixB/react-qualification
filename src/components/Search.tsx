import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_ANIMES } from "../queries/getAnimes";
import { useLazyQuery } from "@apollo/client";
import Card from "./Card";
import { ThemeContext } from "../contexts/ThemeContext";

const Search = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Home must be used within a ThemeProvider");
  }

  const { isDark } = themeContext;

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAnimes, { loading, data }] = useLazyQuery(GET_ANIMES);

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    navigate(`/list/${searchTerm}`);
  };

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
    searchAnimes({
      variables: { search: event.target.value, perPage: 12, page: 1 },
    });
  };

  let notFound = data && data.Page.media.length === 0 && searchTerm;

  return (
    <>
      <form className="container-fluid mt-3 px-5" onSubmit={handleSearchSubmit}>
        <div className="input-group">
          <input
            type="text"
            className={`form-control ${
              isDark ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            id="titleInput"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search"
          />
          <button type="submit" className="btn btn-outline-info">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </form>
      {loading && (
        <p className="d-flex justify-content-center my-5">Loading...</p>
      )}
      {notFound && (
        <p className="d-flex justify-content-center my-5">Not found</p>
      )}
      <div className="list mt-4">
        <ul>
          {data &&
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

export default Search;
