interface PaginatorProps {
  currentPage: number;
  hasNextPage: boolean;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const Paginator = ({
  currentPage,
  hasNextPage,
  handlePrevPage,
  handleNextPage,
}: PaginatorProps) => {
  return (
    <>
      <div className="container-fluid d-flex justify-content-center gap-3 mb-5">
        {currentPage != 1 && (
          <button
            className="btn btn-outline-secondary"
            onClick={handlePrevPage}
          >
            <i className="bi bi-chevron-left"></i>Prev
          </button>
        )}
        {hasNextPage && (
          <button
            className="btn btn-outline-secondary"
            onClick={handleNextPage}
          >
            Next <i className="bi bi-chevron-right"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default Paginator;
