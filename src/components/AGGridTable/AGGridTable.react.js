// @flow

import * as React from "react";
import cn from "classnames";
import { Grid } from "../";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { es } from "./Languages/es";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

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
            search = false,
            minWidth = null,
            flex = 1,
            dataRow = [],
            dataTotal = [],
            dataColumn = [],
            columnTotal = [],
            autosize = true,
            resizable = true,
            sortable = true,
            language = "es",
            onRowClick,
            pageSize = 0,
            rowSelection = 'single',
            rowMultiSelectWithClick = false,
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

        return (
            <Grid.Row>
                <Grid.Col width={12}>
                    <div style={{ display: 'flex', flexDirection: 'column' }} className={classes}>
                        {search === true ? <input type="text" id="searcher" placeholder="Buscar..." onInput={handleChangeFilter} /> : null}
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
                                domLayout={'autoHeight'}
                                quickFilterText={this.state.filter}
                                localeText={language === "es" ? es : null}
                                enableRangeSelection={true}
                                scrollbarWidth={dataTotal.length === 0 ? 0 : null}
                                onRowClicked={(e) => { onRowClick(e.data) }}
                                pagination={pageSize > 0}
                                paginationPageSize={pageSize}
                            >
                                {
                                    dataColumn.map(({ header, colId, item, subItems = null, valueFormatter, type, maxWidth, renderIcon, filter, filterParams, sort = "", pinned = null }) => {
                                        return <AgGridColumn key={item}
                                            headerName={header}
                                            field={item}
                                            maxWidth={maxWidth}
                                            sort={sort}
                                            colId={colId}
                                            key={item}
                                            valueFormatter={valueFormatter}
                                            type={type}
                                            filter={filter}
                                            filterParams={filterParams}
                                            cellRendererFramework={renderIcon}
                                            pinned={pinned}>
                                            {
                                                subItems != null ? subItems.map(({ header, colId, item, valueFormatter, type, maxWidth, renderIcon, filter, filterParams, sort = "", pinned = null }) => {
                                                    return <AgGridColumn key={item}
                                                        headerName={header}
                                                        field={item}
                                                        maxWidth={maxWidth}
                                                        sort={sort}
                                                        colId={colId}
                                                        key={item}
                                                        valueFormatter={valueFormatter}
                                                        type={type}
                                                        filter={filter}
                                                        filterParams={filterParams}
                                                        cellRendererFramework={renderIcon}
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
                                                cellRendererFramework={renderIcon}
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
