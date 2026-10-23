import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react"
import cn from "classnames"
import Grid from "../Grid"
import { es } from "./Languages/es"
import { Button } from "../Button"
import Icon from "../Icon"

import type { ColDef, ColGroupDef, GridReadyEvent } from "ag-grid-community"
import type { AGGridTableProps, AGGridTableHandle, AGGridTableComponent, AGGridInstance } from "./types"

export function OverlayLoading(text: string): string { return `<span class="ag-overlay-loading-center">${text}</span>` }

function AGGridTableInner<TData>({
    AgGridReact,
    className,
    panelPagination,
    domLayout = 'autoHeight',
    autoHeaderTooltip = false,
    suppressPaginationPanel = false,
    onGrid,
    onHandleChangeFilter = null,
    search = false,
    textFileCSV = "Export",
    downloadCSV = false,
    minWidth = null,
    flex = 1,
    dataRow = [],
    dataTotal = [],
    dataColumn = [],
    autosize = true,
    resizable,
    sortable,
    suppressMovable,
    language = null,
    onRowClick = () => null,
    onCellClick = () => null,
    onSelectionChanged = () => null,
    pageSize = 0,
    rowSelection = {
        mode: 'singleRow',
        enableClickSelection: false,
        checkboxes: false,
    },
    listBtn = false,
    deselectAllBtn = false,
    deselectAllOptions = { text: "Clear", hidden: false },
    ...gridProps
}: AGGridTableProps<TData>, ref: React.ForwardedRef<AGGridTableHandle<TData>>): React.ReactElement {
    const gridRef = useRef<AGGridInstance<TData>>(null)
    const [filter, setFilter] = useState("")
    const [searchText, setSearchText] = useState("")
    const { onGridReady: consumerOnGridReady, onRowClicked, onCellClicked,
        defaultColDef, quickFilterText } = gridProps
    const columnDefaults = useMemo(() => ({
        ...(resizable == null ? {} : { resizable }),
        ...(sortable == null ? {} : { sortable }),
        ...(suppressMovable == null ? {} : { suppressMovable }),
        ...defaultColDef,
    }), [resizable, sortable, suppressMovable, defaultColDef])

    const columnDefs = useMemo(() => dataColumn?.map(column => {
        const { header, name, headerTooltip, key, subItems, item, ...props } = column
        const columnDef: ColDef<TData> & Partial<Omit<ColGroupDef<TData>, "children">> & { children?: (ColDef<TData> | ColGroupDef<TData>)[] } = {
            headerName: header,
            field: item,
            colId: subItems == null ? key ?? item : undefined,
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

        return columnDef
    }), [dataColumn, flex, minWidth, autoHeaderTooltip])

    const classes = cn(className, "ag-theme-balham")
    const onGridReady = useCallback((params: GridReadyEvent<TData>) => {
        onGrid?.(params)
        consumerOnGridReady?.(params)
    }, [onGrid, consumerOnGridReady])
    const handleChangeFilter = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchText(event.currentTarget.value)
        if (onHandleChangeFilter) onHandleChangeFilter(event)
        else setFilter(event.currentTarget.value)
    }

    const deselectAll = useCallback(() => {
        setFilter("")
        setSearchText("")
        gridRef.current?.api?.deselectAll()
    }, [])

    const onBtnExport = () => { gridRef.current?.api?.exportDataAsCsv({ fileName: textFileCSV }) }

    useImperativeHandle(ref, () => {
        return {
            getDisplayedRowAtIndex(row: number) { return gridRef.current?.api?.getDisplayedRowAtIndex(row) },
            flashCells(item?: Parameters<AGGridTableHandle<TData>["flashCells"]>[0]) { gridRef.current?.api?.flashCells(item) },
            get api() { return gridRef.current?.api }
        }
    }, [])

    return (
        <Grid.Row>
            <Grid.Col width={12}>
                <div style={{ display: 'flex', flexDirection: 'column' }} className={classes}>
                    {search === true ? <div className="addons-aggrid">
                        <input type="text" id="searcher" className="ag-grid-search" aria-label="Buscar en la tabla" placeholder="Buscar..." value={quickFilterText ?? searchText} onInput={handleChangeFilter} />
                        {downloadCSV === true ? <Button type="button" square className="downloadCSV" aria-label="Descargar CSV" onClick={onBtnExport} >
                            <Icon prefix="fe" name="download"></Icon>
                        </Button> : null}
                    </div> : null}
                    {listBtn === true ? <div className={deselectAllOptions.hidden ? "d-none" : "ag-btn-list"}>
                        {
                            deselectAllBtn === true ? <button type="button" id="clearDataTables" onClick={deselectAll} className={deselectAllOptions.hidden ? "d-none" : "btn btn-primary"}>{deselectAllOptions.text}</button> : null
                        }
                    </div> : null}
                    <div style={{ flex: '1 1 auto', height: '100%' }} >
                        <AgGridReact
                            {...gridProps}
                            ref={gridRef}
                            columnDefs={columnDefs}
                            defaultColDef={columnDefaults}
                            rowData={dataRow}
                            onGridReady={onGridReady}
                            quickFilterText={quickFilterText ?? filter}
                            localeText={language || es}
                            pagination={pageSize > 0}
                            paginationPageSize={pageSize}
                            onRowClicked={(e) => { onRowClick(e.data); onRowClicked?.(e) }}
                            onCellClicked={(e) => { onCellClick(e); onCellClicked?.(e) }}
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
}

// React.forwardRef erases the row generic; restore it on the public call signature.
const AGGridTable = forwardRef(AGGridTableInner) as AGGridTableComponent

AGGridTable.displayName = "AGGridTable"

export default AGGridTable
