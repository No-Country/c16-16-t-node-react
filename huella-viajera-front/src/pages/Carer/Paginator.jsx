import {
  PagItemStyle,
  PagNextStyle,
  PagPrevStyle,
  PaginationStyle,
} from "./StyledComponents";

export const Paginator = ({ byPage, currentPage, setCurrentPage, total }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / byPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (specific) => {
    setCurrentPage(specific);
  };

  return (
    <PaginationStyle className="justify-content-center">
      <PagPrevStyle
        className={currentPage === 1 ? "disabled" : ""}
        onClick={onPreviousPage}
      >
        <i className="bi bi-arrow-left p-1"></i>
        Anterior
      </PagPrevStyle>
      {pageNumbers.map((noPage) => (
        <PagItemStyle
          key={noPage}
          active={noPage === currentPage ? true : false}
          onClick={() => onSpecificPage(noPage)}
        >
          {noPage}
        </PagItemStyle>
      ))}

      <PagNextStyle
        className={currentPage >= pageNumbers.length ? "disabled" : ""}
        onClick={onNextPage}
      >
        Siguiente
        <i className="bi bi-arrow-right p-1"></i>
      </PagNextStyle>
    </PaginationStyle>
  );
};
