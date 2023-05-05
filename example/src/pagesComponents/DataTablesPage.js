import React, { useState } from "react"
import { AGGridTable, Grid, Page, Card, Alert, Icon } from "tabler-react"
import SiteWrapper from "../SiteWrapper"

export default function DataTablesPage() {
  const [alerts, setAlerts] = useState([])
  const addMilesSeparatorAndRound = (value, decimals = 2, locale = "de-DE") => {
    if (value != null) {
      value = parseFloat(value)
      var result = value.toLocaleString(locale, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })
      return result
    } else return "-"
  }

  const iconValueFormatter = (params) => {   
    if(params.value === null) return "No aplica"
    if (params.value) return <Icon name="check" className="text-success" />
    if (params.value === false) return <Icon name="x" className="text-danger" />    
  }

  const numericColumn = {
    filterOptions: [
      {
        displayKey: 'mayorQue',
        displayName: 'Mayor que',
        test: function (filterValue, cellValue) {
          return cellValue != null && cellValue > filterValue
        },
      },
      {
        displayKey: 'menorQue',
        displayName: 'Menor que',
        test: function (filterValue, cellValue) {
          return cellValue != null && cellValue < filterValue
        },
      },
    ],
    alwaysShowBothConditions: true,
    defaultJoinOperator: 'AND',
    buttons: ['apply', 'reset'],
    closeOnApply: 'agNumberColumnFilter',
    numberParser: function (text) {
      return text == null || "-" ? null : parseFloat(text.replace(',', ''))
    },
  }

  const dateFilterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      const dateAsString = cellValue
      if (dateAsString == null) return 0
      const dateParts = dateAsString.split('/')
      const day = Number(dateParts[2])
      const month = Number(dateParts[1]) - 1
      const year = Number(dateParts[0])
      const cellDate = new Date(year, month, day)
      if (cellDate < filterLocalDateAtMidnight) return -1
      else if (cellDate > filterLocalDateAtMidnight) return 1
      return 0
    }
  }

  const dataRow = () => {
    return [
      { id: 1, date: "31-12-2020", name: "Jaques", city: "Granada", pass: null, budget: 123 },
      { id: 2, date: "22-02-2021", name: "Atenea", city: "Pireo", pass: true, budget: 222 },
      { id: 3, date: "11-05-2021", name: "John", city: "Leon", pass: false, budget: 179.50 },
      { id: 4, date: "31-12-2020", name: "Marie", city: "Vigo", pass: null, budget: 55 },
      { id: 5, date: "22-02-2021", name: "Mark", city: "Reus", pass: true, budget: 1045.07 },
      { id: 6, date: "11-05-2021", name: "Claudia", city: "Ibiza", pass: false, budget: 543.50 },
    ]
  }

  const dataColumn = () => {
    return [
      { header: "Id", item: "id", maxWidth: 60 },
      { header: "Date", item: "date", filter: true, filterParams: dateFilterParams },
      {
        header: "Location",
        subItems: [
          { header: "Name", item: "name", sort: "asc", valueFormatter: null, type: "" },
          { header: "City", item: "city", sort: "", valueFormatter: null, type: "" },
        ]
      },
      { header: "Pass", item: "pass", renderIcon: iconValueFormatter },
      { header: "Budget", item: "budget", filter: true, filterParams: numericColumn, valueFormatter: params => addMilesSeparatorAndRound(params.value) + " €", type: "rightAligned" }
    ]
  }

  const dataTotal = () => {
    let total = 0
    dataRow().forEach((data) => { total += data.budget })
    return [{ budget: total + " €" },]
  }
  const columnTotal = () => {
    return [
      { header: "Id", item: "id", valueFormatter: null, type: "" },
      { header: "Date", item: "date", valueFormatter: null, type: "" },
      { header: "Name", item: "name", valueFormatter: null, type: "" },
      { header: "City", item: "city", valueFormatter: null, type: "" },
      { header: "Pass", item: "pass", valueFormatter: null, type: "" },
      { header: "TotalBudget", item: "budget", valueFormatter: params => addMilesSeparatorAndRound(params.value), type: "rightAligned" }
    ]
  }

  const rowClick = (row) => {
    setAlerts([...alerts, <Alert type="warning" isDismissible>
      This is {row.name} from {row.city}
    </Alert>])
  }

  return (
    <SiteWrapper>
      <Page.Content title="DataTables">
        {alerts}
        <Grid.Row>
          <Grid.Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>DataTable</Card.Title>
              </Card.Header>
              <Card.Body>
                <AGGridTable
                  dataColumn={dataColumn()}
                  dataRow={dataRow()}
                  columnTotal={columnTotal()}
                  dataTotal={dataTotal()}
                  onRowClick={rowClick}
                  pageSize={3}
                  search={true}
                  rowSelection={'multiple'}
                  rowMultiSelectWithClick={true}
                  listBtn={true}
                  deselectAllBtn={true}
                  deselectAllOptions={{ text: "Limpiar", hidden: false }}
                />
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  )
}