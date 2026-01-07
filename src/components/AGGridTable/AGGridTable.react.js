import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react"
import cn from "classnames"
import { Grid } from "../"
import { es } from "./Languages/es"
import { Button } from "../Button"
import Icon from "../Icon"
import { AgGridReact } from 'ag-grid-react'
import '@ag-grid-community/styles/ag-grid.css'
import '@ag-grid-community/styles/ag-theme-balham.css'
import { ModuleRegistry } from '@ag-grid-community/core'
import { LicenseManager } from '@ag-grid-enterprise/core'
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model"
import { SetFilterModule } from '@ag-grid-enterprise/set-filter'

export function OverlayLoading(text) { return `<span class="ag-overlay-loading-center">${text}</span>` }

export function configureAgGrid(licenseKey) {
    const modules = [ClientSideRowModelModule]
    if (licenseKey && licenseKey.trim() !== '') {
        LicenseManager.setLicenseKey(licenseKey)
        modules.push(SetFilterModule)
    }
    ModuleRegistry.registerModules(modules)
}

const AGGridTable = forwardRef((gridProps, ref) => {
    const {
        licenseKey = null,
        className,
        panelPagination,
        domLayout = 'autoHeight',
        autoHeaderTooltip = false,
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
        pinnedTopRowData = [],
        suppressHorizontalScroll = true,
        alwaysShowHorizontalScroll = false,
        alwaysShowVerticalScroll = false,
        autosize = true,
        resizable = true,
        sortable = true,
        suppressMovable = true,
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
    } = gridProps

    configureAgGrid(licenseKey) //Revisar licencia
    const gridRef = useRef()
    const [topGrid, setTopGrid] = useState([])
    const [filter, setFilter] = useState("")

    const columnDefs = useMemo(() => dataColumn?.map(column => {
        const { header, name, headerTooltip, key, subItems, item, ...props } = column
        const columnDef = {
            ...props,
            headerName: header,
            field: item,
            colId: subItems == null ? key ?? item : null,
            resizable: resizable,
            suppressMovable: suppressMovable,
            sortable: sortable,
            flex: flex,
            children: subItems?.map(subItem => {
                const { header, key, subItems, item, ...props } = subItem
                const element = {
                    ...props,
                    headerName: header,
                    field: item,
                    colId: key ?? item,
                }

                element["headerTooltip"] = subItem?.headerTooltip?.trim() || header || subItem?.name
                return element
            })
        }

        if (autoHeaderTooltip) columnDef["headerTooltip"] = headerTooltip?.trim() || header || name
        if (minWidth != null) columnDef["minWidth"] = minWidth

        if (item.filter === "agSetColumnFilter") {
            item.filterParams = { ...item.filterParams, cellRenderer: IconSetFilterRenderer }
        }

        return columnDef
    }), [dataColumn, flex, minWidth, resizable, sortable])

    const classes = cn(
        className,
        "ag-theme-balham"
    )

    const onGridReady = useCallback((params) => {
        setTopGrid(params)
    }, [])

    const deselectAll = useCallback(() => {
        setFilter()
        document.getElementById("searcher").value = ""
        gridRef.current.api.deselectAll()
    }, [gridRef])

    const onFirstDataRendered = useCallback(() => {
        if (autosize !== false) gridRef.current.api?.sizeColumnsToFit()
    }, [autosize, gridRef])

    const handleChangeFilter = (event) => {
        setFilter(event.target.value)
    }

    const onBtnExport = () => {
        topGrid.api.exportDataAsCsv({ fileName: textFileCSV, columnSeparator: "" })
    }

    const IconSetFilterRenderer = (props) => {
        const { value, selected } = props
        return (
            <span style={{ display: "flex", alignItems: "center" }}>
                <input
                    type="checkbox"
                    readOnly
                    checked={selected}
                    style={{ marginRight: "4px" }}
                />
                {value}
            </span>
        )
    }

    useImperativeHandle(ref, () => {
        return {
            getDisplayedRowAtIndex(row) {
                gridRef.current.api.getDisplayedRowAtIndex(row)
            },
            flashCells(item) {
                gridRef.current.api.flashCells(item)
            }
        }
    }, [])

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
                            columnDefs={columnDefs}
                            {...gridProps}
                            ref={gridRef}
                            suppressPaginationPanel={suppressPaginationPanel}
                            className={classes}
                            suppressHorizontalScroll={suppressHorizontalScroll}
                            alwaysShowHorizontalScroll={alwaysShowHorizontalScroll}
                            alwaysShowVerticalScroll={alwaysShowVerticalScroll}
                            rowData={dataRow}
                            rowHeight={rowHeight}
                            pinnedTopRowData={pinnedTopRowData}
                            overlayLoadingTemplate={overlayLoadingTemplate}
                            onGridReady={onGrid ?? onGridReady}
                            onFirstDataRendered={onFirstDataRendered}
                            rowSelection={rowSelection}
                            rowMultiSelectWithClick={rowMultiSelectWithClick}
                            suppressRowClickSelection={suppressRowClickSelection}
                            suppressRowTransform={suppressRowTransform}
                            domLayout={domLayout}
                            quickFilterText={filter}
                            localeText={language == null ? es : language}
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
                </div>
            </Grid.Col>
        </Grid.Row>
    )
})

export default AGGridTable
