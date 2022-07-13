// @flow

import * as React from "react";
import cn from "classnames";
import { Grid } from "../";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { es } from "./Languages/es";
import "ag-grid-community/styles/ag-grid.css";
import Button from "../Button";
import Icon from "../Icon"

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
            theme = "ag-theme-balham",
            search = false,
            textFileCSV = "Export",
            downloadCSV = false,
            minWidth = null,
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
            theme,
        );

        const topOptions = {
            alignedGrids: [],
            defaultColDef: {
                resizable: resizable,
                sortable: sortable,
                flex: flex,
                minWidth: minWidth
            },
            suppressHorizontalScroll: true
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
            this.state.topGrid.api.exportDataAsCsv({ fileName: textFileCSV, columnSeparator: ";" });
        };

        return (
            <Grid.Row>
                <Grid.Col width={12}>
                    <div style={{ display: 'flex', flexDirection: 'column' }} className={classes}>
                        {search === true ? <div className="addons-aggrid">
                            <input type="text" id="searcher" placeholder="Buscar..." onInput={handleChangeFilter} />
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
                                className={classes}
                                gridOptions={topOptions}
                                onFirstDataRendered={onFirstDataRendered}
                                rowData={dataRow}
                                onGridReady={onGridReady}
                                rowSelection={rowSelection}
                                rowMultiSelectWithClick={rowMultiSelectWithClick}
                                suppressRowClickSelection={suppressRowClickSelection}
                                domLayout={'autoHeight'}
                                quickFilterText={this.state.filter}
                                localeText={language == null ? es : language}
                                enableRangeSelection={true}
                                scrollbarWidth={dataTotal.length === 0 ? 0 : null}
                                onRowClicked={(e) => { onRowClick(e.data) }}
                                onCellClicked={(e) => { onCellClick(e) }}
                                pagination={pageSize > 0}
                                paginationPageSize={pageSize}
                            >
                                {
                                    dataColumn.map(({ header, valueGetter, cellClassRules, cellClass, cellStyle, item, subItems = null, valueFormatter, type, maxWidth, minWidth, renderIcon, filter, filterParams, sort = "", pinned = null }) => {
                                        return <AgGridColumn key={item}
                                            headerName={header}
                                            field={item}
                                            maxWidth={maxWidth}
                                            valueGetter={valueGetter}
                                            cellClassRules={cellClassRules}
                                            cellClass={cellClass}
                                            cellStyle={cellStyle}
                                            minWidth={minWidth}
                                            sort={sort}
                                            colId={subItems == null ? item : null}
                                            key={subItems == null ? item : null}
                                            valueFormatter={valueFormatter}
                                            type={type}
                                            filter={filter}
                                            filterParams={filterParams}
                                            cellRenderer={renderIcon}
                                            pinned={pinned}>
                                            {
                                                subItems != null ? subItems.map(({ header, valueGetter, cellClassRules, cellClass, cellStyle, item, valueFormatter, type, maxWidth, minWidth, renderIcon, filter, filterParams, sort = "", pinned = null }) => {
                                                    return <AgGridColumn key={item}
                                                        headerName={header}
                                                        field={item}
                                                        maxWidth={maxWidth}
                                                        minWidth={minWidth}
                                                        valueGetter={valueGetter}
                                                        sort={sort}
                                                        colId={item}
                                                        key={item}
                                                        valueFormatter={valueFormatter}
                                                        cellClassRules={cellClassRules}
                                                        cellClass={cellClass}
                                                        cellStyle={cellStyle}
                                                        type={type}
                                                        filter={filter}
                                                        filterParams={filterParams}
                                                        cellRenderer={renderIcon}
                                                        pinned={pinned} />
                                                }) : null
                                            }
                                        </AgGridColumn>
                                    })
                                }
                            </AgGridReact>
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
