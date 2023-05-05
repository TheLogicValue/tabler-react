import * as React from "react"
import { Page, Grid, Card , BarChartLoader, PieChartLoader, TableLoader} from "tabler-react"
import SiteWrapper from "../SiteWrapper"

export default  function LoadersPage() {  
  return (
    <SiteWrapper>
      <Page.Content title="Loaders">
        <Grid.Row>
          <Grid.Col lg={6}>
            <Card>
              <Card.Header>
                <Card.Title>BarChartLoader</Card.Title>
              </Card.Header>
              <Card.Body>
                  <BarChartLoader/>
              </Card.Body>
            </Card>
          </Grid.Col>
          <Grid.Col lg={6}>
            <Card>
              <Card.Header>
                <Card.Title>PieChartLoader</Card.Title>
              </Card.Header>
              <Card.Body>
                  <PieChartLoader/>
              </Card.Body>
            </Card>
          </Grid.Col>
          <Grid.Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>TableLoader</Card.Title>
              </Card.Header>
              <Card.Body>
                  <TableLoader/>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  )
}