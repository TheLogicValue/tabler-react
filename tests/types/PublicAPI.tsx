import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import * as Tabler from "../../src";
import type {
  AGGridColumn, AGGridTableHandle, AnimationEvents, ClipboardEvents, CompositionEvents,
  FocusEvents, FormEvents, ImageEvents, KeyboardEvents, MediaEvents, MouseEvents,
  OtherEvents, PointerEvents, SelectionEvents, TouchEvents, UIEvents, WheelEvents,
  CardProps, DatePickerHandle, DatePickerProps, GridColProps, LoginPageProps,
  BarChartProps, ContactDetail, UseSearchBarResult,
} from "../../src";
import "../../src/Tabler.css";

const animation: AnimationEvents = { onAnimationEnd: event => event.animationName.toUpperCase() };
const clipboard: ClipboardEvents<HTMLInputElement> = { onPaste: event => event.clipboardData.getData("text/plain") };
const composition: CompositionEvents<HTMLInputElement> = { onCompositionUpdate: event => event.data.trim() };
const focus: FocusEvents<HTMLInputElement> = { onBlur: event => event.currentTarget.value.trim() };
const form: FormEvents<HTMLFormElement> = { onSubmit: event => { event.preventDefault(); event.currentTarget.checkValidity(); } };
const image: ImageEvents<HTMLImageElement> = { onLoad: event => event.currentTarget.naturalWidth.toFixed() };
const keyboard: KeyboardEvents<HTMLInputElement> = { onKeyDown: event => event.key.toLowerCase() };
const media: MediaEvents<HTMLVideoElement> = { onTimeUpdate: event => event.currentTarget.currentTime.toFixed() };
const mouse: MouseEvents<HTMLButtonElement> = { onClick: event => event.currentTarget.disabled, onDrop: event => event.dataTransfer.getData("text/plain") };
const other: OtherEvents<HTMLDetailsElement> = { onToggle: event => event.currentTarget.open };
const pointer: PointerEvents<SVGSVGElement> = { onPointerDown: event => event.pointerType.toLowerCase() };
const selection: SelectionEvents<HTMLInputElement> = { onSelect: event => event.currentTarget.selectionStart };
const touch: TouchEvents = { onTouchStart: event => event.touches.length.toFixed() };
const ui: UIEvents<HTMLDivElement> = { onScroll: event => event.currentTarget.scrollTop.toFixed() };
const wheel: WheelEvents = { onWheel: event => event.deltaY.toFixed() };
export const eventGroups = { animation, clipboard, composition, focus, form, image, keyboard, media, mouse, other, pointer, selection, touch, ui, wheel };

type Row = { id: string; weight: number };
const columns: readonly AGGridColumn<Row>[] = [{ item: "weight", valueFormatter: params => params.data?.weight.toFixed() ?? "" }];
const gridRef = React.createRef<AGGridTableHandle<Row>>();
const dateRef = React.createRef<DatePickerHandle>();
const card: CardProps = { title: "Título", children: <Tabler.Card.Body>Contenido</Tabler.Card.Body> };
const column: GridColProps = { width: 12, lg: 6 };
const date: DatePickerProps = { date: new Date(), today: true };
const login: LoginPageProps = { values: { email: "", password: "" }, onChange: event => event.currentTarget.value.trim(), onSubmit: event => event.preventDefault() };
const bar: BarChartProps = { type: "vertical", colors: ["#3676c8"], series: [[1, 2]], seriesName: ["Importe"], xAxisData: ["A", "B"], yAxisFormatter: String, yAxisMinMax: range => range.max, tooltipFormatter: item => String(item.value) };
export const contact: ContactDetail = { title: "Correo", content: <a href="mailto:equipo@example.com">Equipo</a> };
export type PublicSearchResult = UseSearchBarResult;

export const publicComponents = <>
  <Tabler.Grid><Tabler.Grid.Row><Tabler.Grid.Col {...column}><Tabler.Card {...card} /></Tabler.Grid.Col></Tabler.Grid.Row></Tabler.Grid>
  <Tabler.Button RootComponent={Link} to="/datos">Consultar</Tabler.Button>
  <Tabler.Text RootComponent="a" href="/datos">Consultar</Tabler.Text>
  <Tabler.DatePicker {...date} ref={dateRef} />
  <Tabler.AGGridTable<Row> ref={gridRef} AgGridReact={AgGridReact<Row>} dataColumn={columns} dataRow={[{ id: "a", weight: 60 }]}
    onGridReady={event => event.api.getSelectedRows().map(row => row.weight.toFixed())}
    onRowClick={row => row?.weight.toFixed()} />
  <Tabler.BarChart {...bar} />
  <Tabler.LoginPage {...login} />
  <Tabler.Error404Page action="Volver" />
</>;

gridRef.current?.getDisplayedRowAtIndex(0)?.data?.weight.toFixed();
dateRef.current?.reset();

// @ts-expect-error Event groups are readonly.
mouse.onClick = () => undefined;
// @ts-expect-error A pointer callback receives React's pointer event.
export const invalidPointer: PointerEvents = { onPointerDown: (event: number) => event.toFixed() };
// @ts-expect-error The renamed event groups still describe props, not event objects.
export const invalidEvent: MouseEvents = { button: 0 };
// @ts-expect-error Drag callbacks use DragEvent and cannot receive clipboard handlers.
export const invalidDrag: MouseEvents = { onDrop: (event: React.ClipboardEvent<HTMLElement>) => event.clipboardData.getData("text") };
// @ts-expect-error Typed column fields preserve the consumer's row model.
export const invalidColumn: AGGridColumn<Row> = { item: "missing" };
// @ts-expect-error Native props depend on the selected root element.
export const invalidText = <Tabler.Text RootComponent="button" href="/datos" />;
