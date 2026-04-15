import { useMemo } from "react"
import { IconFilter } from "../IconFilter"

export function useColumns (dataColumn) {
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
            children: subItems?.map(subItem => {
                const { header, key, subItems, item, ...props } = subItem
                const element = {
                    ...props,
                    headerName: header,
                    field: item,
                    colId: key ?? item,
                }
                element["headerTooltip"] = subItem?.headerTooltip?.trim() || header || subItem?.name
                return element
            })
        }

        if (autoHeaderTooltip) columnDef["headerTooltip"] = headerTooltip?.trim() || header || name
        if (minWidth != null) columnDef["minWidth"] = minWidth
        if (item.filter === "agSetColumnFilter") item.filterParams = { ...item.filterParams, cellRenderer: IconFilter }

        return columnDef
    }), [dataColumn, flex, minWidth, resizable, sortable])

    return columnDefs
}