import React from "react";
import style from "./Pagination.module.css"

const Pagination = ({ currentPage, itemsPerPage, allVideogames, paginate }) => {
  let pageNumbers = [];

  let totalPages = Math.ceil(allVideogames / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.pagination}>
         {currentPage > 1 && (
        <button className={style.previous} onClick={() => paginate(currentPage - 1)}>
              &laquo;
            </button>)}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? style.active : ""}
            onClick={() => paginate(pageNumber)}
          >{pageNumber}
          </button>
        ))}
         {currentPage < totalPages && (
        <button className={style.next} onClick={() => paginate(currentPage + 1)}>
              &raquo;
            </button>)}
    </div>
  );
};

export default Pagination;