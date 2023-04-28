import React, { forwardRef, useImperativeHandle } from 'react'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-community/dist/styles/ag-grid.css'
import usePagination from './Hooks/usePagination'
import cn from "classnames"
import "./AGGridPagination.css"

const AGGridPagination = forwardRef(({ controles, totalElements, totalPages, pageSize = 20, strings = {} }, ref) => {
    const { page, numRows, numRowsOf, nextPage, previousPage, goToFirstPage, goToLastPage } = usePagination({
        totalElements, initialNumRowsOf: pageSize
    })
    const previousClasses = cn("ag-paging-button", { "ag-disabled": page <= 1 })
    const nextClasses = cn("ag-paging-button", {
        "ag-disabled": totalPages == page
    })

    const defaultStrings = {
        "to": "to",
        "page": "Page",
        "of": 'de'
    }

    const handleFirstPage = () => {
        controles.current.api.paginationGoToPage(0)
        goToFirstPage({ pageSize, totalElements })
    }

    const handleNextPage = () => {
        if (totalPages > page + 1) {
            controles.current.api.paginationGoToNextPage()
            nextPage({ pageSize })
        }
        if (totalPages == page + 1) {
            controles.current.api.paginationGoToNextPage()
            goToLastPage({ page: totalPages, totalElements, pageSize })
        }
    }

    const handleLastPage = () => {
        if (totalPages != page && page > 0) {
            controles.current.api.paginationGoToPage(totalPages - 1)
            goToLastPage({ page: totalPages, totalElements, pageSize })
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
            lastPage: ({ totalPages, totalElements }) => goToLastPage({ page: totalPages, totalElements, pageSize }),
            firstPage: () => goToFirstPage({ pageSize, totalElements })
        }
    })

    return <div className="ag-paging-panel ag-unselectable ag-panel-custom" >
        {<span className="ag-paging-row-summary-panel" role="status">
            <span className="ag-paging-row-summary-panel-number">{numRows}</span>
            <span> {strings.to || defaultStrings.to} </span>
            <span className="ag-paging-row-summary-panel-number">{totalElements < numRowsOf ? totalElements : numRowsOf}</span>
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