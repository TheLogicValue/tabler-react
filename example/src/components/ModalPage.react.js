// @flow

import * as React from "react";
import {useState} from "react";
import { useHistory } from "react-router-dom";

import { Page, Grid, Card, Button, Modal, Icon } from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";

function ModalPage(): React.Node {
  const [showModalOne, setShowModalOne] = useState(false)
  const closeModalOne = () => {
    if (showModalOne){
      setShowModalOne(false);
    }
  }
  const openModalOne = () => {
    if (showModalOne == false){
      setShowModalOne(true);
    }
  }

  const [showModalTwo, setShowModalTwo] = useState(false)
  const closeModalTwo = () => {
    if (showModalTwo){
      setShowModalTwo(false);
    }
  }
  const openModalTwo = () => {
    if (showModalTwo == false){
      setShowModalTwo(true);
    }
  }

  const history = useHistory();
  const back = (<><Icon name="chevron-left" onClick={() => { history.push('/') }}/></>);
  
  return (
    <SiteWrapper>
      <Page.Content title="Modal" back={back}>
        <Modal title="One Button Modal" show={showModalOne} acceptText="I accept" onClose={closeModalOne} onAccept={closeModalOne}>The text of my modal component.</Modal>
        <Modal title="Two Buttons Modal" show={showModalTwo} type={2} cancelText="I want to cancel" onCancel={closeModalTwo} onClose={closeModalTwo} onAccept={closeModalTwo}>The text of my modal with two buttons component.</Modal>
        <Grid.Row>
          <Grid.Col lg={3}>
            <Card>
              <Card.Header>
                <Card.Title>One button Modal</Card.Title>
              </Card.Header>
              <Card.Body>
                <Button color="primary" onClick={openModalOne}>Show modal</Button>
              </Card.Body>
            </Card>
          </Grid.Col>
          <Grid.Col lg={3}>
            <Card>
              <Card.Header>
                <Card.Title>Two buttons Modal</Card.Title>
              </Card.Header>
              <Card.Body>
                <Button color="primary" onClick={openModalTwo}>Show modal</Button>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default ModalPage;
