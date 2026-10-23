import * as React from "react";
import Page from "./Page.react";
import Grid from "../Grid";

export type PageContentWithSidebarProps = {
  readonly children?: React.ReactNode;
  readonly header?: React.ReactNode;
  readonly sidebar?: React.ReactNode;
};

function PageContentWithSidebar({
  children,
  header,
  sidebar,
}: PageContentWithSidebarProps): React.ReactElement {
  return (
    <Page.Content>
      {header}
      <Grid.Row>
        <Grid.Col lg={3} className="order-lg-1 mb-4">
          {sidebar}
        </Grid.Col>
        <Grid.Col lg={9}>{children}</Grid.Col>
      </Grid.Row>
    </Page.Content>
  );
}

PageContentWithSidebar.displayName = "Page.ContentWithSidebar";

export default PageContentWithSidebar;
