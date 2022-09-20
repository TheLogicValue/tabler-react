import React, { forwardRef, useImperativeHandle } from 'react'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-community/dist/styles/ag-grid.css'
import usePagination from './Hooks/usePagination'
import cn from "classnames"
import "./AGGridPagination.css"

const AGGridPagination = forwardRef(({ controles, lastPage, pagesSizes = null, strings = {}, pageSize = 20 }, ref) => {
    const { page, numRows, nextPage, previousPage, firstPage } = usePagination()
    const previousClasses = cn("ag-paging-button", { "ag-disabled": page <= 1 })
    const nextClasses = cn("ag-paging-button", { "ag-disabled": (pagesSizes && pagesSizes[page - 1] < pageSize) || lastPage == page })

    const defaultStrings = {
        "to": "to",
        "page": "Page"
    }

    const handleNextPage = () => {
        if (pagesSizes[page - 1] == pageSize && lastPage != page + 1) {
            controles.current.api.paginationGoToNextPage()
            nextPage({ pageSize: pageSize })
        }
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            controles.current.api.paginationGoToPreviousPage()
            previousPage({ pageSize: pageSize })
        }
    }

    useImperativeHandle(ref, () => {
        return {
            page: page,
            noData: () => handlePreviousPage({ pageSize: pageSize }),
            firstPage: () => firstPage()
        }
    })

    return <div className="ag-paging-panel ag-unselectable ag-panel-custom" >
        {pagesSizes && <span className="ag-paging-row-summary-panel" role="status">
            <span className="ag-paging-row-summary-panel-number">{numRows + 1}</span>
            <span> {strings.to || defaultStrings.to} </span>
            <span className="ag-paging-row-summary-panel-number">{numRows + ((pagesSizes && pagesSizes[page - 1]) || pageSize)}</span>
        </span>}
        <span className="ag-paging-page-summary-panel" role="presentation">
            <div className={previousClasses} role="button" aria-label="Previous Page" onClick={handlePreviousPage} tabIndex="0" aria-disabled="true" disabled={page == 1}>
                <span className="ag-icon ag-icon-previous" unselectable="on" role="presentation"></span>
            </div>
            <span className="ag-paging-description" role="status">
                <span> {strings.page || defaultStrings.page} </span>
                <span className="ag-paging-number">{page}</span>
            </span>
            <div className={nextClasses} role="button" aria-label="Next Page" onClick={handleNextPage} tabIndex="0" aria-disabled="false">
                <span className="ag-icon ag-icon-next" unselectable="on" role="presentation"></span>
            </div>
        </span>
    </div>
})

export default AGGridPagination