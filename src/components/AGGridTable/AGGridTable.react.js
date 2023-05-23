// @flow

import * as React from "react";
import cn from "classnames";
import { Grid } from "../";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { es } from "./Languages/es";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button } from "../Button";
import Icon from "../Icon"

export function OverlayLoading(text) {
    return `<span class="ag-overlay-loading-center">${text}</span>`
}

type Props = {|
    +className ?: string,
    +search ?: Boolean,
    +minWidth ?: Int16,
    +flex ?: Int16,
    +dataRow ?: Array,
    +dataTotal ?: Array,
    +dataColumn ?: Array,
    +columnTotal ?: Array,
    +autosize ?: Boolean,
    +resizable ?: Boolean,
    +sortable ?: Boolean,
    +language ?: string,
    /*** Size por pagination. 0 to no paginate.*/
    +pageSize ?: Int16,
    /*** Handle onClick row*/
    +onRowClick ?: () => void,
    /*** Handle onClick cell*/
    +onCellClick ?: () => void,
    /**Type of row selection 'single' o 'multiple' */
    +rowSelection ?: string,
    /**Selection row with click when rowSelection is multiple */
    +rowMultiSelectWithClick ?: Boolean,
|};

type State = {
    topGrid: Array,
};

class AGGridTable extends React.Component<Props, State> {

    state = {
        topGrid: [],
        filter: "",
        api: null,
    }

    render(): React.Node {
        const {
            className,
            panelPagination,
            suppressPaginationPanel = false,
            onGrid,
            overlayLoadingTemplate,
            gridRef,
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
        }: Props = this.props;

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

        const onGridReady = (params) => {
            this.setState({ topGrid: params })
            this.api = params.api;
        };

        const deselectAll = () => { this.api.deselectAll(); }

        const onFirstDataRendered = () => {
            if (autosize !== false) this.state.topGrid.api.sizeColumnsToFit();
        }
        const handleChangeFilter = (event) => {
            this.setState({ filter: event.target.value });
        }

        const onBtnExport = () => {
            const columns = dataColumn.filter(column => column.csv == true).map(column => column.item)
            this.state.topGrid.api.exportDataAsCsv({ fileName: textFileCSV, columnSeparator: ";", columnKeys: columns });
        };

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
                                onFirstDataRendered={onFirstDataRendered}
                                rowData={dataRow}
                                rowHeight={rowHeight}
                                overlayLoadingTemplate={overlayLoadingTemplate}
                                onGridReady={onGrid ?? onGridReady}
                                rowSelection={rowSelection}
                                rowMultiSelectWithClick={rowMultiSelectWithClick}
                                suppressRowClickSelection={suppressRowClickSelection}
                                suppressRowTransform={suppressRowTransform}
                                domLayout={'autoHeight'}
                                quickFilterText={this.state.filter}
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
                                {
                                    dataColumn.map(({ header, key = null, valueGetter, autoHeight = false, wrapText = false, cellClassRules, cellClass, cellStyle, item, subItems = null, valueFormatter, type, maxWidth, minWidth, rowSpan, renderIcon, filter, filterParams, sort = "", pinned = null, sortable, comparator }) => {
                                        return <AgGridColumn
                                            headerName={header}
                                            field={item}
                                            rowSpan={rowSpan}
                                            maxWidth={maxWidth}
                                            valueGetter={valueGetter}
                                            cellClassRules={cellClassRules}
                                            cellClass={cellClass}
                                            cellStyle={cellStyle}
                                            comparator={comparator}
                                            minWidth={minWidth}
                                            sort={sort}
                                            sortable={sortable}
                                            colId={subItems == null ? key ?? item : null}
                                            key={subItems == null ? key ?? item : null}
                                            valueFormatter={valueFormatter}
                                            type={type}
                                            filter={filter}
                                            filterParams={filterParams}
                                            cellRenderer={renderIcon}
                                            wrapText={wrapText}
                                            autoHeight={autoHeight}
                                            pinned={pinned}>
                                            {
                                                subItems != null ? subItems.map(({ header, key = null, valueGetter, autoHeight = false, wrapText = false, cellClassRules, cellClass, cellStyle, item, valueFormatter, type, maxWidth, minWidth, renderIcon, rowSpan, filter, filterParams, sort = "", sortable, comparator, pinned = null }) => {
                                                    return <AgGridColumn
                                                        headerName={header}
                                                        field={item}
                                                        maxWidth={maxWidth}
                                                        minWidth={minWidth}
                                                        valueGetter={valueGetter}
                                                        sort={sort}
                                                        comparator={comparator}
                                                        sortable={sortable}
                                                        rowSpan={rowSpan}
                                                        colId={key ?? item}
                                                        key={key ?? item}
                                                        valueFormatter={valueFormatter}
                                                        cellClassRules={cellClassRules}
                                                        cellClass={cellClass}
                                                        cellStyle={cellStyle}
                                                        type={type}
                                                        filter={filter}
                                                        wrapText={wrapText}
                                                        autoHeight={autoHeight}
                                                        filterParams={filterParams}
                                                        cellRenderer={renderIcon}
                                                        pinned={pinned} />
                                                }) : null
                                            }
                                        </AgGridColumn>
                                    })
                                }
                            </AgGridReact>
                            <div className="ag-panel-custom">
                                {panelPagination}
                            </div>
                        </div>
                        {dataTotal.length !== 0
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
                        }
                    </div>
                </Grid.Col>
            </Grid.Row>
        );
    }
}

export default AGGridTable;
