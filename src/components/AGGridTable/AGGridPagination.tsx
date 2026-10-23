import React, { forwardRef, useImperativeHandle } from "react";
import usePagination from "./Hooks/usePagination";
import cn from "classnames";
import type { AGGridPaginationProps, AGGridPaginationHandle } from "./types";
import "./AGGridPagination.css";

const AGGridPagination = forwardRef<AGGridPaginationHandle, AGGridPaginationProps>(({
  controles, lastPage, totalElements, totalPages, pagesSizes = null, strings = {}, pageSize = 20,
}: AGGridPaginationProps, ref) => {
  const { page, numRows, nextPage, previousPage, goToFirstPage, goToLastPage } = usePagination();
  const previousDisabled = page <= 1;
  const nextDisabled = !pagesSizes || pagesSizes[page - 1] !== pageSize || (lastPage != null && page >= lastPage) || page >= totalPages;
  const previousClasses = cn("tabler-action ag-paging-button", { "ag-disabled": previousDisabled });
  const nextClasses = cn("tabler-action ag-paging-button", { "ag-disabled": nextDisabled });
  const firstRow = totalElements === 0 ? 0 : Math.min(numRows + 1, totalElements);
  const lastRow = Math.min(numRows + (pagesSizes?.[page - 1] ?? pageSize), totalElements);

  const handleFirstPage = () => {
    const api = controles.current?.api;
    if (!api) return;
    api.paginationGoToPage(0);
    goToFirstPage();
  };
  const handleNextPage = () => {
    const api = controles.current?.api;
    if (!api || nextDisabled) return;
    api.paginationGoToNextPage();
    nextPage({ pageSize });
  };
  const handleLastPage = () => {
    const api = controles.current?.api;
    if (!api || nextDisabled) return;
    const target = Math.min(totalPages, lastPage ?? totalPages);
    api.paginationGoToPage(target - 1);
    goToLastPage({ page: target, pageSize });
  };
  const handlePreviousPage = () => {
    const api = controles.current?.api;
    if (!api || previousDisabled) return;
    api.paginationGoToPreviousPage();
    previousPage({ pageSize });
  };
  useImperativeHandle(ref, () => {
    return { page, noData: handlePreviousPage, firstPage: goToFirstPage };
  });

  return <div className="ag-paging-panel ag-unselectable ag-panel-custom">
    {pagesSizes && <span className="ag-paging-row-summary-panel" role="status">
      <span className="ag-paging-row-summary-panel-number">{firstRow}</span>
      <span> {strings.to || "to"} </span>
      <span className="ag-paging-row-summary-panel-number">{lastRow}</span>
      <span> {strings.of || "de"} </span>
      <span className="ag-paging-row-summary-panel-number">{totalElements}</span>
    </span>}
    <span className="ag-paging-page-summary-panel" role="presentation">
      <button type="button" className={previousClasses} aria-label="First Page" onClick={handleFirstPage} disabled={previousDisabled}>
        <span className="ag-icon ag-icon-first" style={{ userSelect: "none" }} role="presentation" />
      </button>
      <button type="button" className={previousClasses} aria-label="Previous Page" onClick={handlePreviousPage} disabled={previousDisabled}>
        <span className="ag-icon ag-icon-previous" style={{ userSelect: "none" }} role="presentation" />
      </button>
      <span className="ag-paging-description" role="status">
        <span> {strings.page || "Page"} </span><span className="ag-paging-number">{page}</span>
        <span> {strings.of || "de"} </span><span className="ag-paging-row-summary-panel-number">{totalPages}</span>
      </span>
      <button type="button" className={nextClasses} aria-label="Next Page" onClick={handleNextPage} disabled={nextDisabled}>
        <span className="ag-icon ag-icon-next" style={{ userSelect: "none" }} role="presentation" />
      </button>
      <button type="button" className={nextClasses} aria-label="Last Page" onClick={handleLastPage} disabled={nextDisabled}>
        <span className="ag-icon ag-icon-last" style={{ userSelect: "none" }} role="presentation" />
      </button>
    </span>
  </div>;
});

AGGridPagination.displayName = "AGGridPagination";
export default AGGridPagination;
