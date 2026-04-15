// @flow
import AGGridWrapper from "./AGGridWrapper"
import AGGridPagination from "./AGGridPagination"
import { useGrid } from "./Hooks/useGrid"
import { useColumns } from "./Hooks/useColumns"

const OverlayLoading = (text) => { return `<span class="ag-overlay-loading-center">${text}</span>` }

export { useGrid, useColumns, OverlayLoading, AGGridPagination, AGGridWrapper }