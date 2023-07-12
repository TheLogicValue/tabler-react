// @flow
import React, { useCallback, useMemo, useRef, useState } from "react"
import cn from "classnames"
import { Grid } from "../"
import { AgGridReact } from 'ag-grid-react'
import { es } from "./Languages/es"
import { Button } from "../Button"
import Icon from "../Icon"
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.css'

export function OverlayLoading(text) {
    return `<span class="ag-overlay-loading-center">${text}</span>`
}

export default function AGGridTable({
    className,
    panelPagination,
    suppressPaginationPanel = false,
    onGrid,
    overlayLoadingTemplate,
    onPaginationChanged = () => null,
    onHandleChangeFilter = null,
    postSortRows = () => null,
    search = false,
    textFileCSV = "Export",
    downloadCSV = false,
    suppressRowTransform = false,
    minWidth = null,
    rowHeight = null,
    flex = 1,
    dataRow = [],
    dataTotal = [],
    dataColumn = [],
    columnTotal = [],
    autosize = true,
    resizable = true,
    sortable = true,
    language = null,
    onRowClick = () => null,
    onCellClick = () => null,
    pageSize = 0,
    rowSelection = 'single',
    rowMultiSelectWithClick = false,
    suppressRowClickSelection = false,
    listBtn = false,
    deselectAllBtn = false,
    deselectAllOptions = { text: "Clear", hidden: false }
}) {
    const gridRef = useRef()
    const [topGrid, setTopGrid] = useState([])
    const [filter, setFilter] = useState("")
    const columnDefs = useMemo(() => dataColumn?.map(column => {
        const { header, key, subItems, item, ...props } = column
        return {
            ...props,
            headerName: header,
            field: item,
            colId: subItems == null ? key ?? item : null,
            // key: subItems == null ? key ?? item : null,
            children: subItems?.map(subItem => {
                const { header, key, subItems, item, ...props } = subItem
                return {
                    ...props,
                    headerName: header,
                    field: item,
                    colId: key ?? item,
                    // key: key ?? item,
                }
            })
        }
    }), [dataColumn])

    const classes = cn(
        className,
        "ag-theme-balham"
    );

    const topOptions = {
        alignedGrids: [],
        defaultColDef: {
            resizable: resizable,
            sortable: sortable,
            flex: flex,
            minWidth: minWidth
        },
        suppressHorizontalScroll: true,
    }

    const bottomOptions = {
        alignedGrids: [],
        defaultColDef: {
            resizable: resizable,
            sortable: sortable,
            flex: flex,
            minWidth: minWidth
        },
    }

    topOptions.alignedGrids.push(bottomOptions)
    bottomOptions.alignedGrids.push(topOptions)

    const onGridReady = useCallback((params) => {
        setTopGrid(params)
    }, [])

    const deselectAll = useCallback(() => {
        gridRef.current.api.deselectAll()
    }, [gridRef])

    const onFirstDataRendered = useCallback(() => {
        if (autosize !== false) gridRef.current.api?.sizeColumnsToFit()
    }, [autosize, gridRef])

    const handleChangeFilter = (event) => {
        setFilter(event.target.value)
    }

    const onBtnExport = () => {
        topGrid.api.exportDataAsCsv({ fileName: textFileCSV, columnSeparator: ";" })
    }

    return (
        <Grid.Row>
            <Grid.Col width={12}>
                <div style={{ display: 'flex', flexDirection: 'column' }} className={classes}>
                    {search === true ? <div className="addons-aggrid">
                        <input type="text" id="searcher" placeholder="Buscar..." onInput={onHandleChangeFilter ?? handleChangeFilter} />
                        {downloadCSV === true ? <Button square className="downloadCSV" title="Descargar CSV" onClick={onBtnExport} >
                            <Icon prefix="fe" name="download"></Icon>
                        </Button> : null}
                    </div> : null}
                    {listBtn === true ? <div className={deselectAllOptions.hidden ? "d-none" : "ag-btn-list"}>
                        {
                            deselectAllBtn === true ? <button id="clearDataTables" onClick={deselectAll} className={deselectAllOptions.hidden ? "d-none" : "btn btn-primary"}>{deselectAllOptions.text}</button> : null
                        }
                    </div> : null}
                    <div style={{ flex: '1 1 auto', height: '100%' }} >
                        <AgGridReact
                            ref={gridRef}
                            suppressPaginationPanel={suppressPaginationPanel}
                            className={classes}
                            gridOptions={topOptions}
                            columnDefs={columnDefs}
                            defaultColDef={topOptions.defaultColDef}
                            rowData={dataRow}
                            rowHeight={rowHeight}
                            overlayLoadingTemplate={overlayLoadingTemplate}
                            onGridReady={onGrid ?? onGridReady}
                            onFirstDataRendered={onFirstDataRendered}
                            rowSelection={rowSelection}
                            rowMultiSelectWithClick={rowMultiSelectWithClick}
                            suppressRowClickSelection={suppressRowClickSelection}
                            suppressRowTransform={suppressRowTransform}
                            domLayout={'autoHeight'}
                            quickFilterText={filter}
                            localeText={language == null ? es : language}
                            enableRangeSelection={true}
                            scrollbarWidth={dataTotal.length === 0 ? 0 : null}
                            onRowClicked={(e) => { onRowClick(e.data) }}
                            onCellClicked={(e) => { onCellClick(e) }}
                            onPaginationChanged={onPaginationChanged}
                            postSortRows={postSortRows}
                            pagination={pageSize > 0}
                            paginationPageSize={pageSize}
                        >
                        </AgGridReact>
                        <div className="ag-panel-custom">
                            {panelPagination}
                        </div>
                    </div>
                    {/* {dataTotal.length !== 0
                        ? <div style={{ flex: 'none', height: '31px', cursor: 'default !important' }}>
                            <AgGridReact
                                className={classes}
                                gridOptions={bottomOptions}
                                rowData={dataTotal}
                                headerHeight="0"
                                rowStyle={{ fontWeight: 'bold' }}
                                scrollbarWidth={0}
                            >
                                {
                                    columnTotal.map(({ header, item, colId, type, valueFormatter, maxWidth, renderIcon }) => {
                                        return <AgGridColumn
                                            cellRenderer={renderIcon}
                                            key={item}
                                            header={header}
                                            colId={colId}
                                            valueFormatter={valueFormatter}
                                            field={item}
                                            type={type}
                                            maxWidth={maxWidth}
                                        >
                                        </AgGridColumn>
                                    })
                                }
                            </AgGridReact>
                        </div>
                        : null
                    } */}
                </div>
            </Grid.Col>
        </Grid.Row>
    )
}
