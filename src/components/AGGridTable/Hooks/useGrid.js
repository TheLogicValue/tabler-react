import { es } from "../Languages/es"
import cn from "classnames"

export function useGrid(props) {
  const defaultGridOptions = {
    // Layout general
    flex: 1,
    domLayout: "autoHeight",
    pagination: false,

    // Comportamientos comunes
    suppressHorizontalScroll: true,
    alwaysShowHorizontalScroll: false,
    alwaysShowVerticalScroll: false,
    suppressRowTransform: false,
    suppressPaginationPanel: false,

    // Columnas
    autosize: true,
    resizable: true,
    sortable: true,
    suppressMovable: true,
    autoHeaderTooltip: false,
    tooltipShowMode: "standard",

    // Selección por defecto
    rowSelection: {
      mode: "single",
      enableClickSelection: false,
      checkboxes: false,
      headerCheckbox: false,
    },

    // Eventos por defecto (vacíos)
    onPaginationChanged: () => {},
    onHandleChangeFilter: null,
    onSelectionChanged: () => {},
    onRowClicked: () => {},
    onCellClicked: () => {},
    postSortRows: () => {},
  }

  const { language, pageSize, className } = props

  const apiRef = useRef(null)
  const columnApiRef = useRef(null)
  const classes = cn(className, "ag-theme-balham")

  const onGridReady = useCallback((e) => {
    apiRef.current = e.api
    columnApiRef.current = e.columnApi
  }, [])

  return {
    columnApi: columnApiRef.current,
    gridApi: apiRef.current,
    gridProps: {
      onGridReady,
      className: classes,
      localeText: language || es,
      pagination: pageSize > 0,
      paginationPageSize: pageSize,
      ...defaultGridOptions,
      rowSelection: {
        ...defaultGridOptions.rowSelection,
        ...(props.rowSelection || {}),
      },
    },
  }
}
