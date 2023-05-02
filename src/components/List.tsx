import { useQuery } from "@apollo/client";
import { GET_ANIMES } from "../queries/getAnimes";
import Card from "./Card";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import Paginator from "./Paginator";
import { ThemeContext } from "../contexts/ThemeContext";

const List = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Home must be used within a ThemeProvider");
  }

  const { isDark } = themeContext;

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (location.pathname === "/list") navigate("/");
  }, [location.pathname, navigate]);

  let [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
    else setPage(1);
  };

  const {
    loading: loading,
    error: error,
    data: data,
  } = useQuery(GET_ANIMES, {
    variables: {
      page: page,
      perPage: 12,
      search: params.search,
    },
  });

  const { loading: loadingNextPage, data: nextPageData } = useQuery(
    GET_ANIMES,
    {
      variables: {
        page: page + 1,
        perPage: 12,
        search: params.search,
      },
    }
  );

  let notFound = data && data.Page.media.length === 0;
  let hasNextPage = nextPageData && nextPageData.Page.media.length !== 0;

  if (loading || loadingNextPage)
    return (
      <div className={isDark ? "bg-dark text-light" : "bg-ligth text-dark"}>
        <Navbar />
        <p className="d-flex justify-content-center my-5">Loading...</p>
      </div>
    );

  if (error)
    <div className={isDark ? "bg-dark text-light" : "bg-ligth text-dark"}>
      <Navbar />
      return <p className="d-flex justify-content-center my-5">Error</p>
    </div>;

  if (!data)
    return (
      <div className={isDark ? "bg-dark text-light" : "bg-ligth text-dark"}>
        <Navbar />
        <p className="d-flex justify-content-center my-5">Not found!</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className={`list ${isDark ? "bg-dark" : "bg-light"}`}>
        <h5 className={`mt-3 ${isDark ? "text-light" : "text-dark"}`}>
          Search result for '{params.search}'
        </h5>
        <h6 className={`${isDark ? "text-light" : "text-dark"}`}>
          Page {page}
        </h6>
        <ul>
          {data.Page.media.map((media: any) => {
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
        {!notFound && (
          <Paginator
            currentPage={page}
            hasNextPage={hasNextPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        )}
      </div>
    </>
  );
};

export default List;
