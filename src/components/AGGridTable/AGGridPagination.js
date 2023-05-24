import React, { forwardRef, useImperativeHandle } from 'react'
// import 'ag-grid-community/styles/ag-theme-balham.css'
// import 'ag-grid-community/styles/ag-grid.css'
import usePagination from './Hooks/usePagination'
import cn from "classnames"
import "./AGGridPagination.css"

const AGGridPagination = forwardRef(({ controles, lastPage, totalElements, totalPages, pagesSizes = null, strings = {}, pageSize = 20 }, ref) => {
    const { page, numRows, nextPage, previousPage, goToFirstPage, goToLastPage } = usePagination()
    const previousClasses = cn("ag-paging-button", { "ag-disabled": page <= 1 })
    const nextClasses = cn("ag-paging-button", {
        "ag-disabled": (pagesSizes && pagesSizes[page - 1] < pageSize) || lastPage == page || totalPages == page
    })

    const defaultStrings = {
        "to": "to",
        "page": "Page",
        "of": 'de'
    }

    const handleFirstPage = () => {
        controles.current.api.paginationGoToPage(0)
        goToFirstPage()
    }

    const handleNextPage = () => {
        if (pagesSizes[page - 1] == pageSize && lastPage != page + 1) {
            controles.current.api.paginationGoToNextPage()
            nextPage({ pageSize })
        }
    }

    const handleLastPage = () => {
        if (pagesSizes[page - 1] == pageSize && lastPage != page + 1) {
            controles.current.api.paginationGoToPage(totalPages - 1)
            goToLastPage({ page: totalPages, pageSize })
        }
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            controles.current.api.paginationGoToPreviousPage()
            previousPage({ pageSize })
        }
    }

    useImperativeHandle(ref, () => {
        return {
            page: page,
            noData: () => handlePreviousPage({ pageSize }),
            firstPage: () => goToFirstPage()
        }
    })

    return <div className="ag-paging-panel ag-unselectable ag-panel-custom" >
        {pagesSizes && <span className="ag-paging-row-summary-panel" role="status">
            <span className="ag-paging-row-summary-panel-number">{numRows + 1}</span>
            <span> {strings.to || defaultStrings.to} </span>
            <span className="ag-paging-row-summary-panel-number">{numRows + ((pagesSizes && pagesSizes[page - 1]) || pageSize)}</span>
            <span> {strings.of || defaultStrings.of} </span>
            <span className="ag-paging-row-summary-panel-number">{totalElements}</span>
        </span>}
        <span className="ag-paging-page-summary-panel" role="presentation">
            <div className={previousClasses} role="button" aria-label="First Page" onClick={handleFirstPage}>
                <span class="ag-icon ag-icon-first" unselectable="on" role="presentation"></span>
            </div>
            <div className={previousClasses} role="button" aria-label="Previous Page" onClick={handlePreviousPage} tabIndex="0" disabled={page == 1}>
                <span className="ag-icon ag-icon-previous" unselectable="on" role="presentation"></span>
            </div>
            <span className="ag-paging-description" role="status">
                <span> {strings.page || defaultStrings.page} </span>
                <span className="ag-paging-number">{page}</span>
                <span> {strings.of || defaultStrings.of} </span>
                <span className="ag-paging-row-summary-panel-number">{totalPages}</span>
            </span>
            <div className={nextClasses} role="button" aria-label="Next Page" onClick={handleNextPage} tabIndex="0">
                <span className="ag-icon ag-icon-next" unselectable="on" role="presentation"></span>
            </div>
            <div className={nextClasses} role="button" aria-label="Last Page" onClick={handleLastPage} tabindex="0">
                <span className="ag-icon ag-icon-last" unselectable="on" role="presentation"></span>
            </div>
        </span>
    </div>
})



export default AGGridPagination