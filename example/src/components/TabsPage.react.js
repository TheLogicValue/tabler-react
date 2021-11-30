// @flow

import * as React from "react";

import { Page, Grid, Tabs, Tab, Card, Button} from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";


function TabsPage(): React.Node {
  const state = () =>{
    return true;
  } 
  return (
    <SiteWrapper>
      <Page.Content title="Tabs">
      <Tabs initialTab="Hello" options={<Button>Options</Button>}>
        <Tab title="Hello">Hello World</Tab>
        <Tab title="Goodbye">Goodbye</Tab>
        <Tab title="Complex">
            <Grid.Row cards deck>
            <Grid.Col md={4}>
                <Card body="Short content" />
            </Grid.Col>
            <Grid.Col md={4}>
                <Card
                body="Extra long content of card. Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />
            </Grid.Col>
            <Grid.Col md={4}>
                <Card body="Short content" />
            </Grid.Col>
            </Grid.Row>
        </Tab>
    </Tabs>
      </Page.Content>
    </SiteWrapper>
  );
}

export default TabsPage;
