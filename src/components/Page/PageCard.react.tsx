import * as React from "react";

import Grid from "../Grid";
import Card, { type CardProps } from "../Card";
import Container from "../Container.react";

export type PageCardProps = {
  readonly children?: React.ReactNode;
  readonly title?: string;
  readonly header?: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly RootComponent?: CardProps["RootComponent"];
};

function PageCard({
  children,
  title,
  header,
  footer,
  RootComponent,
}: PageCardProps): React.ReactElement {
  return (
    <div className="my-3 my-md-5">
      <Container>
        <Grid.Row>
          <Grid.Col width={12}>
            <Card RootComponent={RootComponent}>
              {title && (
                <Card.Header>
                  <Card.Title>{title}</Card.Title>
                </Card.Header>
              )}
              {header}
              <Card.Body>{children}</Card.Body>
              {footer}
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Container>
    </div>
  );
}

PageCard.displayName = "Page.Card";

export default PageCard;
