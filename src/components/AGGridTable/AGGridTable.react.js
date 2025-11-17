import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react"
import cn from "classnames"
import { Grid } from "../"
import { es } from "./Languages/es"
import { Button } from "../Button"
import Icon from "../Icon"
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.css'
import { ModuleRegistry } from "ag-grid-community";
import { LicenseManager } from 'ag-grid-enterprise';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
export function OverlayLoading(text) { return `<span class="ag-overlay-loading-center">${text}</span>` }

function configureAgGrid(licenseKey) {
    const modules = [ClientSideRowModelModule]
    if (licenseKey !== null) {
        LicenseManager.setLicenseKey(licenseKey)
        //Añadir los modulos necesarios de enterprise
        modules.push(
            MultiFilterModule,
            SetFilterModule
        )
        ModuleRegistry.registerModules(modules);
    }
    ModuleRegistry.registerModules([modules])
}

const AGGridTable = forwardRef((gridProps, ref) => {

    console.log("Usando AGGridTable para modificar el filtro V1 "); 

    const {
        licenseKey = null,
        className,
        panelPagination,
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
            // key: subItems == null ? key ?? item : null,
            children: subItems?.map(subItem => {
                const { header, key, subItems, item, ...props } = subItem
                const element = {
                    ...props,
                    headerName: header,
                    field: item,
                    colId: key ?? item,
                    // key: key ?? item,
                }

                element["headerTooltip"] = subItem?.headerTooltip?.trim() || header || subItem?.name
                return element
            })
        }

        if (autoHeaderTooltip) columnDef["headerTooltip"] = headerTooltip?.trim() || header || name
        if (minWidth != null) columnDef["minWidth"] = minWidth

        if (column.filter === "set" || column.filter === "agSetColumnFilter") {
        columnDef.filter = "agSetColumnFilter"
        columnDef.filterParams = {
            ...columnDef.filterParams,
            cellRenderer: IconSetFilterRenderer
        }
    }

        return columnDef
    }), [dataColumn, flex, minWidth, resizable, sortable])

    const classes = cn(
        className,
        "ag-theme-balham"
    );

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
        topGrid.api.exportDataAsCsv({ fileName: textFileCSV, columnSeparator: ";" })
    }

   const IconSetFilterRenderer = (params) => {
        
    console.log(`Usando IconSetFilterRenderer en V1`);

    const value = params.value;
    return `<span style="display:flex; align-items:center;">
                <span style="color:green; margin-right:4px;">✔</span>${value}
            </span>`;
    };

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
                            {...gridProps}
                            ref={gridRef}
                            suppressPaginationPanel={suppressPaginationPanel}
                            className={classes}
                            suppressHorizontalScroll={suppressHorizontalScroll}
                            alwaysShowHorizontalScroll={alwaysShowHorizontalScroll}
                            alwaysShowVerticalScroll={alwaysShowVerticalScroll}
                            columnDefs={columnDefs}
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
                            domLayout={'autoHeight'}
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
})

export default AGGridTable
