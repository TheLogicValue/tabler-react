// @flow

import * as React from "react";

import { Page, Grid, Card, Button, Text } from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";


function ButtonPage(): React.Node {

  return (
    <SiteWrapper>
      <Page.Content title="Button">
        <Grid.Row>
          <Grid.Col>
            <Card>
              <Card.Header>
                <Card.Title>Normal</Card.Title>
              </Card.Header>
              <Card.Body>
                <Grid.Row>
                  <Grid.Col lg={1}>
                    <Text>Standard</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" className="w-9" square>Primary</Button>
                      <Button color="secondary" className="w-9" square>Secondary</Button>
                      <Button color="terciary" className="w-9" square>Terciary</Button>
                      <Button color="success" className="w-9" square>Success</Button>
                      <Button color="warning" className="w-9" square>Warning</Button>
                      <Button color="danger" className="w-9" square>Danger</Button>
                      <Button color="info" className="w-9" square>Info</Button>
                      <Button color="light" className="w-9" square>Light</Button>
                      <Button color="dark" className="w-9" square>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row className="mt-5">
                  <Grid.Col lg={1}>
                    <Text>Active</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" active className="w-9" square>Primary</Button>
                      <Button color="secondary" active className="w-9" square>Secondary</Button>
                      <Button color="terciary" active className="w-9" square>Terciary</Button>
                      <Button color="success" active className="w-9" square>Success</Button>
                      <Button color="warning" active className="w-9" square>Warning</Button>
                      <Button color="danger" active className="w-9" square>Danger</Button>
                      <Button color="info" active className="w-9" square>Info</Button>
                      <Button color="light" active className="w-9" square>Light</Button>
                      <Button color="dark" active className="w-9" square>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row className="mt-5">
                  <Grid.Col lg={1}>
                    <Text>Disabled</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" disabled className="w-9" square>Primary</Button>
                      <Button color="secondary" disabled className="w-9" square>Secondary</Button>
                      <Button color="terciary" disabled className="w-9" square>Terciary</Button>
                      <Button color="success" disabled className="w-9" square>Success</Button>
                      <Button color="warning" disabled className="w-9" square>Warning</Button>
                      <Button color="danger" disabled className="w-9" square>Danger</Button>
                      <Button color="info" disabled className="w-9" square>Info</Button>
                      <Button color="light" disabled className="w-9" square>Light</Button>
                      <Button color="dark" disabled className="w-9" square>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Card>
              <Card.Header>
                <Card.Title>Square</Card.Title>
              </Card.Header>
              <Card.Body>
                <Grid.Row>
                  <Grid.Col lg={1}>
                    <Text>Standard</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" className="w-9" square>Primary</Button>
                      <Button color="secondary" className="w-9" square>Secondary</Button>
                      <Button color="terciary" className="w-9" square>Terciary</Button>
                      <Button color="success" className="w-9" square>Success</Button>
                      <Button color="warning" className="w-9" square>Warning</Button>
                      <Button color="danger" className="w-9" square>Danger</Button>
                      <Button color="info" className="w-9" square>Info</Button>
                      <Button color="light" className="w-9" square>Light</Button>
                      <Button color="dark" className="w-9" square>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row className="mt-5">
                  <Grid.Col lg={1}>
                    <Text>Active</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" active className="w-9" square>Primary</Button>
                      <Button color="secondary" active className="w-9" square>Secondary</Button>
                      <Button color="terciary" active className="w-9" square>Terciary</Button>
                      <Button color="success" active className="w-9" square>Success</Button>
                      <Button color="warning" active className="w-9" square>Warning</Button>
                      <Button color="danger" active className="w-9" square>Danger</Button>
                      <Button color="info" active className="w-9" square>Info</Button>
                      <Button color="light" active className="w-9" square>Light</Button>
                      <Button color="dark" active className="w-9" square>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row className="mt-5">
                  <Grid.Col lg={1}>
                    <Text>Disabled</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" disabled className="w-9" square>Primary</Button>
                      <Button color="secondary" disabled className="w-9" square>Secondary</Button>
                      <Button color="terciary" disabled className="w-9" square>Terciary</Button>
                      <Button color="success" disabled className="w-9" square>Success</Button>
                      <Button color="warning" disabled className="w-9" square>Warning</Button>
                      <Button color="danger" disabled className="w-9" square>Danger</Button>
                      <Button color="info" disabled className="w-9" square>Info</Button>
                      <Button color="light" disabled className="w-9" square>Light</Button>
                      <Button color="dark" disabled className="w-9" square>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Card>
              <Card.Header>
                <Card.Title>Pill</Card.Title>
              </Card.Header>
              <Card.Body>
                <Grid.Row>
                  <Grid.Col lg={1}>
                    <Text>Standard</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" className="w-9" pill>Primary</Button>
                      <Button color="secondary" className="w-9" pill>Secondary</Button>
                      <Button color="terciary" className="w-9" pill>Terciary</Button>
                      <Button color="success" className="w-9" pill>Success</Button>
                      <Button color="warning" className="w-9" pill>Warning</Button>
                      <Button color="danger" className="w-9" pill>Danger</Button>
                      <Button color="info" className="w-9" pill>Info</Button>
                      <Button color="light" className="w-9" pill>Light</Button>
                      <Button color="dark" className="w-9" pill>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row className="mt-5">
                  <Grid.Col lg={1}>
                    <Text>Active</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" active className="w-9" pill>Primary</Button>
                      <Button color="secondary" active className="w-9" pill>Secondary</Button>
                      <Button color="terciary" active className="w-9" pill>Terciary</Button>
                      <Button color="success" active className="w-9" pill>Success</Button>
                      <Button color="warning" active className="w-9" pill>Warning</Button>
                      <Button color="danger" active className="w-9" pill>Danger</Button>
                      <Button color="info" active className="w-9" pill>Info</Button>
                      <Button color="light" active className="w-9" pill>Light</Button>
                      <Button color="dark" active className="w-9" pill>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row className="mt-5">
                  <Grid.Col lg={1}>
                    <Text>Disabled</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" disabled className="w-9" pill>Primary</Button>
                      <Button color="secondary" disabled className="w-9" pill>Secondary</Button>
                      <Button color="terciary" disabled className="w-9" pill>Terciary</Button>
                      <Button color="success" disabled className="w-9" pill>Success</Button>
                      <Button color="warning" disabled className="w-9" pill>Warning</Button>
                      <Button color="danger" disabled className="w-9" pill>Danger</Button>
                      <Button color="info" disabled className="w-9" pill>Info</Button>
                      <Button color="light" disabled className="w-9" pill>Light</Button>
                      <Button color="dark" disabled className="w-9" pill>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Card>
              <Card.Header>
                <Card.Title>Outline</Card.Title>
              </Card.Header>
              <Card.Body>
                <Grid.Row>
                  <Grid.Col lg={1}>
                    <Text>Standard</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" className="w-9" outline>Primary</Button>
                      <Button color="secondary" className="w-9" outline>Secondary</Button>
                      <Button color="terciary" className="w-9" outline>Terciary</Button>
                      <Button color="success" className="w-9" outline>Success</Button>
                      <Button color="warning" className="w-9" outline>Warning</Button>
                      <Button color="danger" className="w-9" outline>Danger</Button>
                      <Button color="info" className="w-9" outline>Info</Button>
                      <Button color="light" className="w-9" outline>Light</Button>
                      <Button color="dark" className="w-9" outline>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row className="mt-5">
                  <Grid.Col lg={1}>
                    <Text>Active</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" active className="w-9" outline>Primary</Button>
                      <Button color="secondary" active className="w-9" outline>Secondary</Button>
                      <Button color="terciary" active className="w-9" outline>Terciary</Button>
                      <Button color="success" active className="w-9" outline>Success</Button>
                      <Button color="warning" active className="w-9" outline>Warning</Button>
                      <Button color="danger" active className="w-9" outline>Danger</Button>
                      <Button color="info" active className="w-9" outline>Info</Button>
                      <Button color="light" active className="w-9" outline>Light</Button>
                      <Button color="dark" active className="w-9" outline>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row className="mt-5">
                  <Grid.Col lg={1}>
                    <Text>Disabled</Text>
                  </Grid.Col>
                  <Grid.Col lg={11}>
                    <Button.List>
                      <Button color="primary" disabled className="w-9" outline>Primary</Button>
                      <Button color="secondary" disabled className="w-9" outline>Secondary</Button>
                      <Button color="terciary" disabled className="w-9" outline>Terciary</Button>
                      <Button color="success" disabled className="w-9" outline>Success</Button>
                      <Button color="warning" disabled className="w-9" outline>Warning</Button>
                      <Button color="danger" disabled className="w-9" outline>Danger</Button>
                      <Button color="info" disabled className="w-9" outline>Info</Button>
                      <Button color="light" disabled className="w-9" outline>Light</Button>
                      <Button color="dark" disabled className="w-9" outline>Dark</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Card>
              <Card.Header>
                <Card.Title>With Icon</Card.Title>
              </Card.Header>
              <Card.Body>
                <Grid.Row>
                  <Grid.Col >
                    <Button.List>
                      <Button color="dark" icon="upload">
                        Upload
                     </Button>
                      <Button icon="heart" color="warning">
                        I Like
                     </Button>
                      <Button icon="check" color="success">
                        I agree
                     </Button>
                      <Button icon="plus" color="primary" outline>
                        More
                     </Button>
                      <Button icon="link" color="danger">
                        Link
                      </Button>
                      <Button icon="message-circle" color="info">
                        Comment
                      </Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Card>
              <Card.Header>
                <Card.Title>Social</Card.Title>
              </Card.Header>
              <Card.Body>
                <Grid.Row>
                  <Grid.Col >
                    <Button.List>
                    <Button social="facebook">Facebook</Button>
  <Button social="twitter">Twitter</Button>
  <Button social="google">Google</Button>
  <Button social="youtube">Youtube</Button>
  <Button social="vimeo">Vimeo</Button>
  <Button social="dribbble">Dribbble</Button>
  <Button social="github">Github</Button>
  <Button social="instagram">Instagram</Button>
  <Button social="pinterest">Pinterest</Button>
  <Button social="vk">VKontakte</Button>
  <Button social="rss">RSS</Button>
  <Button social="flickr">Flickr</Button>
  <Button social="bitbucket">Bitbucket</Button>
                    </Button.List>
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default ButtonPage;
