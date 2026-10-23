import type * as React from "react";
import type { AgGridReactProps } from "ag-grid-react";
import type { CellClickedEvent, ColDef, ColGroupDef, GridApi, GridReadyEvent, IRowNode } from "ag-grid-community";

export type AGGridColumn<TData = unknown> = ColDef<TData> & Partial<Omit<ColGroupDef<TData>, "children">> & {
  readonly header?: string;
  readonly name?: string;
  readonly key?: string;
  readonly item?: ColDef<TData>["field"];
  /** The wrapper translates one level; deeper native groups can use children. */
  readonly subItems?: readonly AGGridColumn<TData>[];
  readonly children?: ColGroupDef<TData>["children"];
};

/** The grid API is assigned by the consumer's component after grid ready. */
export type AGGridInstance<TData = unknown> = { readonly api?: GridApi<TData> };
export type AGGridRenderer<TData = unknown> = React.ComponentType<AgGridReactProps<TData> & React.RefAttributes<AGGridInstance<TData>>>;

export type AGGridTableProps<TData = unknown> = AgGridReactProps<TData> & {
  readonly className?: string;
  readonly domLayout?: AgGridReactProps<TData>["domLayout"];
  readonly suppressPaginationPanel?: boolean;
  readonly rowSelection?: AgGridReactProps<TData>["rowSelection"];
  readonly onSelectionChanged?: AgGridReactProps<TData>["onSelectionChanged"];
  readonly defaultColDef?: AgGridReactProps<TData>["defaultColDef"];
  readonly paginationPageSizeSelector?: AgGridReactProps<TData>["paginationPageSizeSelector"];
  readonly onGridReady?: AgGridReactProps<TData>["onGridReady"];
  readonly onRowClicked?: AgGridReactProps<TData>["onRowClicked"];
  readonly onCellClicked?: AgGridReactProps<TData>["onCellClicked"];
  readonly getRowId?: AgGridReactProps<TData>["getRowId"];
  readonly AgGridReact: AGGridRenderer<TData>;
  readonly panelPagination?: React.ReactNode;
  readonly autoHeaderTooltip?: boolean;
  readonly onGrid?: (event: GridReadyEvent<TData>) => void;
  readonly onHandleChangeFilter?: React.FormEventHandler<HTMLInputElement> | null;
  readonly search?: boolean;
  readonly textFileCSV?: string;
  readonly downloadCSV?: boolean;
  readonly minWidth?: number | null;
  readonly flex?: number;
  readonly dataRow?: AgGridReactProps<TData>["rowData"];
  /** Legacy option; totals are supplied by the consumer as pinnedTopRowData. */
  readonly dataTotal?: readonly TData[];
  readonly dataColumn?: readonly AGGridColumn<TData>[] | null;
  /** Legacy flag retained without automatically resizing consumer columns. */
  readonly autosize?: boolean;
  readonly resizable?: ColDef<TData>["resizable"];
  readonly sortable?: ColDef<TData>["sortable"];
  readonly suppressMovable?: ColDef<TData>["suppressMovable"];
  readonly language?: Record<string, string> | null;
  readonly onRowClick?: (data: TData | undefined) => void;
  readonly onCellClick?: (event: CellClickedEvent<TData>) => void;
  readonly listBtn?: boolean;
  readonly deselectAllBtn?: boolean;
  readonly deselectAllOptions?: { readonly text?: React.ReactNode; readonly hidden?: boolean };
  readonly pageSize?: number;
};

export type AGGridTableHandle<TData = unknown> = {
  readonly api: GridApi<TData> | undefined;
  getDisplayedRowAtIndex: (index: number) => IRowNode<TData> | undefined;
  flashCells: GridApi<TData>["flashCells"];
};

export type AGGridTableComponent = {
  <TData = unknown>(props: AGGridTableProps<TData> & React.RefAttributes<AGGridTableHandle<TData>>): React.ReactElement;
  displayName?: string;
};

export type PaginationApi = Pick<GridApi, "paginationGoToPage" | "paginationGoToNextPage" | "paginationGoToPreviousPage">;
export type AGGridPaginationProps = {
  readonly controles: React.RefObject<{ readonly api?: PaginationApi } | null>;
  readonly lastPage?: number;
  readonly totalElements: number;
  readonly totalPages: number;
  readonly pagesSizes?: readonly number[] | null;
  readonly strings?: { readonly to?: string; readonly page?: string; readonly of?: string };
  readonly pageSize?: number;
};
export type AGGridPaginationHandle = {
  readonly page: number;
  noData: () => void;
  firstPage: () => void;
};
