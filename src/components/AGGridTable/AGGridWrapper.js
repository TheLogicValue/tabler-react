import { forwardRef, useCallback, useImperativeHandle, useState } from "react"
import cn from "classnames"
import { Grid } from ".."
import { Button } from "../Button"
import Icon from "../Icon"
// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-balham.css'

const AGGridWrapper = forwardRef(( props, ref ) => {
    const { gridApi, onHandleChangeFilter, search, className, textFileCSV, children, deselectAllProps } = props
    const { show, text = "Clear", hidden = true } = deselectAllProps

    const [filter, setFilter] = useState("")
    const classes = cn(className, "ag-theme-balham")

    const handleChangeFilter = (event) => { setFilter(event.target.value) }
    const onBtnExport = () => { gridApi.exportDataAsCsv({ fileName: textFileCSV, columnSeparator: "" }) }
    const deselectAll = useCallback(() => {
        setFilter()
        document.getElementById("searcher").value = ""
        gridRef.current.api.deselectAll()
    }, [gridRef])

    useImperativeHandle(ref, () => {
        return {
            filter
        }
    }, [])

    return (
        <Grid.Row>
            <Grid.Col width={12}>
                <div style={{ display: 'flex', flexDirection: 'column' }} className={classes}>
                    {search === true && <div className="addons-aggrid">
                        <input type="text" id="searcher" placeholder="Buscar..." onInput={onHandleChangeFilter ?? handleChangeFilter} />
                        {!!textFileCSV && <Button square className="downloadCSV" title="Descargar CSV" onClick={onBtnExport} >
                            <Icon prefix="fe" name="download"></Icon>
                        </Button>}
                    </div>}
                    <div style={{ flex: '1 1 auto', height: '100%' }} >
                        {children}
                        {show && <div className={hidden ? "d-none" : "ag-btn-list"}>
                            <button id="clearDataTables" onClick={deselectAll} className={hidden ? "d-none" : "btn btn-primary"}>{text}</button>
                        </div>}
                    </div>
                </div>
            </Grid.Col>
        </Grid.Row>
    )
})

export default AGGridWrapper
