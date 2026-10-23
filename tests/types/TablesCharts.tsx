import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import type { AgGridReactProps } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { AGGridTable, AGGridPagination, OverlayLoading, type AGGridColumn, type AGGridTableHandle, type AGGridInstance } from "../../src/components/AGGridTable";
import Table from "../../src/components/Table";
import { BarChart, LineChart, PieChart, DoughnutChart, RadarChart, type BarChartProps, type ChartAxisMinMax } from "../../src/components/Chart";
import { TableLoader, BarChartLoader, PieChartLoader } from "../../src/components/ContentLoader";

type Fund = { id: string; weight: number; details: { name: string } };
const rows: Fund[] = [{ id: "atlas", weight: 60, details: { name: "Atlas" } }];
const columns: readonly AGGridColumn<Fund>[] = [
  { header: "Peso", item: "weight", editable: params => params.data?.weight !== 0, cellStyle: { color: "blue" } },
  { header: "Identificación", marryChildren: true, subItems: [{ header: "Nombre", item: "details.name", filter: true }] },
];
const defaults: ColDef<Fund> = { sortable: true, resizable: true };
const ref = React.createRef<AGGridTableHandle<Fund>>();
<AGGridTable<Fund> ref={ref} AgGridReact={AgGridReact<Fund>} dataRow={rows} dataColumn={columns}
  defaultColDef={defaults} getRowId={params => params.data.id} pinnedTopRowData={rows}
  rowSelection={{ mode: "multiRow", checkboxes: true, headerCheckbox: true }} rowHeight={40}
  onGrid={event => event.api.getSelectedRows().map(row => row.id)}
  onRowClick={row => row?.weight.toFixed(1)}
  onCellClick={event => event.data?.weight.toFixed(1)}
  onSelectionChanged={event => event.api.getSelectedRows().map(row => row.id)}
  onHandleChangeFilter={event => event.currentTarget.value}
  onPaginationChanged={event => event.api.paginationGetCurrentPage()}
  postSortRows={params => params.nodes[0]?.data?.details.name}
  overlayLoadingTemplate={OverlayLoading("Cargando")}
  gridOptions={{ getRowId: params => params.data.id }} />;
// Row types also flow from dataRow without an explicit component type argument.
<AGGridTable AgGridReact={AgGridReact<Fund>} dataRow={rows} onRowClick={row => row?.weight.toFixed()} />;
const Adapter = React.forwardRef<AGGridInstance<Fund>, AgGridReactProps<Fund>>(function Adapter(props, handle) {
  React.useImperativeHandle(handle, () => ({}));
  return <span>{props.rowData?.length}</span>;
});
<AGGridTable AgGridReact={Adapter} dataRow={rows} />;
ref.current?.getDisplayedRowAtIndex(0)?.data?.weight.toFixed();
ref.current?.flashCells({ rowNodes: [], columns: ["weight"] });
ref.current?.api?.getSelectedRows().map(row => row.id);
<AGGridPagination controles={ref} pagesSizes={[20, 8]} totalPages={2} totalElements={28} />;

<Table id="funds" responsive striped bodyitems={[{ key: "a", item: [{ content: "Atlas", alignContent: "left" }] }]} headeritems={[{ content: "Nombre" }]} />;
<Table><Table.Header title="Cabecera"><Table.Row onClick={event => event.currentTarget.rowIndex}>
  <Table.ColHeader colSpan={2} alignContent="center">Fondo</Table.ColHeader>
</Table.Row></Table.Header><Table.Body id="rows"><Table.Row><Table.Col>Atlas</Table.Col></Table.Row></Table.Body></Table>;
<TableLoader width="100%" speed={2} uniqueKey="table" title="Cargando" />;
<BarChartLoader backgroundColor="#eee" />;
<PieChartLoader foregroundOpacity={0.5} />;

