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
    /**
     * Size por pagination. 0 to no paginate.
     */
    +pageSize ?: Int16,
    /**
     * Handle onClick row
     */
    +onRowClick ?: () => void,
|};

type State = {
    topGrid: Array,
};

class AGGridTable extends React.Component<Props, State> {

    state = {
        topGrid: [],
        filter: ""
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
            pageSize = 0
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
        };

        const onFirstDataRendered = () => {
            if (autosize !== false) {
                this.state.topGrid.api.sizeColumnsToFit()
            }
        }
        const handleChangeFilter = (event) => {
            this.setState({ filter: event.target.value });
        }

        console.log(dataColumn)
        return (
            <Grid.Row>
                <Grid.Col width={12}>
                    <div style={{ display: 'flex', flexDirection: 'column' }} className={classes}>
                        {search === true ? <input type="text" id="searcher" placeholder="Buscar..." onInput={handleChangeFilter} /> : null}
                        <div style={{ flex: '1 1 auto', height: '100%' }} >
                            <AgGridReact
                                className={classes}
                                gridOptions={topOptions}
                                onFirstDataRendered={onFirstDataRendered}
                                rowData={dataRow}
                                onGridReady={onGridReady}
                                rowSelection='single'
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
                                    dataColumn.map(({ header, item, subItems = null, valueFormatter, type, maxWidth, renderIcon, filter, filterParams, sort = "", pinned = null }) => {
                                        return <AgGridColumn key={item}
                                            headerName={header}
                                            field={item}
                                            maxWidth={maxWidth}
                                            sort={sort}
                                            valueFormatter={valueFormatter}
                                            type={type}
                                            filter={filter}
                                            filterParams={filterParams}
                                            cellRendererFramework={renderIcon}
                                            pinned={pinned}>
                                            {
                                                subItems!= null ? subItems.map(({ header, item, valueFormatter, type, maxWidth, renderIcon, filter, filterParams, sort = "", pinned = null }) => {
                                                    return <AgGridColumn key={item}
                                                        headerName={header}
                                                        field={item}
                                                        maxWidth={maxWidth}
                                                        sort={sort}
                                                        valueFormatter={valueFormatter}
                                                        type={type}
                                                        filter={filter}
                                                        filterParams={filterParams}
                                                        cellRendererFramework={renderIcon}
                                                        pinned={pinned}/>
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
                                        columnTotal.map(({ header, item, type, valueFormatter, maxWidth, renderIcon }) => {
                                            return <AgGridColumn
                                                cellRendererFramework={renderIcon}
                                                key={item}
                                                header={header}
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
