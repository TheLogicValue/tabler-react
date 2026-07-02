import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react"
import cn from "classnames"
import { Grid } from "../"
import { es } from "./Languages/es"
import { Button } from "../Button"
import Icon from "../Icon"

export function OverlayLoading(text) { return `<span class="ag-overlay-loading-center">${text}</span>` }

const AGGridTable = forwardRef(({
    AgGridReact,
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
    onSelectionChanged = () => null,
    pageSize = 0,
    rowSelection = {
        mode: 'single', //'multiRow'
        enableClickSelection: false,
        checkboxes: false,
        headerCheckbox: false,
    },
    listBtn = false,
    deselectAllBtn = false,
    deselectAllOptions = { text: "Clear", hidden: false },
    ...gridProps
}, ref) => {
    const gridRef = useRef()
    const [topGrid, setTopGrid] = useState([])
    const [filter, setFilter] = useState("")

    const IconSetFilterRenderer = (props) => {
        const { value, selected } = props
        return (
            <span style={{ display: "flex", alignItems: "center" }}>
                <input type="checkbox" readOnly checked={selected} style={{ marginRight: "4px" }} />
                {value}
            </span>
        )
    }

    const columnDefs = useMemo(() => dataColumn?.map(column => {
        const { header, name, headerTooltip, key, subItems, item, ...props } = column
        const columnDef = {
            headerName: header,
            field: item,
            colId: subItems == null ? key ?? item : null,
            flex: flex,
            ...props,
            children: subItems?.map(subItem => {
                const { header, key, subItems, item, ...props } = subItem
                const element = {
                    headerName: header,
                    field: item,
                    colId: key ?? item,
                    headerTooltip: subItem?.headerTooltip?.trim() || header || subItem?.name,
                    ...props
                }
                return element
            })
        }

        if (autoHeaderTooltip) columnDef["headerTooltip"] = headerTooltip?.trim() || header || name
        if (minWidth != null) columnDef["minWidth"] = minWidth
        if (item.filter === "agSetColumnFilter") item.filterParams = { ...item.filterParams, cellRenderer: IconSetFilterRenderer }

        return columnDef
    }), [dataColumn, flex, minWidth, resizable, sortable])

    const classes = cn(className, "ag-theme-balham")
    const onGridReady = useCallback((params) => { setTopGrid(params) }, [])
    const handleChangeFilter = (event) => { setFilter(event.target.value) }

    const deselectAll = useCallback(() => {
        setFilter()
        document.getElementById("searcher").value = ""
        gridRef.current.api.deselectAll()
    }, [gridRef])

    const onBtnExport = () => { topGrid.api.exportDataAsCsv({ fileName: textFileCSV, columnSeparator: "" }) }

    useImperativeHandle(ref, () => {
        return {
            getDisplayedRowAtIndex(row) { gridRef.current.api.getDisplayedRowAtIndex(row) },
            flashCells(item) { gridRef.current.api.flashCells(item) },
            api: gridRef.current?.api
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
                            {...gridProps}
                            ref={gridRef}
                            columnDefs={columnDefs}
                            rowData={dataRow}
                            onGridReady={onGridReady}
                            quickFilterText={filter}
                            localeText={language || es}
                            pagination={pageSize > 0}
                            paginationPageSize={pageSize}
                            onRowClicked={(e) => onRowClick(e.data)}
                            onCellClicked={(e) => onCellClick(e)}
                            onSelectionChanged={(e) => onSelectionChanged(e)}
                            domLayout={domLayout}
                            suppressPaginationPanel={suppressPaginationPanel}
                            rowSelection={rowSelection}
                        >
                        </AgGridReact>
                        <div className="ag-panel-custom">{panelPagination}</div>
                    </div>
                </div>
            </Grid.Col>
        </Grid.Row>
    )
})

export default AGGridTable