const bounds: ChartAxisMinMax = (range, boundary) => boundary === "min" ? 0 : range.max;
const colors = ["#3676c8", "#21a48a"];
const bar: BarChartProps = { colors, series: [[10, 20]], seriesName: ["Peso"], yAxisFormatter: value => value.toFixed(1), yAxisMinMax: bounds, tooltipFormatter: item => String(item.value) };
<BarChart {...bar} xAxisData={["A", "B"]} />;
<BarChart type="horizontal" colors={colors} series={[[10, 20]]} seriesName={["Peso"]} yAxisData={["A", "B"]}
  xAxisFormatter={value => value.toFixed()} xAxisMinMax={bounds} tooltipFormatter={item => item.name} />;
<BarChart stack="total" series={["Peso"]} seriesName={[[10, 20]]} colors={colors} yAxisFormatter={String} yAxisMinMax={bounds} tooltipFormatter={item => item.name} />;
<LineChart lines={[{ name: "Peso", data: [10, 20], color: colors[0] }]} xAxisData={["A", "B"]}
  getLegend={{ Peso: true }} selectedOptions={["Peso"]} height="300px"
  tooltipFormatter={items => items.map(item => item.seriesName).join(", ")}
  yAxisFormatter={String} yAxisMinMax={bounds} onExpand={() => undefined} />;
<PieChart series={[10, 20]} seriesDataName={["A", "B"]} colors={colors} center={["50%", "50%"]} tooltipFormatter={item => String(item.percent)} />;
<DoughnutChart series={[10, 20]} seriesDataName={["A", "B"]} colors={colors} legendformatter={item => String(item.value)} tooltipFormatter={item => item.name} />;
<RadarChart series={[[60, 70]]} seriesDataName={["Perfil"]} colors={colors} indicator={[{ name: "A", max: 100 }, { name: "B", max: 100 }]}
  tooltipFormatter={item => item.value.map(String).join(", ")} />;

// @ts-expect-error dataRow uses the same row type as the grid and its callbacks.
<AGGridTable<Fund> AgGridReact={AgGridReact<Fund>} dataRow={[{ id: 1 }]} />;
// @ts-expect-error column paths are checked against the consumer row type.
const badColumn: AGGridColumn<Fund> = { header: "Error", item: "missing" };
void badColumn;
// @ts-expect-error row callbacks expose data, not a grid event.
<AGGridTable<Fund> AgGridReact={AgGridReact<Fund>} onRowClick={event => event.api} />;
// @ts-expect-error the grid motor belongs to the consumer and must be supplied.
<AGGridTable dataRow={rows} />;
// @ts-expect-error row lookup indices are numeric.
ref.current?.getDisplayedRowAtIndex("0");
// @ts-expect-error native grid layout values are preserved.
<AGGridTable<Fund> AgGridReact={AgGridReact<Fund>} domLayout="unsupported" />;
// @ts-expect-error native cell content alignment is restricted.
<Table.Col alignContent="bottom" />;
// @ts-expect-error unstacked bars take data in series and names in seriesName.
<BarChart colors={colors} series={["Peso"]} seriesName={[[1, 2]]} yAxisFormatter={String} yAxisMinMax={bounds} tooltipFormatter={String} />;
// @ts-expect-error horizontal bars require the numeric X axis callbacks.
<BarChart type="horizontal" {...bar} />;
// @ts-expect-error LineChart tooltip receives an array, not a single item.
<LineChart yAxisFormatter={String} yAxisMinMax={bounds} tooltipFormatter={item => item.name} />;
// @ts-expect-error legend selection is an object, not a callback.
<LineChart yAxisFormatter={String} yAxisMinMax={bounds} tooltipFormatter={String} getLegend={() => true} />;
// @ts-expect-error radar data contains a vector for each profile.
<RadarChart colors={colors} series={[1, 2]} seriesDataName={["Perfil"]} tooltipFormatter={String} />;
// @ts-expect-error pie values follow the native numeric data contract.
<PieChart colors={colors} series={["invalid"]} seriesDataName={["A"]} tooltipFormatter={String} />;
// @ts-expect-error charts do not forward arbitrary option objects.
<PieChart colors={colors} seriesDataName={[]} tooltipFormatter={String} option={{}} />;
